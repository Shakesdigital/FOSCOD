"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** VideoPlayer — an inline-embed video with a styled thumbnail fallback.
 *  Uses an embed-based iframe when a videoUrl is provided (YouTube/Vimeo),
 *  or shows a thumbnail that opens a lightbox-style embed on click.
 *  Falls back to a styled placeholder when neither is available. */
export function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  thumbnailAlt = "Video thumbnail",
  title,
  caption,
  className = "",
}: {
  videoUrl?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  title?: string;
  caption?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  // Extract embed URL for YouTube or Vimeo
  const getEmbedUrl = (url: string): string | null => {
    try {
      const u = new URL(url);
      // YouTube watch / embed
      const ytMatch = u.pathname.match(/\/(?:embed|v|shorts)\/([a-zA-Z0-9_-]+)/);
      if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
      const ytParam = u.searchParams.get("v");
      if (u.hostname.includes("youtu.be") && u.pathname.slice(1)) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
      if (ytParam) return `https://www.youtube.com/embed/${ytParam}`;
      // Vimeo
      const vimeoMatch = u.pathname.match(/\/(?:video|embed)\/([0-9]+)/);
      if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
      if (u.hostname === "vimeo.com" && u.pathname.slice(1)) return `https://player.vimeo.com/video/${u.pathname.slice(1)}`;
    } catch {
      return null;
    }
    return null;
  };

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <div className={`relative group ${className}`}>
      {playing && embedUrl ? (
        <div
          className="absolute inset-0 z-20 aspect-video w-full rounded-[var(--radius-lg)]"
          style={{ minHeight: "200px" }}
        >
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={title || "Impact video"}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full rounded-[var(--radius-lg)] border border-[var(--border)]"
          />
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-2 right-2 rounded-full bg-black/30 p-1 text-white hover:bg-black/50"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          <div
            className={`relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-gradient-to-br from-[var(--accent-100)] via-[var(--accent-50)] to-[var(--water-50)]`}
            onClick={() => videoUrl && embedUrl && setPlaying(true)}
            role={videoUrl && embedUrl ? "button" : undefined}
            tabIndex={videoUrl && embedUrl ? 0 : -1}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && videoUrl && embedUrl && setPlaying(true)}
          >
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt={thumbnailAlt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            ) : null}
            {embedUrl && (
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[var(--accent-700)] shadow-[var(--shadow-md)] transition-transform group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </span>
            )}
            {!embedUrl && (
              <span className="relative z-10 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                Video coming soon
              </span>
            )}
          </div>
          {caption && (
            <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            {caption}
          </figcaption>
        )}
        </>
      )}
    </div>
  );
}
