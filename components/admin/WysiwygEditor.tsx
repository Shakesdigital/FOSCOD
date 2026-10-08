"use client";

import { useState, useRef, useEffect } from "react";

/** WysiwygEditor — a lightweight contentEditable-based rich text editor
 *  with a toolbar for bold, italic, underline, lists, and link.
 *  Syncs its content into a hidden textarea so form submissions work
 *  with the existing admin save flow. */
export function WysiwygEditor({
  name,
  defaultValue = "",
  label,
  help,
  required,
}: {
  name: string;
  defaultValue?: string;
  label: string;
  help?: string;
  required?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateHidden = () => {
    if (textareaRef.current && containerRef.current) {
      const html = containerRef.current.innerHTML;
      textareaRef.current.value = html;
    }
  };

  const exec = (cmd: string, value = "") => {
    document.execCommand(cmd, false, value);
    setTimeout(updateHidden, 0);
  };

  const setLink = () => {
    const url = prompt("Enter link URL:", "https://");
    if (url !== null) exec("createLink", url);
  };

  return (
    <label className="block text-sm font-medium text-[var(--ink)]">
      {label}
      {required ? <span className="ml-1 text-[var(--accent-700)]">*</span> : null}
      <div
        ref={containerRef}
        contentEditable
        suppressContentEditableWarning
        defaultValue={typeof window !== "undefined" ? defaultValue : undefined}
        onInput={updateHidden}
        data-placeholder={label}
        className="mt-2 w-full min-h-[140px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent-600)] focus:ring-2 focus:ring-[var(--accent-100)]"
        style={{
          lineHeight: "1.5",
          fontFamily: "var(--font-text)",
        }}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "b") {
            e.preventDefault();
            exec("bold");
          }
          if (e.ctrlKey && e.key === "i") {
            e.preventDefault();
            exec("italic");
          }
        }}
      />
      <div className="mt-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => exec("bold")}
          className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--accent-100)]"
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--accent-100)]"
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => exec("underline")}
          className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--accent-100)]"
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--accent-100)]"
          title="Bullet list"
        >
          ••
        </button>
        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--accent-100)]"
          title="Numbered list"
        >
          1.
        </button>
        <button
          type="button"
          onClick={setLink}
          className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--accent-100)]"
          title="Insert link"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => exec("formatBlock", "<p>")}
          className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1.5 text-xs text-[var(--ink)] hover:bg-[var(--accent-100)]"
          title="Paragraph"
        >
          ¶
        </button>
      </div>
      <textarea
        ref={textareaRef}
        name={name}
        defaultValue={defaultValue}
        className="sr-only"
        aria-hidden
      />
      {help ? <span className="mt-1.5 block text-xs font-normal leading-relaxed text-[var(--muted)]">{help}</span> : null}
    </label>
  );
}
