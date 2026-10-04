"use client";

// Roads of Curiosity — 404 (new visual system: "The Route")
// Target: app/(site)/not-found.js
//
// The road itself, drawn the same way as the signature RouteLine
// device, simply running out — the one place on the site where the
// line doesn't reach a waypoint.

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

function RoadEnds() {
  return (
    <svg
      width="240"
      height="86"
      viewBox="0 0 240 86"
      fill="none"
      style={{ display: "block", margin: "0 auto" }}
    >
      <path
        d="M10,66 C44,66 44,18 82,18 C120,18 120,58 156,58 C180,58 186,44 196,40"
        stroke={RULE}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M10,66 C44,66 44,18 82,18 C120,18 120,58 156,58 C180,58 186,44 196,40"
        stroke={PETROL}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="300"
        strokeDashoffset="20"
      />
      <circle
        cx="10"
        cy="66"
        r="4"
        fill={GOLD}
        stroke={PETROL}
        strokeWidth="1.4"
      />
      <g transform="translate(196, 40)">
        <circle
          r="3.5"
          fill="none"
          stroke={CLAY}
          strokeWidth="1.4"
          strokeDasharray="2 2"
        />
      </g>
    </svg>
  );
}

function TracedLink({ href, children, color = PETROL }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
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

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

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
      <div
        style={{
          maxWidth: "480px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <div style={{ marginBottom: "2.25rem" }}>
          <RoadEnds />
        </div>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontWeight: 480,
            fontSize: "clamp(3.2rem, 9vw, 5rem)",
            color: INK,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}
        >
          404
        </h1>

        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: INK,
            lineHeight: 1.65,
            marginBottom: "1rem",
          }}
        >
          The road doesn't reach this far yet.
        </p>

        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.92rem",
            color: FAINT,
            lineHeight: 1.75,
            marginBottom: "2.5rem",
          }}
        >
          Either this page moved, or it was never part of the journey. Let's get
          you back on the route.
        </p>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <TracedLink href="/">
            <ArrowLeft size={14} /> Back home
          </TracedLink>
          <TracedLink href="/stories" color={CLAY}>
            Read the stories <ArrowRight size={14} />
          </TracedLink>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </main>
  );
}
