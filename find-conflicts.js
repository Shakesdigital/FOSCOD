const fs = require('fs');
const path = require('path');

const seedPath = path.join(process.cwd(), 'supabase', 'seed.sql');
const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');

const content = fs.readFileSync(seedPath, 'utf8');
const lines = content.split('\n');

/**
 * Extract a balanced parenthesised block starting after `startIdx`.
 * Returns { cols: string, endIdx: number } or null.
 */
function extractParenBlock(text, startIdx) {
  let depth = 0;
  let started = false;
  let result = '';
  for (let i = startIdx; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') {
      depth++;
      started = true;
      if (depth > 1) result += ch; // capture content inside
    } else if (ch === ')') {
      depth--;
      if (!started) return null;
      if (depth === 0) return { cols: result, endIdx: i };
      result += ch;
    } else if (started && depth > 0) {
      result += ch;
    }
  }
  return null;
}

/** Normalise a column-list string for comparison: "col1, col2" -> "col1,col2" */
function normCols(s) {
  return s.toLowerCase().replace(/\s+/g, '').replace(/,+$/, '');
}

// Collect unique constraints / primary keys from all migration files
const uniqueConstraints = new Map();        // table -> Set of normalised unique column lists
const migrationFiles = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));

for (const fname of migrationFiles) {
  const migContent = fs.readFileSync(path.join(migrationsDir, fname), 'utf8');

  // --- 1. CREATE TABLE blocks: scan for column-level + table-level constraints ---
  const migLines = migContent.split('\n');
  for (let i = 0; i < migLines.length; i++) {
    const line = migLines[i];
    const tableMatch = line.match(/create\s+table\s+(?:if\s+not\s+exists\s+)?public\.(\w+)/i);
    if (!tableMatch) continue;

    const tableName = tableMatch[1];
    const rest = migContent.slice(migContent.indexOf(tableMatch[0]) + tableMatch[0].length);
    const block = extractParenBlock(rest, 0);
    if (!block) continue;

    const cols = block.cols;
    const existing = uniqueConstraints.get(tableName) || new Set();

    // Split by top-level commas (depth 0 within the column block)
    let depth = 0, cur = '';
    const colDefs = [];
    for (const ch of cols) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { colDefs.push(cur); cur = ''; }
      else cur += ch;
    }
    if (cur.trim()) colDefs.push(cur);

    for (const def of colDefs) {
      const trimmed = def.trim();
      if (!trimmed) continue;
      // Column-level: "colname type ... unique"
      const colUniqueMatch = trimmed.match(/^(\w+)\b.*?\bunique\b.*$/i);
      if (colUniqueMatch) existing.add(colUniqueMatch[1]);
      // Column-level: "colname type primary key"
      const colPkMatch = trimmed.match(/^(\w+)\b.*?\bprimary\s+key\b.*$/i);
      if (colPkMatch) existing.add(colPkMatch[1]);
      // Table-level: "unique (col1, col2)" or "unique(col1, col2)"
      const tableUniqueMatch = trimmed.match(/\bunique\s*\(([^)]+)\)/i);
      if (tableUniqueMatch) existing.add(tableUniqueMatch[1]);
      // Table-level: "primary key (col1, col2)"
      const tablePkMatch = trimmed.match(/\bprimary\s+key\s*\(([^)]+)\)/i);
      if (tablePkMatch) existing.add(tablePkMatch[1]);
    }
    uniqueConstraints.set(tableName, existing);
  }

  // --- 2. CREATE UNIQUE INDEX ---
  const indexMatches = [...migContent.matchAll(/create\s+unique\s+index\s+(?:if\s+not\s+exists\s+)?\w+\s+on\s+public\.(\w+)\s*\(([^)]+)\)/gi)];
  for (const im of indexMatches) {
    const tableName = im[1];
    const existing = uniqueConstraints.get(tableName) || new Set();
    existing.add(im[2].trim());
    uniqueConstraints.set(tableName, existing);
  }

  // --- 3. ALTER TABLE ADD CONSTRAINT UNIQUE / PRIMARY KEY ---
  const altMatches = [...migContent.matchAll(/alter\s+table\s+(?:if\s+exists\s+)?(?:public\.)?(\w+)\s+add\s+(?:constraint\s+\w+\s+)?(unique\s*\([^)]+\)|primary\s+key\s*\([^)]+\))/gi)];
  for (const am of altMatches) {
    const tableName = am[1];
    const constraintDef = am[2];
    const colsMatch = constraintDef.match(/\(([^)]+)\)/);
    if (colsMatch) {
      const existing = uniqueConstraints.get(tableName) || new Set();
      existing.add(colsMatch[1].trim());
      uniqueConstraints.set(tableName, existing);
    }
  }
}

// Pre-scan: map each line to its originating INSERT table name
const insertTableByLine = new Array(lines.length).fill(null);
let lastInsertTable = null;
let lastInsertLine = -1;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/insert\s+into\s+(?:public\.)?(\w+)/i);
  if (m) {
    lastInsertTable = m[1];
    lastInsertLine = i;
  }
  if (lines[i].trim().endsWith(';') && lastInsertTable !== null) {
    // Mark this as end of statement; reset on next INSERT
  }
  // Every line inherits the most recent INSERT table until a new one starts
  if (lastInsertTable !== null) {
    insertTableByLine[i] = { table: lastInsertTable, start: lastInsertLine };
  }
}

// Find all INSERT ... ON CONFLICT statements
console.log('=== ON CONFLICT clauses in seed.sql ===\n');
let conflictsFound = 0;
let issuesFound = 0;

for (let i = 0; i < lines.length; i++) {
  if (!/on conflict/i.test(lines[i])) continue;

  conflictsFound++;
  const conflictLine = lines[i].trim();
  console.log(`Line ${i + 1}: ${conflictLine}`);

  // Check if it's DO NOTHING (safe) or has a conflict target
  const targetMatch = conflictLine.match(/on conflict\s*\(([^)]+(?:\s*,\s*[^)]+)*)\)\s+do/i);
  if (!targetMatch) {
    if (/do nothing/i.test(conflictLine)) {
      console.log('  ✓ ON CONFLICT DO NOTHING (no unique target needed)');
    } else {
      console.log('  ✓ ON CONFLICT (no target — table-level)');
    }
    continue;
  }

  const target = normCols(targetMatch[1]);
  console.log(`  Conflict target: (${targetMatch[1].trim()})`);

  // Find the table name from the pre-scanned mapping
  const entry = insertTableByLine[i];
  let tableName = entry ? entry.table : null;

  if (!tableName) {
    console.log('  ⚠ Could not determine table name');
    issuesFound++;
    continue;
  }

  const constraints = uniqueConstraints.get(tableName) || new Set();
  const hasConstraint = [...constraints].some(c => normCols(c) === target);
  if (hasConstraint) {
    console.log(`  ✓ Matches unique constraint on ${tableName}.${targetMatch[1].trim()}`);
  } else {
    console.log(`  ✗ NO matching unique constraint on ${tableName}!`);
    console.log(`    Available constraints: ${constraints.size ? [...constraints].join(', ') : '(none found)'}`);
    issuesFound++;
  }
}

console.log(`\n=== Summary: ${conflictsFound} ON CONFLICT clauses, ${issuesFound} potential mismatches ===`);
if (issuesFound === 0) {
  console.log('All ON CONFLICT targets have matching unique constraints. ✓');
}
