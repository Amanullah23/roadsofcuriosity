"use client";

// Roads of Curiosity — About (new visual system: "The Route")
// Target: app/(site)/about/page.js

import { useState, useEffect } from "react";
import Link from "next/link";
import RouteLine from "@/components/RouteLine";
import { getAboutContent } from "@/lib/api";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const SURFACE = "#EDE7DA";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

// Falls back to this if /api/about isn't reachable — same copy as before,
// now editable from Admin → About page.
const DEFAULT_ABOUT = {
  kicker: "The photographer",
  name: "Rik Alexander Nelissen",
  intro:
    "He doesn't set out to photograph a place. He sets out to sit with it — the camera comes along for whatever's left over once the tea is finished.",
  tagline: "Years on the road, more cups of tea than he's bothered to count",
  portrait_image:
    "https://images.unsplash.com/photo-1577632584998-56efd90c5a42?q=80&w=1200&auto=format&fit=crop",
  work_paragraph_1:
    "Roads of Curiosity started the way most honest projects do — without a plan. A camera that went everywhere he did, and a habit of writing down what happened before the photograph, not just what the photograph showed.",
  work_paragraph_2:
    "The stories and the notebook both come from the same roads. So far, those roads have run through:",
  quote:
    "I don't go looking for the photograph. I go looking for the conversation, and the photograph is what's left when it's over.",
  places: "Afghanistan, Iran, Java",
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
        fontSize: "0.92rem",
        fontWeight: 500,
        color,
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
          strokeDashoffset={hovered ? 0 : 110}
          style={{ transition: "stroke-dashoffset 0.45s ease" }}
        />
      </svg>
    </Link>
  );
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [about, setAbout] = useState(DEFAULT_ABOUT);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getAboutContent();
        if (data && Object.keys(data).length > 0) {
          setAbout((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // keep DEFAULT_ABOUT
      }
    };
    init();
  }, []);

  const placesList = (about.places || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main style={{ background: BG }}>
      {/* ── Hero: portrait and name, a collision like the home page ── */}
      <section
        className="roc-about-hero"
        style={{ position: "relative", minHeight: "78vh" }}
      >
        <div
          className="roc-about-hero-text"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "7rem 2rem 3rem 2.5rem",
            maxWidth: "580px",
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.8rem",
              color: CLAY,
              marginBottom: "1.1rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            {about.kicker}
          </p>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontOpticalSizing: "auto",
              fontWeight: 480,
              fontSize: "clamp(2.6rem, 6vw, 4rem)",
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              opacity: mounted ? 1 : 0,
              filter: mounted ? "blur(0px)" : "blur(12px)",
              transition: "opacity 1s ease, filter 1s ease",
            }}
          >
            {about.name}
          </h1>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "1rem",
              color: FAINT,
              lineHeight: 1.75,
              marginTop: "1.75rem",
              maxWidth: "460px",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.3s",
            }}
          >
            {about.intro}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              marginTop: "2.25rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          >
            <span style={{ width: "22px", height: "1px", background: GOLD }} />
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.78rem",
                color: FAINT,
              }}
            >
              {about.tagline}
            </span>
          </div>
        </div>

        <div
          className="roc-about-hero-image"
          style={{
            position: "relative",
            overflow: "hidden",
            background: SURFACE,
          }}
        >
          <img
            src={about.portrait_image}
            alt={about.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              clipPath: mounted ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
              transition: "clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          />
        </div>
      </section>

      <div style={{ position: "relative" }}>
        <RouteLine
          waypoints={[
            "Begin",
            "The work",
            "In his own words",
            "Join the journey",
          ]}
        />
        <div className="roc-threaded">
          {/* ── The work ── */}
          <section style={{ padding: "6rem 2rem" }}>
            <div style={{ maxWidth: "760px", margin: "0 auto" }}>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontOpticalSizing: "auto",
                  fontWeight: 500,
                  fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
                  color: INK,
                  marginBottom: "1.75rem",
                }}
              >
                The work
              </h2>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.85,
                  color: INK,
                  marginBottom: "1.5rem",
                }}
              >
                {about.work_paragraph_1}
              </p>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.85,
                  color: FAINT,
                  marginBottom: "2rem",
                }}
              >
                {about.work_paragraph_2}
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {placesList.map((p) => (
                  <TracedLink
                    key={p}
                    href={`/stories?place=${encodeURIComponent(p)}`}
                  >
                    {p}
                  </TracedLink>
                ))}
              </div>
            </div>
          </section>

          {/* ── In his own words — the one bold, dark moment on this page ── */}
          <section style={{ background: PETROL, padding: "6.5rem 2rem" }}>
            <div
              style={{
                maxWidth: "780px",
                margin: "0 auto",
                display: "flex",
                gap: "1.75rem",
              }}
            >
              <span
                style={{
                  width: "2px",
                  background: GOLD,
                  flexShrink: 0,
                  alignSelf: "stretch",
                }}
              />
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1.6rem, 3vw, 2.3rem)",
                  lineHeight: 1.5,
                  color: BG,
                }}
              >
                "{about.quote}"
              </p>
            </div>
          </section>

          {/* ── Cross-link ── */}
          <section style={{ padding: "6rem 2rem" }}>
            <div
              style={{
                maxWidth: "760px",
                margin: "0 auto",
                borderTop: `1px solid ${RULE}`,
                paddingTop: "2.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: FAINT,
                    marginBottom: "0.5rem",
                  }}
                >
                  Also leading small groups through these same roads
                </p>
                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: "italic",
                    fontSize: "1.3rem",
                    color: INK,
                  }}
                >
                  Ariana Expeditions
                </h3>
              </div>
              <TracedLink href="https://ariana-expeditions.com" color={CLAY}>
                Visit the site
              </TracedLink>
            </div>
          </section>

          {/* ── Closing dual CTA ── */}
          <section style={{ padding: "2rem 2rem 7rem" }}>
            <div
              style={{
                maxWidth: "760px",
                margin: "0 auto",
                display: "flex",
                gap: "2.5rem",
                flexWrap: "wrap",
                borderTop: `1px solid ${RULE}`,
                paddingTop: "2.5rem",
              }}
            >
              <TracedLink href="/stories">Read the stories</TracedLink>
              <TracedLink href="/contact" color={CLAY}>
                Get in touch
              </TracedLink>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .roc-about-hero { display: grid; grid-template-columns: 0.95fr 1.2fr; }
        .roc-threaded { padding-left: 76px; }

        @media (min-width: 861px) and (max-width: 1100px) {
          .roc-threaded { padding-left: 56px; }
        }

        @media (max-width: 860px) {
          .roc-about-hero { grid-template-columns: 1fr; min-height: auto; }
          .roc-about-hero-text { padding: 3rem 1.5rem 2.5rem !important; max-width: 100% !important; }
          .roc-about-hero-image { height: 50vh; }
          .roc-threaded { padding-left: 0; }
        }
      `}</style>
    </main>
  );
}
