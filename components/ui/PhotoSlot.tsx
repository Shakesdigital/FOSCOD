/**
 * PhotoSlot — a designed placeholder for real FOSCOD field photography.
 * The content pack makes field photos the primary visual language; until those
 * assets are loaded via the CMS media library, these slots show a warm duotone
 * block with a caption naming the intended shot. Swap `src` in once available.
 */
export function PhotoSlot({
  caption,
  tag,
  tone = "earth",
  className = "",
  ratio = "4/5",
}: {
  caption: string;
  tag?: string;
  tone?: "earth" | "water" | "forest";
  className?: string;
  ratio?: string;
}) {
  const tones: Record<string, string> = {
    earth:
      "from-[#7d3a23] via-[#a8553a] to-[#c98a5f]",
    water:
      "from-[#123f3a] via-[#1c6e66] to-[#5fa39a]",
    forest:
      "from-[#23381f] via-[#2f5d3a] to-[#6f9c63]",
  };

  return (
    <figure
      className={`group relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tones[tone]}`}
        aria-hidden
      />
      {/* subtle grain/texture via layered radial highlights */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,.5), transparent 45%), radial-gradient(circle at 80% 80%, rgba(0,0,0,.4), transparent 50%)",
        }}
        aria-hidden
      />
      {tag && (
        <span className="absolute left-4 top-4 z-10 rounded-[var(--radius-full)] bg-black/35 px-3 py-1 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {tag}
        </span>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 bg-gradient-to-t from-black/55 to-transparent p-4 font-[family-name:var(--font-mono)] text-[0.7rem] text-white/90">
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="shrink-0">
          <rect x="1" y="2.5" width="10" height="7.5" rx="1" stroke="currentColor" fill="none" />
          <circle cx="6" cy="6.5" r="2" stroke="currentColor" fill="none" />
          <path d="M4 2.5l.8-1h2.4l.8 1" stroke="currentColor" fill="none" />
        </svg>
        {caption}
      </figcaption>
    </figure>
  );
}
