"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <main
      style={{
        paddingTop: "60px",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* ── Header ── */}
      <section
        style={{
          padding: "5rem 2.5rem 4rem",
          borderBottom: "1px solid var(--rule)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "end",
        }}
        className="about-header"
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
            THE PHOTOGRAPHER
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
            Rik Alexander
            <br />
            Nelissen
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
            I travel because curiosity is stronger than comfort. I photograph
            because some things deserve to be seen more slowly. I write because
            the image alone never tells the whole story.
          </p>
        </div>
      </section>

      {/* ── Portrait + Opening bio ── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid var(--rule)",
          minHeight: "580px",
        }}
        className="about-portrait"
      >
        {/* Portrait */}
        <div
          style={{
            background: "var(--surface)",
            borderRight: "1px solid var(--rule)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.5rem",
            minHeight: "480px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, var(--surface) 0%, var(--rule) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
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
                portrait
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.58rem",
                color: "var(--ink-faint)",
                fontWeight: 300,
                letterSpacing: "0.08em",
              }}
            >
              Rik Alexander Nelissen
            </span>
          </div>
        </div>

        {/* Bio */}
        <div
          style={{
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2rem",
          }}
          className="about-bio-pad"
        >
          <blockquote
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              fontWeight: 400,
              color: "var(--ink)",
              lineHeight: 1.65,
              borderLeft: "2px solid var(--accent)",
              paddingLeft: "1.5rem",
              margin: 0,
            }}
          >
            "I photograph not what I see, but what I feel when I see it."
          </blockquote>

          <div
            style={{ width: "32px", height: "1px", background: "var(--rule)" }}
          />

          {[
            "I am a Dutch photographer and writer based between the Netherlands and Central Asia. My work is rooted in long, slow journeys — Afghanistan, Iran, Java — places that ask something of you before they give anything back.",
            "Photography, for me, is an act of attention. I am drawn to the in-between moments: a glance across a market, the way light falls on a wall at the wrong time of day, a conversation that happens because the road went wrong.",
            "Writing is how I process what the camera could not hold. Text should add a layer to the photograph, not merely explain what is visible. Together they form something closer to the truth than either alone.",
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "0.95rem",
                color: "var(--ink-faint)",
                lineHeight: 1.85,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── How I look and why I travel ── */}
      <section
        style={{
          borderBottom: "1px solid var(--rule)",
          padding: "5rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "var(--accent)",
              fontWeight: 400,
              marginBottom: "2rem",
            }}
          >
            HOW I LOOK AND WHY I TRAVEL
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {[
              {
                title: "Slow travel",
                body: "I never rush a place. I stay until the light changes, until the street becomes familiar, until I stop being a stranger. The best photographs come on the third day, when people have stopped noticing the camera.",
              },
              {
                title: "People first",
                body: "Landscapes set the stage, but people tell the story. The people I photograph are not illustrations of a place or a topic. They are the subject. I spend as much time listening as I do looking through the lens.",
              },
              {
                title: "Natural light only",
                body: "Every photograph uses the light that was already there. I do not add or correct. I only observe what the world offers at that particular moment, on that particular day.",
              },
              {
                title: "Writing as memory",
                body: "A photograph freezes a moment. A story explains why that moment mattered. The words I write sit alongside the image, not beneath it — they open a conversation rather than close one.",
              },
            ].map((item, i, arr) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "3rem",
                  paddingBottom: "2rem",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                }}
                className="approach-row"
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "0.65rem",
                      color: "var(--ink-faint)",
                      display: "block",
                      marginBottom: "0.5rem",
                      opacity: 0.5,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                      color: "var(--ink)",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "0.95rem",
                    color: "var(--ink-faint)",
                    lineHeight: 1.85,
                    paddingTop: "0.2rem",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipment ── */}
      <section
        style={{
          borderBottom: "1px solid var(--rule)",
          padding: "5rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "var(--accent)",
              fontWeight: 400,
              marginBottom: "2rem",
            }}
          >
            EQUIPMENT
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              {
                item: "Fujifilm X-T5",
                role: "Primary camera — landscapes, travel, long days",
              },
              {
                item: "Fujifilm X100V",
                role: "Street and documentary — quiet, unobtrusive",
              },
              {
                item: "XF 23mm f/1.4",
                role: "My most-used focal length — close but not intrusive",
              },
              {
                item: "XF 56mm f/1.2",
                role: "Portraits — enough distance for a person to be themselves",
              },
              {
                item: "Lightroom Classic",
                role: "Editing — minimal, film-inspired, never overcorrected",
              },
            ].map((gear, i, arr) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "2rem",
                  padding: "1.2rem 0",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                    flexShrink: 0,
                  }}
                >
                  {gear.item}
                </span>
                <span
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontStyle: "italic",
                    fontSize: "0.88rem",
                    color: "var(--ink-faint)",
                    textAlign: "right",
                  }}
                >
                  {gear.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connection to Ariana Expeditions ── */}
      <section
        style={{
          borderBottom: "1px solid var(--rule)",
          padding: "5rem 2.5rem",
          background: "var(--surface)",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "var(--petrol)",
              fontWeight: 400,
              marginBottom: "1.5rem",
            }}
          >
            PROFESSIONAL WORK
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "3rem",
              alignItems: "start",
            }}
            className="ariana-row"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  fontWeight: 400,
                  color: "var(--ink)",
                  lineHeight: 1.2,
                }}
              >
                Ariana Expeditions
              </h2>
              <p
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "0.95rem",
                  color: "var(--ink-faint)",
                  lineHeight: 1.85,
                  maxWidth: "480px",
                }}
              >
                Alongside Roads of Curiosity, I work with Ariana Expeditions — a
                travel company connecting visitors with the real Afghanistan. My
                photographs and stories from the field feed both worlds, though
                Roads of Curiosity remains clearly my own photographic identity.
              </p>
            </div>
            <Link
              href="https://ariana-expeditions.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 400,
                color: "var(--petrol)",
                letterSpacing: "0.04em",
                borderBottom: "1px solid var(--petrol)",
                paddingBottom: "2px",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Visit Ariana Expeditions <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Domain question ── */}
      <section
        style={{
          borderBottom: "1px solid var(--rule)",
          padding: "5rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
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
            ABOUT THIS WEBSITE
          </p>
          <p
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "0.95rem",
              color: "var(--ink-faint)",
              lineHeight: 1.85,
              maxWidth: "560px",
              marginBottom: "1.5rem",
            }}
          >
            Roads of Curiosity is built and hosted by Amanullah Yawari. The
            domain is registered in the Netherlands and connected to the server
            in Afghanistan. Each story has its own shareable page, designed to
            load efficiently even on slow connections.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
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
            Get in touch <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ── Closing quote ── */}
      <section style={{ padding: "7rem 2.5rem", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            color: "var(--ink)",
            lineHeight: 1.75,
            maxWidth: "580px",
            margin: "0 auto 2.5rem",
            opacity: 0.75,
          }}
        >
          "The question I keep coming back to is: after the first photograph,
          does a visitor want to keep looking, listening and expanding their
          view?"
        </p>
        <div
          style={{
            width: "32px",
            height: "1px",
            background: "var(--accent)",
            margin: "0 auto 2.5rem",
          }}
        />
        <Link
          href="/stories"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.85rem 2.2rem",
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
          Enter the stories <ArrowRight size={13} />
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-header { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .about-portrait { grid-template-columns: 1fr !important; }
          .about-portrait > div:first-child { min-height: 60vw !important; border-right: none !important; border-bottom: 1px solid var(--rule) !important; }
          .about-bio-pad { padding: 2.5rem 1.5rem !important; }
          .approach-row { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
          .ariana-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
