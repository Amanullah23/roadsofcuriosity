"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const stories = [
  {
    slug: "walking-the-silk-road",
    place: "Afghanistan",
    title: "Walking the Silk Road",
    intro:
      "There is a kind of silence that only ancient roads know — one that holds centuries of footsteps and the whispers of traders long gone.",
    image: null,
    orientation: "landscape",
  },
  {
    slug: "light-over-bamiyan",
    place: "Afghanistan",
    title: "Light Over Bamiyan",
    intro:
      "The valley changes color every hour. By noon it is gold. By dusk it is grief. I stayed three days and still could not leave.",
    image: null,
    orientation: "portrait",
  },
  {
    slug: "a-cup-of-tea-in-kandahar",
    place: "Afghanistan",
    title: "A Cup of Tea in Kandahar",
    intro:
      "He poured the tea slowly, as if time here was not something to be saved but savored. We did not share a language but we shared the silence.",
    image: null,
    orientation: "landscape",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <main style={{ paddingTop: "60px", background: "var(--bg)" }}>
      {/* ── 1. Hero — one strong image + title ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid var(--rule)",
        }}
        className="hero-grid"
      >
        {/* Left — full image */}
        <div
          style={{
            background: "var(--surface)",
            borderRight: "1px solid var(--rule)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Image placeholder — replace src with real photo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, var(--surface) 0%, var(--rule) 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "1px solid var(--rule)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                img
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                color: "var(--ink-faint)",
                fontWeight: 300,
                letterSpacing: "0.06em",
              }}
            >
              Opening photograph
            </span>
          </div>
        </div>

        {/* Right — title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5rem 4rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "var(--accent)",
              fontWeight: 400,
              marginBottom: "2.5rem",
            }}
          >
            PHOTOGRAPHY & STORIES
          </p>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 400,
              color: "var(--ink)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              marginBottom: "1rem",
            }}
          >
            Roads of
            <br />
            Curiosity
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "var(--ink-faint)",
              fontWeight: 300,
              letterSpacing: "0.04em",
              marginBottom: "3rem",
            }}
          >
            Rik Alexander Nelissen
          </p>

          <div
            style={{
              width: "32px",
              height: "1px",
              background: "var(--accent)",
              marginBottom: "2.5rem",
            }}
          />

          <p
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "var(--ink-faint)",
              lineHeight: 1.9,
              maxWidth: "360px",
              marginBottom: "3rem",
            }}
          >
            A visual journal of places, light, and the stories found along the
            way. Afghanistan, Iran, Java — not destinations, but encounters.
          </p>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Link
              href="/stories"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "0.04em",
                borderBottom: "1px solid var(--ink)",
                paddingBottom: "2px",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.borderColor = "var(--ink)";
              }}
            >
              Enter the stories <ArrowRight size={13} />
            </Link>

            <Link
              href="/about"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 300,
                color: "var(--ink-faint)",
                letterSpacing: "0.04em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--ink-faint)")
              }
            >
              About Rik
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Personal introduction ── */}
      <section
        style={{
          padding: "7rem 2.5rem",
          maxWidth: "680px",
          margin: "0 auto",
          textAlign: "center",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            color: "var(--ink)",
            lineHeight: 1.75,
            marginBottom: "2rem",
            fontWeight: 400,
          }}
        >
          "I travel because curiosity is stronger than comfort. I photograph
          because some things deserve to be seen more slowly. I write because
          the image alone never tells the whole story."
        </p>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            color: "var(--accent)",
            fontWeight: 400,
            letterSpacing: "0.1em",
          }}
        >
          — Rik Alexander Nelissen
        </span>
      </section>

      {/* ── 3. Three selected stories — editorial rhythm ── */}
      <section style={{ padding: "0 0 6rem" }}>
        <div
          style={{
            padding: "4rem 2.5rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 400,
              color: "var(--ink)",
            }}
          >
            Selected Stories
          </h2>
          <Link
            href="/stories"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "var(--ink-faint)",
              fontWeight: 300,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--ink-faint)")
            }
          >
            All stories <ArrowRight size={12} />
          </Link>
        </div>

        {stories.map((story, i) => (
          <article
            key={story.slug}
            style={{
              borderTop: "1px solid var(--rule)",
            }}
          >
            {/* Story layout alternates */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                minHeight: "480px",
              }}
              className="story-grid"
            >
              {/* Image */}
              <div
                style={{
                  order: i % 2 === 0 ? 0 : 1,
                  background: "var(--surface)",
                  borderRight: i % 2 === 0 ? "1px solid var(--rule)" : "none",
                  borderLeft: i % 2 !== 0 ? "1px solid var(--rule)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "420px",
                  position: "relative",
                }}
                className="story-img"
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, var(--surface) 0%, var(--rule) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid var(--rule)",
                      padding: "0.4rem 0.7rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "0.7rem",
                        color: "var(--ink-faint)",
                      }}
                    >
                      {story.orientation === "portrait" ? "3:4" : "4:3"}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.58rem",
                      color: "var(--ink-faint)",
                      fontWeight: 300,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {story.place}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div
                style={{
                  order: i % 2 === 0 ? 1 : 0,
                  padding: "4rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1.5rem",
                }}
                className="story-text"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      color: "var(--accent)",
                      fontWeight: 400,
                      letterSpacing: "0.12em",
                      borderBottom: "1px solid var(--accent)",
                      paddingBottom: "1px",
                    }}
                  >
                    {story.place.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "0.68rem",
                      color: "var(--ink-faint)",
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 400,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  {story.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    color: "var(--ink-faint)",
                    lineHeight: 1.85,
                    maxWidth: "420px",
                  }}
                >
                  {story.intro}
                </p>

                <Link
                  href={`/stories/${story.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                    letterSpacing: "0.04em",
                    borderBottom: "1px solid var(--rule)",
                    paddingBottom: "2px",
                    alignSelf: "flex-start",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink)";
                    e.currentTarget.style.borderColor = "var(--rule)";
                  }}
                >
                  Read this story <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ── 4. Closing invitation ── */}
      <section
        style={{
          borderTop: "1px solid var(--rule)",
          padding: "6rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
        className="closing-grid"
      >
        <div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "var(--ink)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            After the first photograph, does a visitor want to keep looking,
            listening and expanding their view?
          </p>
          <Link
            href="/stories"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.85rem 2rem",
              background: "var(--ink)",
              color: "var(--bg)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 400,
              letterSpacing: "0.06em",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--ink)")
            }
          >
            Keep looking <ArrowRight size={13} />
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            paddingLeft: "3rem",
            borderLeft: "1px solid var(--rule)",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              color: "var(--ink-faint)",
              fontWeight: 400,
              letterSpacing: "0.1em",
            }}
          >
            OR REACH OUT
          </p>
          <p
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "0.92rem",
              color: "var(--ink-faint)",
              lineHeight: 1.8,
            }}
          >
            Whether you want to collaborate, license a photograph, or simply
            share a response to a story — I would love to hear from you.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 400,
              color: "var(--petrol)",
              letterSpacing: "0.04em",
              borderBottom: "1px solid var(--petrol)",
              paddingBottom: "2px",
              alignSelf: "flex-start",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get in touch <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:first-child { min-height: 55vw !important; }
          .story-grid { grid-template-columns: 1fr !important; }
          .story-img { min-height: 60vw !important; order: 0 !important; border: none !important; border-bottom: 1px solid var(--rule) !important; }
          .story-text { order: 1 !important; padding: 2.5rem 1.5rem !important; }
          .closing-grid { grid-template-columns: 1fr !important; }
          .closing-grid > div:last-child { padding-left: 0 !important; border-left: none !important; border-top: 1px solid var(--rule); padding-top: 2rem; }
        }
      `}</style>
    </main>
  );
}
