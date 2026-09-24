"use client";

import Link from "next/link";
import { ArrowRight, Camera, BookOpen, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

function HeroCard() {
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 300);
    const t2 = setTimeout(() => setTextVisible(true), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        border: "1px solid var(--rule)",
        padding: "2rem",
        maxWidth: "360px",
        width: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Card top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "7px",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BookOpen size={13} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              color: "var(--ink-faint)",
              fontWeight: 400,
              letterSpacing: "0.06em",
            }}
          >
            From the journal
          </span>
        </div>
        <span
          style={{
            fontSize: "0.6rem",
            color: "var(--accent)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
            padding: "0.2rem 0.55rem",
            borderRadius: "4px",
          }}
        >
          Travel
        </span>
      </div>

      {/* Date */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.65rem",
          color: "var(--ink-faint)",
          fontWeight: 300,
          marginBottom: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        March 2024
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.5rem",
          fontWeight: 400,
          color: "var(--ink)",
          lineHeight: 1.2,
          marginBottom: "1rem",
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        Walking the Silk Road
      </h3>

      {/* Divider */}
      <div
        style={{
          width: "32px",
          height: "1.5px",
          background: "var(--accent)",
          marginBottom: "1rem",
          opacity: textVisible ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      />

      {/* Story text */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "0.98rem",
          color: "var(--ink-faint)",
          lineHeight: 1.85,
          marginBottom: "1.5rem",
          opacity: textVisible ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}
      >
        There is a kind of silence that only ancient roads know — one that holds
        centuries of footsteps and the whispers of traders long gone. I walked a
        stretch of it somewhere between Balkh and the border, and understood why
        my grandfather spoke of it like a dream.
      </p>

      {/* Image placeholder */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/7",
          background: "var(--bg)",
          borderRadius: "10px",
          border: "1px solid var(--rule)",
          marginBottom: "1.5rem",
          overflow: "hidden",
          opacity: textVisible ? 1 : 0,
          transition: "opacity 0.6s ease 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Camera size={22} color="var(--rule)" />
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: textVisible ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <MapPin size={11} color="var(--accent)" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              color: "var(--ink-faint)",
              fontWeight: 300,
            }}
          >
            Balkh, Afghanistan
          </span>
        </div>

        <Link
          href="/stories/walking-the-silk-road"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.68rem",
            color: "var(--accent)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Read more <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "var(--surface)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
  padding: "2rem",
  border: "1px solid var(--rule)",
};

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ paddingTop: "56px", background: "var(--bg)" }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "5rem 2.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
          gap: "4rem",
        }}
      >
        {/* Left — text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              color: "var(--accent)",
              fontWeight: 400,
            }}
          >
            photography · stories · travel
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 400,
              color: "var(--ink)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            Roads of
            <br />
            Curiosity
          </h1>

          <div
            style={{
              width: "48px",
              height: "2px",
              background: "var(--accent)",
              borderRadius: "2px",
            }}
          />

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--ink-faint)",
              lineHeight: 1.85,
              maxWidth: "380px",
            }}
          >
            A visual journal of places, light, and the stories found along the
            way.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/gallery"
              style={{
                padding: "0.75rem 1.8rem",
                background: "var(--accent)",
                color: "#fff",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                borderRadius: "8px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View Gallery
            </Link>
            <Link
              href="/stories"
              style={{
                padding: "0.75rem 1.8rem",
                border: "1px solid var(--rule)",
                color: "var(--ink-faint)",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                borderRadius: "8px",
                background: "transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--ink-faint)";
                e.currentTarget.style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--rule)";
                e.currentTarget.style.color = "var(--ink-faint)";
              }}
            >
              Read Stories
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--rule)",
            }}
          >
            {[
              { value: "120+", label: "Photographs" },
              { value: "24", label: "Stories" },
              { value: "6", label: "Countries" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    color: "var(--ink-faint)",
                    fontWeight: 300,
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — animated card */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="hero-card"
        >
          <HeroCard />
        </div>
      </section>

      {/* Recent Photos */}
      <section style={{ padding: "2rem 2.5rem 3rem" }}>
        <div style={{ ...cardStyle, maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1.8rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Camera size={16} color="#fff" />
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 400,
                  color: "var(--ink)",
                }}
              >
                Recent Photos
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "var(--ink-faint)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: "320px",
                }}
              >
                A selection of recent photographs from roads and valleys across
                Central Asia.
              </p>
            </div>
            <Link
              href="/gallery"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.75rem",
                color: "var(--accent)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                transition: "opacity 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              All photos <ArrowRight size={13} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              {
                label: "Mountain Silence",
                location: "Hindu Kush, Afghanistan",
                aspect: "4/5",
              },
              {
                label: "The Last Light",
                location: "Bamiyan Valley",
                aspect: "4/3",
              },
              {
                label: "Desert Roads",
                location: "Dasht-e Margo",
                aspect: "4/5",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: item.aspect,
                  background: "var(--bg)",
                  borderRadius: "10px",
                  border: "1px solid var(--rule)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1rem",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.querySelector(".label").style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.querySelector(".label").style.opacity = "0")
                }
              >
                <div
                  className="label"
                  style={{
                    opacity: 0,
                    transition: "opacity 0.25s ease",
                    background: "var(--surface)",
                    borderRadius: "8px",
                    padding: "0.6rem 0.8rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.92rem",
                      color: "var(--ink)",
                      fontWeight: 400,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      color: "var(--ink-faint)",
                      marginTop: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <MapPin size={9} color="var(--accent)" />
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section style={{ padding: "1rem 2.5rem 5rem" }}>
        <div style={{ ...cardStyle, maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1.8rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <BookOpen size={16} color="#fff" />
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 400,
                  color: "var(--ink)",
                }}
              >
                Latest Stories
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "var(--ink-faint)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: "320px",
                }}
              >
                Written accounts of places, people, and moments that stay with
                you long after the road ends.
              </p>
            </div>
            <Link
              href="/stories"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.75rem",
                color: "var(--accent)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                transition: "opacity 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              All stories <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              {
                title: "Walking the Silk Road",
                excerpt:
                  "There is a kind of silence that only ancient roads know — one that holds centuries of footsteps.",
                date: "March 2024",
                category: "Travel",
              },
              {
                title: "Light Over Bamiyan",
                excerpt:
                  "The valley changes color every hour. By noon it is gold. By dusk it is grief.",
                date: "January 2024",
                category: "Photography",
              },
              {
                title: "A Cup of Tea in Kandahar",
                excerpt:
                  "He poured the tea slowly, as if time here was not something to be saved but savored.",
                date: "November 2023",
                category: "People",
              },
            ].map((story, i, arr) => (
              <Link
                key={i}
                href="/stories"
                style={{
                  padding: "1.3rem 0",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "1.5rem",
                  alignItems: "center",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "var(--accent)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.08em",
                      background:
                        "color-mix(in srgb, var(--accent) 10%, transparent)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      alignSelf: "flex-start",
                    }}
                  >
                    {story.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                      color: "var(--ink)",
                    }}
                  >
                    {story.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "0.88rem",
                      color: "var(--ink-faint)",
                      lineHeight: 1.6,
                    }}
                  >
                    {story.excerpt}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--ink-faint)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {story.date}
                  </span>
                  <ArrowRight size={14} color="var(--accent)" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-card { display: none !important; }
        }
      `}</style>
    </main>
  );
}
