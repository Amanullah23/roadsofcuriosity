"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const series = [
  {
    id: 1,
    slug: "walking-the-silk-road",
    place: "Afghanistan",
    title: "Walking the Silk Road",
    intro:
      "There is a kind of silence that only ancient roads know — one that holds centuries of footsteps and the whispers of traders long gone. I walked a stretch of it somewhere between Balkh and the border, and understood why my grandfather spoke of it like a dream.",
    date: "March 2024",
    count: 14,
    orientation: "landscape",
  },
  {
    id: 2,
    slug: "light-over-bamiyan",
    place: "Afghanistan",
    title: "Light Over Bamiyan",
    intro:
      "The valley changes color every hour. By noon it is gold. By dusk it is grief. I stayed three days and still could not leave. Some places do not let you go easily.",
    date: "January 2024",
    count: 9,
    orientation: "portrait",
  },
  {
    id: 3,
    slug: "a-cup-of-tea-in-kandahar",
    place: "Afghanistan",
    title: "A Cup of Tea in Kandahar",
    intro:
      "He poured the tea slowly, as if time here was not something to be saved but savored. We did not share a language but we shared the silence. That afternoon taught me more than a month of reading.",
    date: "November 2023",
    count: 7,
    orientation: "landscape",
  },
  {
    id: 4,
    slug: "the-wakhan-in-winter",
    place: "Afghanistan",
    title: "The Wakhan in Winter",
    intro:
      "At minus twenty, the Wakhan Corridor reveals itself as a place that does not tolerate visitors — only those who truly belong to it. I did not belong. But I stayed anyway.",
    date: "September 2023",
    count: 18,
    orientation: "portrait",
  },
  {
    id: 5,
    slug: "portraits-of-panjshir",
    place: "Afghanistan",
    title: "Portraits of Panjshir",
    intro:
      "Every face in Panjshir carries a story older than the person wearing it. I photographed twelve people. Each felt like a lifetime. Some mornings I still think about the old man who made me wait an hour before he nodded.",
    date: "July 2023",
    count: 12,
    orientation: "portrait",
  },
];

const places = ["All", "Afghanistan", "Iran", "Java"];

export default function Stories() {
  return (
    <main
      style={{
        paddingTop: "60px",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* Page header */}
      <section
        style={{
          padding: "5rem 2.5rem 4rem",
          borderBottom: "1px solid var(--rule)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "end",
        }}
        className="stories-header"
      >
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "var(--accent)",
              fontWeight: 400,
              marginBottom: "1.5rem",
            }}
          >
            PHOTOGRAPHIC SERIES
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 400,
              color: "var(--ink)",
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
            }}
          >
            Stories
          </h1>
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "var(--ink-faint)",
              lineHeight: 1.85,
              maxWidth: "400px",
            }}
          >
            Afghanistan, Iran, Java — not destinations sorted by category, but
            places that left something behind. Each series combines photographs
            and words from a single encounter with a world.
          </p>
        </div>
      </section>

      {/* Place filter */}
      <section
        style={{
          padding: "1.5rem 2.5rem",
          borderBottom: "1px solid var(--rule)",
          display: "flex",
          alignItems: "center",
          gap: "0",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            color: "var(--ink-faint)",
            fontWeight: 300,
            letterSpacing: "0.1em",
            marginRight: "1.5rem",
          }}
        >
          PLACE
        </span>
        {places.map((place, i) => (
          <Link
            key={place}
            href={
              place === "All"
                ? "/stories"
                : `/stories?place=${place.toLowerCase()}`
            }
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: place === "All" ? "var(--ink)" : "var(--ink-faint)",
              fontWeight: place === "All" ? 400 : 300,
              padding: "0.4rem 1rem",
              borderRight:
                i < places.length - 1 ? "1px solid var(--rule)" : "none",
              borderLeft: i === 0 ? "1px solid var(--rule)" : "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                place === "All" ? "var(--ink)" : "var(--ink-faint)";
            }}
          >
            {place}
          </Link>
        ))}
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "0.75rem",
            color: "var(--ink-faint)",
            marginLeft: "auto",
            opacity: 0.6,
          }}
        >
          {series.length} series
        </span>
      </section>

      {/* Series list */}
      <section>
        {series.map((s, i) => (
          <article key={s.id} style={{ borderBottom: "1px solid var(--rule)" }}>
            <Link
              href={`/stories/${s.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "320px 1fr",
                minHeight: "320px",
                transition: "background 0.2s ease",
              }}
              className="series-row"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Image */}
              <div
                style={{
                  background: "var(--surface)",
                  borderRight: "1px solid var(--rule)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, var(--surface) 0%, var(--rule) 100%)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid var(--rule)",
                      padding: "0.35rem 0.65rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "0.65rem",
                        color: "var(--ink-faint)",
                      }}
                    >
                      {s.orientation === "portrait" ? "3:4" : "4:3"}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.55rem",
                      color: "var(--ink-faint)",
                      fontWeight: 300,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {s.count} photographs
                  </span>
                </div>
              </div>

              {/* Text */}
              <div
                style={{
                  padding: "3rem 3.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
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
                      {s.place.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        color: "var(--ink-faint)",
                        fontWeight: 300,
                      }}
                    >
                      {s.date}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "0.65rem",
                        color: "var(--ink-faint)",
                        marginLeft: "auto",
                        opacity: 0.5,
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                      fontWeight: 400,
                      color: "var(--ink)",
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </h2>

                  {/* Intro */}
                  <p
                    style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontStyle: "italic",
                      fontSize: "0.95rem",
                      color: "var(--ink-faint)",
                      lineHeight: 1.85,
                      maxWidth: "500px",
                    }}
                  >
                    {s.intro}
                  </p>
                </div>

                {/* Read link */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid var(--rule)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      color: "var(--ink-faint)",
                      fontWeight: 300,
                    }}
                  >
                    {s.count} photographs · {Math.ceil(s.count * 0.5)} min read
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 400,
                      color: "var(--ink)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Enter this story <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>

      {/* Bottom invite */}
      <section
        style={{
          padding: "5rem 2.5rem",
          borderTop: "1px solid var(--rule)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--ink-faint)",
            lineHeight: 1.8,
            maxWidth: "480px",
            margin: "0 auto 2rem",
          }}
        >
          More series from Iran and Java are being prepared. Subscribe to the
          journal for updates.
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
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Get in touch <ArrowRight size={12} />
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .stories-header { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .series-row { grid-template-columns: 1fr !important; }
          .series-row > div:first-child { min-height: 220px !important; border-right: none !important; border-bottom: 1px solid var(--rule) !important; }
          .series-row > div:last-child { padding: 2rem 1.5rem !important; }
        }
      `}</style>
    </main>
  );
}
