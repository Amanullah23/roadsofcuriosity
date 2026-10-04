"use client";

// Roads of Curiosity — Journal index (new visual system: "The Route")
// Target: app/(site)/journal/page.js
//
// The notebook itself: entries grouped by what kind of moment they
// were, laid out as a loose scatter of tilted pages rather than a
// tidy list — the way notes actually sit in a notebook.

import { useState, useEffect } from "react";
import Link from "next/link";
import { entries as staticEntries } from "@/lib/data";
import { getJournalEntries } from "@/lib/api";
import RouteLine from "@/components/RouteLine";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const SURFACE = "#EDE7DA";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

const TYPE_ORDER = ["Encounter", "Note", "Discovery"];
const TYPE_COLOURS = { Encounter: PETROL, Note: CLAY, Discovery: GOLD };
const TYPE_NOTE = {
  Encounter: "A person, a conversation, a moment that stayed.",
  Note: "Something small, written down before it faded.",
  Discovery: "A place or a detail found by accident.",
};

function TracedLink({ href, children, color = PETROL }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: "0.85rem",
        fontWeight: 500,
        color,
        textDecoration: "none",
        paddingBottom: "0.25rem",
      }}
    >
      {children}
      <svg
        width="100%"
        height="8"
        viewBox="0 0 90 8"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "8px",
        }}
      >
        <path
          d="M1,4 C18,0.5 32,7.5 45,3.5 C58,-0.5 72,7 89,3"
          fill="none"
          stroke={color}
          strokeWidth="1.3"
          strokeDasharray="110"
          strokeDashoffset={hovered ? 0 : 110}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
    </Link>
  );
}

function EntryCard({ entry, rotate }) {
  const colour = TYPE_COLOURS[entry.type] || CLAY;
  const excerpt = (entry.body || "").replace(/\s+/g, " ").slice(0, 150);

  return (
    <Link
      href={`/journal/${entry.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          position: "relative",
          background: SURFACE,
          border: `1px solid ${RULE}`,
          padding: "1.75rem 1.9rem",
          width: "320px",
          transform: `rotate(${rotate}deg)`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        className="roc-journal-card"
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            left: "1.9rem",
            width: "26px",
            height: "8px",
            background: colour,
          }}
        />

        {entry.place && (
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.68rem",
              color: FAINT,
              marginBottom: "0.6rem",
            }}
          >
            {entry.place}
            {entry.date ? ` · ${entry.date}` : ""}
          </p>
        )}

        <h4
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "1.25rem",
            color: INK,
            lineHeight: 1.35,
            marginBottom: "0.75rem",
          }}
        >
          {entry.title}
        </h4>

        {excerpt && (
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.82rem",
              color: FAINT,
              lineHeight: 1.65,
              marginBottom: "1rem",
            }}
          >
            {excerpt}
            {entry.body && entry.body.length > 150 ? "…" : ""}
          </p>
        )}

        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.74rem",
            color: colour,
            fontWeight: 600,
          }}
        >
          Read entry
        </span>
      </div>
    </Link>
  );
}

export default function JournalPage() {
  const [entries, setEntries] = useState(staticEntries);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    const init = async () => {
      try {
        const data = await getJournalEntries();
        if (Array.isArray(data) && data.length > 0) setEntries(data);
      } catch {
        /* static fallback */
      }
    };
    init();
    return () => clearTimeout(t);
  }, []);

  const groups = TYPE_ORDER.map((type) => ({
    type,
    items: entries.filter((e) => e.type === type),
  })).filter((g) => g.items.length > 0);

  const waypoints = ["Begin", ...groups.map((g) => g.type), "Close"];

  return (
    <main style={{ background: BG }}>
      {/* ── Intro ── */}
      <section
        style={{
          padding: "7rem 2rem 3rem",
          maxWidth: "1360px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontWeight: 480,
            fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
            color: INK,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            maxWidth: "680px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          The notebook
        </h1>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.95rem",
            color: FAINT,
            lineHeight: 1.7,
            marginTop: "1.25rem",
            maxWidth: "480px",
          }}
        >
          Shorter than a story, written closer to the moment it happened.
        </p>

        {groups.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginTop: "2.25rem",
            }}
          >
            {groups.map((g) => (
              <a
                key={g.type}
                href={`#type-${g.type}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: INK,
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: TYPE_COLOURS[g.type],
                  }}
                />
                {g.type}{" "}
                <span style={{ color: FAINT }}>({g.items.length})</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ── Groups, threaded by the route ── */}
      <div style={{ position: "relative" }}>
        <RouteLine waypoints={waypoints} />
        <div className="roc-threaded">
          {groups.length === 0 && (
            <div style={{ padding: "2rem 2rem 6rem" }}>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  color: FAINT,
                  fontSize: "1.1rem",
                }}
              >
                Nothing written down yet.
              </p>
            </div>
          )}

          {groups.map((group, gi) => (
            <section
              key={group.type}
              id={`type-${group.type}`}
              style={{
                padding: "3rem 2rem 5rem",
                borderTop: gi > 0 ? `1px solid ${RULE}` : "none",
              }}
            >
              <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.9rem",
                    marginBottom: "2.25rem",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontOpticalSizing: "auto",
                      fontWeight: 500,
                      fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                      color: INK,
                    }}
                  >
                    {group.type}
                  </h2>
                  <span
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: FAINT,
                      fontStyle: "italic",
                    }}
                  >
                    — {TYPE_NOTE[group.type]}
                  </span>
                </div>

                <div
                  className="roc-journal-scatter"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "2rem 1.75rem",
                  }}
                >
                  {group.items.map((entry, i) => (
                    <EntryCard
                      key={entry.slug}
                      entry={entry}
                      rotate={i % 2 === 0 ? -0.6 : 0.5}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .roc-journal-card:hover { transform: rotate(0deg) translateY(-3px) !important; box-shadow: 0 10px 24px rgba(41,45,43,0.1); }

        .roc-threaded { padding-left: 76px; }

        @media (min-width: 861px) and (max-width: 1100px) {
          .roc-threaded { padding-left: 56px; }
        }

        @media (max-width: 860px) {
          .roc-threaded { padding-left: 0; }
          .roc-journal-scatter { justify-content: center; }
          .roc-journal-card { width: 100% !important; max-width: 420px; transform: none !important; }
        }
      `}</style>
    </main>
  );
}
