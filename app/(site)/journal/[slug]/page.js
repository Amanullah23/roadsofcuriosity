"use client";

// Roads of Curiosity — Journal entry (new visual system: "The Route")
// Target: app/(site)/journal/[slug]/page.js
//
// A single page of the notebook, given room to just be read — no
// route line here, the journey device belongs to the index; a
// single entry is a place to stop, not to travel through.

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { entries as staticEntries } from "@/lib/data";
import { getJournalEntry, getJournalEntries } from "@/lib/api";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const SURFACE = "#EDE7DA";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

const TYPE_COLOURS = { Encounter: PETROL, Note: CLAY, Discovery: GOLD };

export default function JournalEntryPage() {
  const params = useParams();
  const [entry, setEntry] = useState(null);
  const [allEntries, setAllEntries] = useState(staticEntries);
  const [notFound, setNotFound] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);

    const init = async () => {
      try {
        const data = await getJournalEntry(params.slug);
        if (data && data.slug) {
          setEntry(data);
        } else {
          const found = staticEntries.find((e) => e.slug === params.slug);
          if (found) setEntry(found);
          else setNotFound(true);
        }
      } catch {
        const found = staticEntries.find((e) => e.slug === params.slug);
        if (found) setEntry(found);
        else setNotFound(true);
      }

      try {
        const list = await getJournalEntries();
        if (Array.isArray(list) && list.length > 0) setAllEntries(list);
      } catch {
        /* static fallback */
      }
    };
    init();
    return () => clearTimeout(t);
  }, [params.slug]);

  if (notFound) {
    return (
      <main
        style={{
          background: BG,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: "1.5rem",
            color: INK,
            marginBottom: "1.5rem",
          }}
        >
          This page seems to have slipped out of the notebook.
        </p>
        <Link
          href="/journal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.85rem",
            color: PETROL,
            borderBottom: `1px solid ${PETROL}`,
            paddingBottom: "2px",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={13} /> Back to the notebook
        </Link>
      </main>
    );
  }

  if (!entry) {
    return (
      <main
        style={{
          background: BG,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            color: FAINT,
          }}
        >
          Turning the page…
        </p>
      </main>
    );
  }

  const typeColour = TYPE_COLOURS[entry.type] || CLAY;
  const idx = allEntries.findIndex((e) => e.slug === entry.slug);
  const prevEntry = idx > 0 ? allEntries[idx - 1] : null;
  const nextEntry =
    idx >= 0 && idx < allEntries.length - 1 ? allEntries[idx + 1] : null;
  const paragraphs = (entry.body || "").split(/\n\n+/).filter(Boolean);

  return (
    <main style={{ background: BG, minHeight: "100vh" }}>
      <section
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "6rem 2rem 2rem",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.85s ease, transform 0.85s ease",
        }}
      >
        <Link
          href="/journal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.76rem",
            color: FAINT,
            textDecoration: "none",
            marginBottom: "2.25rem",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = PETROL)}
          onMouseLeave={(e) => (e.currentTarget.style.color = FAINT)}
        >
          <ArrowLeft size={13} /> All entries
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}
          >
            <span
              style={{ width: "8px", height: "8px", background: typeColour }}
            />
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.74rem",
                color: typeColour,
                fontWeight: 600,
              }}
            >
              {entry.type}
            </span>
          </span>
          {entry.place && (
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.78rem",
                color: FAINT,
              }}
            >
              {entry.place}
            </span>
          )}
          {entry.date && (
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.78rem",
                color: FAINT,
              }}
            >
              · {entry.date}
            </span>
          )}
        </div>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontWeight: 480,
            fontSize: "clamp(2rem, 5vw, 2.9rem)",
            color: INK,
            lineHeight: 1.1,
          }}
        >
          {entry.title}
        </h1>
      </section>

      {entry.image && (
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "2rem 2rem 1rem",
          }}
        >
          <div
            style={{
              aspectRatio: "16 / 9",
              background: SURFACE,
              overflow: "hidden",
            }}
          >
            <img
              src={entry.image}
              alt={entry.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </section>
      )}

      <section
        style={{
          maxWidth: "660px",
          margin: "0 auto",
          padding: "2rem 2rem 4rem",
        }}
      >
        {paragraphs.length > 0 ? (
          paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 400,
                fontOpticalSizing: "auto",
                fontSize: "1.15rem",
                color: INK,
                lineHeight: 1.85,
                marginBottom: "1.6rem",
              }}
            >
              {para}
            </p>
          ))
        ) : (
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: FAINT,
            }}
          >
            {entry.body}
          </p>
        )}
      </section>

      <section
        style={{
          borderTop: `1px solid ${RULE}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="roc-prevnext"
      >
        {prevEntry ? (
          <Link
            href={`/journal/${prevEntry.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "2.25rem 2rem",
              borderRight: `1px solid ${RULE}`,
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = SURFACE)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.72rem",
                color: FAINT,
              }}
            >
              <ArrowLeft size={11} /> Previous
            </span>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: INK,
              }}
            >
              {prevEntry.title}
            </span>
          </Link>
        ) : (
          <div style={{ borderRight: `1px solid ${RULE}` }} />
        )}

        {nextEntry ? (
          <Link
            href={`/journal/${nextEntry.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
              gap: "0.5rem",
              padding: "2.25rem 2rem",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = SURFACE)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.72rem",
                color: FAINT,
              }}
            >
              Next <ArrowRight size={11} />
            </span>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: INK,
              }}
            >
              {nextEntry.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        @media (max-width: 680px) {
          .roc-prevnext { grid-template-columns: 1fr !important; }
          .roc-prevnext > a:first-child { border-right: none !important; border-bottom: 1px solid ${RULE}; }
          .roc-prevnext > a:last-child { align-items: flex-start !important; text-align: left !important; }
        }
      `}</style>
    </main>
  );
}
