"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const entries = [
  {
    id: 1,
    slug: "the-man-who-sold-time",
    date: "June 12, 2024",
    place: "Kabul, Afghanistan",
    title: "The man who sold time",
    body: "He sat at the corner of the market with a single tray of watches, none of them working. When I asked why he sold watches that told no time, he said: people do not buy watches for the time. They buy them to feel that time belongs to them.",
    type: "Encounter",
  },
  {
    id: 2,
    slug: "notes-on-dust",
    date: "May 28, 2024",
    place: "Kandahar, Afghanistan",
    title: "Notes on dust",
    body: "In Kandahar, dust is not dirt. It is the citys memory — the pulverised record of everything that has stood here and fallen. You breathe it in and become, for a moment, part of what came before you.",
    type: "Note",
  },
  {
    id: 3,
    slug: "what-the-map-left-out",
    date: "May 3, 2024",
    place: "Wakhan Corridor",
    title: "What the map left out",
    body: "The map showed a road. On the ground there was no road, only a direction — a general understanding between the mountains that you could pass this way if you were careful and the weather allowed it. I have learned to trust directions more than roads.",
    type: "Note",
  },
  {
    id: 4,
    slug: "the-colour-of-waiting",
    date: "April 17, 2024",
    place: "Mazar-i-Sharif, Afghanistan",
    title: "The colour of waiting",
    body: "Every border crossing has its own particular light. Not the light of the sun — the light of suspended time. People waiting are people briefly outside their lives. I have spent a lot of time photographing people waiting. I think it is the most honest thing a camera can find.",
    type: "Discovery",
  },
  {
    id: 5,
    slug: "bread",
    date: "March 30, 2024",
    place: "Balkh, Afghanistan",
    title: "Bread",
    body: "In every country I have travelled through, the first thing offered has been bread. Not conversation, not tea, not an explanation of who lives here or what they believe. Bread first. Everything else after. There is a whole philosophy in that order.",
    type: "Encounter",
  },
  {
    id: 6,
    slug: "the-bamiyan-question",
    date: "February 8, 2024",
    place: "Bamiyan Valley",
    title: "The Bamiyan question",
    body: "A historian told me that the niches where the Buddhas stood are now more significant than the statues were. Absence, she said, asks a harder question than presence. I have been thinking about that for three months. I think she is right, and I think it applies to photographs too.",
    type: "Discovery",
  },
  {
    id: 7,
    slug: "on-taking-portraits",
    date: "January 21, 2024",
    place: "Panjshir Valley",
    title: "On taking portraits",
    body: "Someone asked me what I do before I take a portrait. I said: I wait until I forget about the camera. They said that made no sense. But it is the only true answer I have. The camera is an obstacle. The photograph happens when the obstacle disappears.",
    type: "Note",
  },
];

const types = ["All", "Encounter", "Note", "Discovery"];

export default function Journal() {
  return (
    <main
      style={{
        paddingTop: "60px",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* Header */}
      <section
        style={{
          padding: "5rem 2.5rem 4rem",
          borderBottom: "1px solid var(--rule)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "end",
        }}
        className="journal-header"
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
            FROM THE ROAD
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
            Journal
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
            Shorter encounters, notes from the road, historical discoveries and
            writing that does not yet belong to a full photographic series. A
            place for things that are still becoming.
          </p>
        </div>
      </section>

      {/* Type filter */}
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
          TYPE
        </span>
        {types.map((type, i) => (
          <span
            key={type}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: type === "All" ? "var(--ink)" : "var(--ink-faint)",
              fontWeight: type === "All" ? 400 : 300,
              padding: "0.4rem 1rem",
              borderRight:
                i < types.length - 1 ? "1px solid var(--rule)" : "none",
              borderLeft: i === 0 ? "1px solid var(--rule)" : "none",
              cursor: "pointer",
            }}
          >
            {type}
          </span>
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
          {entries.length} entries
        </span>
      </section>

      {/* Entries */}
      <section>
        {entries.map((entry, i) => (
          <article
            key={entry.id}
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                minHeight: "1px",
              }}
              className="entry-row"
            >
              {/* Left — meta */}
              <div
                style={{
                  borderRight: "1px solid var(--rule)",
                  padding: "2.5rem 2rem 2.5rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  justifyContent: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    color: "var(--accent)",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    borderBottom: "1px solid var(--accent)",
                    paddingBottom: "1px",
                    alignSelf: "flex-start",
                  }}
                >
                  {entry.type.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    color: "var(--ink-faint)",
                    fontWeight: 300,
                    lineHeight: 1.5,
                  }}
                >
                  {entry.date}
                </span>
                <span
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontStyle: "italic",
                    fontSize: "0.72rem",
                    color: "var(--ink-faint)",
                    lineHeight: 1.5,
                  }}
                >
                  {entry.place}
                </span>
              </div>

              {/* Right — content */}
              <Link
                href={`/journal/${entry.slug}`}
                style={{
                  padding: "2.5rem 3rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--surface)";
                  e.currentTarget.querySelector(".read-link").style.opacity =
                    "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.querySelector(".read-link").style.opacity =
                    "0";
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    fontWeight: 400,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  {entry.title}
                </h2>

                <p
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: "var(--ink-faint)",
                    lineHeight: 1.85,
                    maxWidth: "580px",
                  }}
                >
                  {entry.body}
                </p>

                <span
                  className="read-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 400,
                    color: "var(--accent)",
                    letterSpacing: "0.04em",
                    opacity: 0,
                    transition: "opacity 0.2s ease",
                    alignSelf: "flex-start",
                  }}
                >
                  Read entry <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom note */}
      <section
        style={{
          padding: "5rem 2.5rem",
          textAlign: "center",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            color: "var(--ink-faint)",
            lineHeight: 1.8,
            maxWidth: "460px",
            margin: "0 auto 2rem",
          }}
        >
          Some of these notes will grow into full stories. Others are content to
          stay small.
        </p>
        <Link
          href="/stories"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
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
          Read the full stories <ArrowRight size={12} />
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .journal-header { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .entry-row { grid-template-columns: 1fr !important; }
          .entry-row > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--rule) !important;
            padding: 1.5rem 1.5rem !important;
            flex-direction: row !important;
            gap: 1.5rem !important;
            align-items: center !important;
          }
          .entry-row > a { padding: 1.5rem !important; }
        }
      `}</style>
    </main>
  );
}
