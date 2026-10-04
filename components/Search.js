"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, X, ArrowRight } from "lucide-react";
import { stories, entries } from "@/lib/data";
import { createPortal } from "react-dom";

const allPhotos = [
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
];

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === "/" &&
        !open &&
        e.target.tagName !== "INPUT" &&
        e.target.tagName !== "TEXTAREA"
      ) {
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
            s.place?.toLowerCase().includes(q) ||
            s.excerpt?.toLowerCase().includes(q),
        );

  const matchedJournal =
    q.length < 2
      ? []
      : entries.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.place?.toLowerCase().includes(q) ||
            e.body?.toLowerCase().includes(q) ||
            e.type?.toLowerCase().includes(q),
        );

  const matchedPhotos =
    q.length < 2
      ? []
      : allPhotos.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        );

  const total =
    matchedStories.length + matchedJournal.length + matchedPhotos.length;
  const noResults = q.length >= 2 && total === 0;

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const labelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.58rem",
    letterSpacing: "0.14em",
    color: "var(--ink-faint)",
    fontWeight: 400,
    padding: "0.8rem 1.5rem 0.4rem",
    borderBottom: "1px solid var(--rule)",
    display: "block",
  };

  const rowStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "1rem 1.5rem",
    borderBottom: "1px solid var(--rule)",
    cursor: "pointer",
    transition: "background 0.15s ease",
    gap: "1rem",
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--ink-faint)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: 0,
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
        aria-label="Search"
      >
        <SearchIcon size={15} />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 300,
            border: "1px solid var(--rule)",
            padding: "0.12rem 0.4rem",
            color: "var(--ink-faint)",
            letterSpacing: "0.04em",
          }}
        >
          /
        </span>
      </button>

      {/* Overlay — rendered outside navbar via portal */}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(41,45,43,0.5)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "70px 1.5rem 2rem",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "620px",
                maxHeight: "75vh",
                background: "var(--bg)",
                border: "1px solid var(--rule)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Input row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.1rem 1.5rem",
                  borderBottom: "1px solid var(--rule)",
                  flexShrink: 0,
                }}
              >
                <SearchIcon
                  size={15}
                  color="var(--ink-faint)"
                  style={{ flexShrink: 0 }}
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stories, journal, photographs…"
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "var(--ink)",
                    fontSize: "0.95rem",
                    fontFamily: "'Source Serif 4', serif",
                  }}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--ink-faint)",
                      display: "flex",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={close}
                  style={{
                    background: "none",
                    border: "1px solid var(--rule)",
                    cursor: "pointer",
                    color: "var(--ink-faint)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    padding: "0.2rem 0.5rem",
                    letterSpacing: "0.04em",
                    flexShrink: 0,
                  }}
                >
                  esc
                </button>
              </div>

              {/* Results */}
              <div style={{ overflowY: "auto", flex: 1 }}>
                {/* Empty state */}
                {q.length < 2 && (
                  <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "var(--ink-faint)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Type to search across stories, journal entries and
                      photographs
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        borderTop: "1px solid var(--rule)",
                        paddingTop: "1.5rem",
                      }}
                    >
                      {[
                        { label: "Stories", href: "/stories" },
                        { label: "Journal", href: "/journal" },
                        { label: "Contact", href: "/contact" },
                      ].map((l, i) => (
                        <a
                          key={i}
                          href={l.href}
                          onClick={close}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.7rem",
                            color: "var(--ink-faint)",
                            fontWeight: 300,
                            padding: "0 1.2rem",
                            borderRight:
                              i < 2 ? "1px solid var(--rule)" : "none",
                            transition: "color 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--ink)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--ink-faint)")
                          }
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* No results */}
                {noResults && (
                  <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "var(--ink-faint)",
                      }}
                    >
                      Nothing found for "{query}"
                    </p>
                  </div>
                )}

                {/* Stories */}
                {matchedStories.length > 0 && (
                  <div>
                    <span style={labelStyle}>STORIES</span>
                    {matchedStories.map((s) => (
                      <div
                        key={s.slug}
                        style={rowStyle}
                        onClick={() => {
                          router.push(`/stories/${s.slug}`);
                          close();
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--surface)")
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
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "0.95rem",
                              color: "var(--ink)",
                              fontWeight: 400,
                            }}
                          >
                            {s.title}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Source Serif 4', serif",
                              fontStyle: "italic",
                              fontSize: "0.78rem",
                              color: "var(--ink-faint)",
                              lineHeight: 1.5,
                            }}
                          >
                            {s.excerpt?.slice(0, 90)}…
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: "0.3rem",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.58rem",
                              color: "var(--accent)",
                              fontWeight: 400,
                              letterSpacing: "0.08em",
                              borderBottom: "1px solid var(--accent)",
                              paddingBottom: "1px",
                            }}
                          >
                            {s.place?.toUpperCase()}
                          </span>
                          <ArrowRight size={12} color="var(--ink-faint)" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Journal */}
                {matchedJournal.length > 0 && (
                  <div>
                    <span style={labelStyle}>JOURNAL</span>
                    {matchedJournal.map((e) => (
                      <div
                        key={e.slug}
                        style={rowStyle}
                        onClick={() => {
                          router.push(`/journal/${e.slug}`);
                          close();
                        }}
                        onMouseEnter={(el) =>
                          (el.currentTarget.style.background = "var(--surface)")
                        }
                        onMouseLeave={(el) =>
                          (el.currentTarget.style.background = "transparent")
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
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "0.95rem",
                              color: "var(--ink)",
                              fontWeight: 400,
                            }}
                          >
                            {e.title}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Source Serif 4', serif",
                              fontStyle: "italic",
                              fontSize: "0.78rem",
                              color: "var(--ink-faint)",
                              lineHeight: 1.5,
                            }}
                          >
                            {e.body?.slice(0, 90)}…
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: "0.3rem",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.58rem",
                              color: "var(--ink-faint)",
                              fontWeight: 300,
                              letterSpacing: "0.06em",
                            }}
                          >
                            {e.type?.toUpperCase()}
                          </span>
                          <ArrowRight size={12} color="var(--ink-faint)" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Photos */}
                {matchedPhotos.length > 0 && (
                  <div>
                    <span style={labelStyle}>PHOTOGRAPHS</span>
                    {matchedPhotos.map((p) => (
                      <div
                        key={p.id}
                        style={rowStyle}
                        onClick={() => {
                          router.push("/gallery");
                          close();
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--surface)")
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
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "0.95rem",
                              color: "var(--ink)",
                              fontWeight: 400,
                            }}
                          >
                            {p.title}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Source Serif 4', serif",
                              fontStyle: "italic",
                              fontSize: "0.78rem",
                              color: "var(--ink-faint)",
                            }}
                          >
                            {p.location}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.58rem",
                            color: "var(--ink-faint)",
                            fontWeight: 300,
                            letterSpacing: "0.06em",
                            flexShrink: 0,
                          }}
                        >
                          {p.category.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {q.length >= 2 && total > 0 && (
                <div
                  style={{
                    padding: "0.8rem 1.5rem",
                    borderTop: "1px solid var(--rule)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "0.75rem",
                      color: "var(--ink-faint)",
                    }}
                  >
                    {total} result{total !== 1 ? "s" : ""} for "{query}"
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      color: "var(--ink-faint)",
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    press esc to close
                  </span>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
