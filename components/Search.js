"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import { SearchIcon, X } from "lucide-react";
import { stories } from "@/app/stories/[slug]/page";

const photos = [
  {
    id: 1,
    title: "Mountain Silence",
    location: "Hindu Kush, Afghanistan",
    category: "Landscapes",
  },
  {
    id: 2,
    title: "The Last Light",
    location: "Bamiyan Valley",
    category: "Landscapes",
  },
  {
    id: 3,
    title: "Desert Roads",
    location: "Dasht-e Margo",
    category: "Travel",
  },
  {
    id: 4,
    title: "Kabul Morning",
    location: "Kabul, Afghanistan",
    category: "Architecture",
  },
  {
    id: 5,
    title: "Band-e Amir",
    location: "Bamyan Province",
    category: "Landscapes",
  },
  {
    id: 6,
    title: "Wakhan Corridor",
    location: "Badakhshan",
    category: "Travel",
  },
  {
    id: 7,
    title: "Old City Walls",
    location: "Ghazni, Afghanistan",
    category: "Architecture",
  },
  {
    id: 8,
    title: "Shepherd at Dusk",
    location: "Panjshir Valley",
    category: "Portraits",
  },
  {
    id: 9,
    title: "Market Faces",
    location: "Kabul Bazaar",
    category: "Portraits",
  },
  {
    id: 10,
    title: "River Bend",
    location: "Kunduz Province",
    category: "Landscapes",
  },
  {
    id: 11,
    title: "The Blue Mosque",
    location: "Mazar-i-Sharif",
    category: "Architecture",
  },
  {
    id: 12,
    title: "Nomad Camp",
    location: "Faryab Province",
    category: "Travel",
  },
];

export default function SearchOverlay() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const color = theme === "dark" ? "#e8e4de" : "#1a1a1a";
  const subtle =
    theme === "dark" ? "rgba(232,228,222,0.3)" : "rgba(26,26,26,0.3)";
  const border =
    theme === "dark" ? "rgba(232,228,222,0.08)" : "rgba(26,26,26,0.08)";
  const bg = theme === "dark" ? "#0d0d0b" : "#fafaf8";
  const cardBg =
    theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const tagBg =
    theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [open]);

  const q = query.toLowerCase().trim();

  const matchedStories =
    q.length < 2
      ? []
      : stories.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q) ||
            s.excerpt.toLowerCase().includes(q),
        );

  const matchedPhotos =
    q.length < 2
      ? []
      : photos.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        );

  const hasResults = matchedStories.length > 0 || matchedPhotos.length > 0;
  const noResults = q.length >= 2 && !hasResults;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color,
          opacity: 0.45,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: 0,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
        aria-label="Search"
      >
        <SearchIcon size={15} />
        <span
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            fontFamily: "system-ui, sans-serif",
            border: `1px solid ${border}`,
            padding: "0.15rem 0.4rem",
            opacity: 0.6,
          }}
        >
          /
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 400,
            background:
              theme === "dark" ? "rgba(0,0,0,0.7)" : "rgba(250,250,248,0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "8rem 1.5rem 2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              background: bg,
              border: `1px solid ${border}`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Input row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.2rem",
                borderBottom: `1px solid ${border}`,
              }}
            >
              <SearchIcon size={16} color={subtle} style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search photos, stories, places…"
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  color,
                  fontSize: "0.95rem",
                  fontFamily: "Georgia, serif",
                }}
              />
              <button
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: subtle,
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div style={{ maxHeight: "420px", overflowY: "auto" }}>
              {q.length < 2 && (
                <div style={{ padding: "2.5rem", textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      color: subtle,
                    }}
                  >
                    Type to search across photos and stories…
                  </p>
                </div>
              )}

              {noResults && (
                <div style={{ padding: "2.5rem", textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      color: subtle,
                    }}
                  >
                    Nothing found for "{query}"
                  </p>
                </div>
              )}

              {matchedStories.length > 0 && (
                <div>
                  <p
                    style={{
                      padding: "0.8rem 1.2rem 0.4rem",
                      fontSize: "0.62rem",
                      letterSpacing: "0.15em",
                      color: subtle,
                      fontFamily: "system-ui, sans-serif",
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    Stories
                  </p>
                  {matchedStories.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/stories/${s.slug}`}
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem 1.2rem",
                        borderBottom: `1px solid ${border}`,
                        transition: "background 0.15s ease",
                        gap: "1rem",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = cardBg)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.88rem",
                            color,
                            fontFamily: "Georgia, serif",
                          }}
                        >
                          {s.title}
                        </span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: subtle,
                            lineHeight: 1.5,
                          }}
                        >
                          {s.excerpt.slice(0, 80)}…
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.62rem",
                          color: subtle,
                          padding: "0.2rem 0.5rem",
                          background: tagBg,
                          border: `1px solid ${border}`,
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {s.category}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {matchedPhotos.length > 0 && (
                <div>
                  <p
                    style={{
                      padding: "0.8rem 1.2rem 0.4rem",
                      fontSize: "0.62rem",
                      letterSpacing: "0.15em",
                      color: subtle,
                      fontFamily: "system-ui, sans-serif",
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    Photos
                  </p>
                  {matchedPhotos.map((p) => (
                    <Link
                      key={p.id}
                      href="/gallery"
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem 1.2rem",
                        borderBottom: `1px solid ${border}`,
                        transition: "background 0.15s ease",
                        gap: "1rem",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = cardBg)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.88rem",
                            color,
                            fontFamily: "Georgia, serif",
                          }}
                        >
                          {p.title}
                        </span>
                        <span style={{ fontSize: "0.7rem", color: subtle }}>
                          {p.location}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.62rem",
                          color: subtle,
                          padding: "0.2rem 0.5rem",
                          background: tagBg,
                          border: `1px solid ${border}`,
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {p.category}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div
              style={{
                padding: "0.7rem 1.2rem",
                borderTop: `1px solid ${border}`,
                display: "flex",
                gap: "1.2rem",
              }}
            >
              {[
                { key: "esc", label: "close" },
                { key: "↵", label: "open" },
              ].map((hint) => (
                <span
                  key={hint.key}
                  style={{
                    fontSize: "0.62rem",
                    color: subtle,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  <span
                    style={{
                      border: `1px solid ${border}`,
                      padding: "0.1rem 0.35rem",
                      fontSize: "0.6rem",
                    }}
                  >
                    {hint.key}
                  </span>
                  {hint.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
