"use client";

// Roads of Curiosity — Stories index (new visual system: "The Route")
// Target: app/(site)/stories/page.js
//
// A logbook, not a card grid: each story gets its own composition,
// cycling through three distinct arrangements so no two neighbours
// look alike, threaded by the same route that runs through the
// whole site.

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getStories } from "@/lib/api";
import { stories as staticStories } from "@/lib/data";
import RouteLine from "@/components/RouteLine";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const SURFACE = "#EDE7DA";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

// Fallback photography — only shows for a story with no cover of its own.
const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1650511503717-113b2459fd13?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1784570269737-21da4658a609?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1741836019829-6c0be185e62a?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1721297014035-5fd86e65270f?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1692825655700-96f8bfa68166?q=80&w=1800&auto=format&fit=crop",
];

function TracedLink({ href, children, color = PETROL, active = false }) {
  const [hovered, setHovered] = useState(false);
  const traced = active || hovered;
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: "0.88rem",
        fontWeight: active ? 600 : 500,
        color: active ? color : INK,
        textDecoration: "none",
        paddingBottom: "0.3rem",
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
          strokeWidth="1.4"
          strokeDasharray="110"
          strokeDashoffset={traced ? 0 : 110}
          style={{ transition: "stroke-dashoffset 0.45s ease" }}
        />
      </svg>
    </Link>
  );
}

function PhotoFrame({ src, alt, aspect = "4 / 3" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: aspect,
        overflow: "hidden",
        background: SURFACE,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.015)" : "scale(1)",
          transition: "transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <span
        className="roc-corner roc-corner-tl"
        style={{ opacity: hovered ? 1 : 0 }}
      />
      <span
        className="roc-corner roc-corner-tr"
        style={{ opacity: hovered ? 1 : 0 }}
      />
      <span
        className="roc-corner roc-corner-bl"
        style={{ opacity: hovered ? 1 : 0 }}
      />
      <span
        className="roc-corner roc-corner-br"
        style={{ opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
}

// ─── Three ways to meet a story — cycled by position, never repeated back to back ──
function StoryRow({ story, index }) {
  const image =
    story.cover || story.image || SAMPLE_IMAGES[index % SAMPLE_IMAGES.length];
  const layout = index % 3;

  if (layout === 0) {
    // Full-bleed, caption floating off the corner
    return (
      <div style={{ position: "relative" }}>
        <PhotoFrame src={image} alt={story.title} aspect="16 / 8" />
        <div
          className="roc-plaque"
          style={{
            position: "relative",
            background: BG,
            border: `1px solid ${RULE}`,
            padding: "1.6rem 1.9rem",
            maxWidth: "420px",
            marginLeft: "auto",
            marginRight: "6%",
            transform: "translateY(-1.6rem)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "1.5rem",
              color: INK,
              marginBottom: "0.6rem",
              lineHeight: 1.2,
            }}
          >
            {story.title}
          </h2>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.78rem",
              color: FAINT,
              marginBottom: "1rem",
            }}
          >
            {story.place}
          </p>
          <TracedLink href={`/stories/${story.slug}`}>
            Read this story
          </TracedLink>
        </div>
      </div>
    );
  }

  if (layout === 1) {
    // Text-forward, pull quote leads, portrait image trails
    return (
      <div
        className="roc-split-text-first"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.68fr",
          gap: "3.5rem",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.3rem, 2.3vw, 1.8rem)",
              lineHeight: 1.45,
              color: INK,
              marginBottom: "1.5rem",
            }}
          >
            "
            {story.pullQuote ||
              story.excerpt ||
              story.intro ||
              "A place worth the detour."}
            "
          </p>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "1.2rem",
              color: PETROL,
              marginBottom: "0.5rem",
            }}
          >
            {story.title}
          </h3>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.8rem",
              color: FAINT,
              marginBottom: "1.25rem",
            }}
          >
            {story.place}
          </p>
          <TracedLink href={`/stories/${story.slug}`} color={CLAY}>
            Continue reading
          </TracedLink>
        </div>
        <PhotoFrame src={image} alt={story.title} aspect="3 / 4" />
      </div>
    );
  }

  // layout === 2 — image leads, wide and generous
  return (
    <div
      className="roc-split-image-first"
      style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 0.85fr",
        gap: "3rem",
        alignItems: "center",
      }}
    >
      <PhotoFrame src={image} alt={story.title} aspect="5 / 4" />
      <div>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontWeight: 500,
            fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
            color: INK,
            lineHeight: 1.2,
            marginBottom: "0.9rem",
          }}
        >
          {story.title}
        </h3>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.78rem",
            color: FAINT,
            marginBottom: "0.9rem",
          }}
        >
          {story.place}
        </p>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.9rem",
            color: FAINT,
            lineHeight: 1.75,
            marginBottom: "1.35rem",
          }}
        >
          {story.excerpt || story.intro}
        </p>
        <TracedLink href={`/stories/${story.slug}`}>Read this story</TracedLink>
      </div>
    </div>
  );
}

function StoriesContent() {
  const searchParams = useSearchParams();
  const placeParam = searchParams.get("place");

  const [stories, setStories] = useState(staticStories);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    const init = async () => {
      try {
        const data = await getStories();
        if (Array.isArray(data) && data.length > 0) setStories(data);
      } catch {
        /* static fallback */
      }
    };
    init();
    return () => clearTimeout(t);
  }, []);

  const published = stories.filter((s) => s.published !== false);
  const places = Array.from(
    new Set(published.map((s) => s.place).filter(Boolean)),
  );
  const filtered = placeParam
    ? published.filter((s) => s.place === placeParam)
    : published;

  const waypoints = [
    "Begin",
    ...filtered.slice(0, 6).map((s) => s.place || s.title),
    "The end, for now",
  ];

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
          Stories
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
          Longer pieces, each one a place that asked for more than a single
          photograph.
        </p>

        {places.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginTop: "2.25rem",
            }}
          >
            <TracedLink href="/stories" active={!placeParam}>
              All roads
            </TracedLink>
            {places.map((p) => (
              <TracedLink
                key={p}
                href={`/stories?place=${encodeURIComponent(p)}`}
                active={placeParam === p}
              >
                {p}
              </TracedLink>
            ))}
          </div>
        )}
      </section>

      {/* ── The stories, threaded by the route ── */}
      <div style={{ position: "relative" }}>
        <RouteLine waypoints={waypoints} />
        <div className="roc-threaded">
          {filtered.length === 0 ? (
            <div style={{ padding: "2rem 2rem 6rem" }}>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  color: FAINT,
                  fontSize: "1.1rem",
                }}
              >
                No stories from {placeParam} yet — the road hasn't reached
                there.
              </p>
            </div>
          ) : (
            filtered.map((story, i) => (
              <section
                key={story.slug}
                style={{
                  padding: i === 0 ? "1rem 2rem 6rem" : "0 2rem 6rem",
                  borderTop: i > 0 ? `1px solid ${RULE}` : "none",
                  paddingTop: i > 0 ? "5rem" : undefined,
                }}
              >
                <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
                  <StoryRow story={story} index={i} />
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .roc-corner { position: absolute; width: 20px; height: 20px; border-color: ${GOLD}; transition: opacity 0.3s ease; }
        .roc-corner-tl { top: 9px; left: 9px; border-top: 2px solid; border-left: 2px solid; }
        .roc-corner-tr { top: 9px; right: 9px; border-top: 2px solid; border-right: 2px solid; }
        .roc-corner-bl { bottom: 9px; left: 9px; border-bottom: 2px solid; border-left: 2px solid; }
        .roc-corner-br { bottom: 9px; right: 9px; border-bottom: 2px solid; border-right: 2px solid; }

        .roc-threaded { padding-left: 76px; }

        @media (min-width: 861px) and (max-width: 1100px) {
          .roc-threaded { padding-left: 56px; }
        }

        @media (max-width: 860px) {
          .roc-threaded { padding-left: 0; }
          .roc-split-text-first, .roc-split-image-first { grid-template-columns: 1fr !important; }
          .roc-plaque { margin-right: 0 !important; max-width: 100% !important; transform: none !important; }
        }
      `}</style>
    </main>
  );
}

export default function StoriesPage() {
  return (
    <Suspense fallback={null}>
      <StoriesContent />
    </Suspense>
  );
}
