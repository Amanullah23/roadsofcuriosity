"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const color = theme === "dark" ? "#e8e4de" : "#1a1a1a";
  const subtle =
    theme === "dark" ? "rgba(232,228,222,0.3)" : "rgba(26,26,26,0.3)";
  const border =
    theme === "dark" ? "rgba(232,228,222,0.08)" : "rgba(26,26,26,0.08)";

  if (!mounted) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background large 404 */}
      <span
        style={{
          position: "absolute",
          fontFamily: "Georgia, serif",
          fontSize: "clamp(12rem, 35vw, 28rem)",
          fontWeight: 400,
          color,
          opacity: 0.03,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        404
      </span>

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          maxWidth: "480px",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: subtle,
          }}
        >
          lost on the road
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 400,
            color,
            lineHeight: 1.2,
          }}
        >
          This road leads nowhere
        </h1>

        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: subtle,
            lineHeight: 1.8,
          }}
        >
          The page you are looking for has wandered off the map. Perhaps it was
          never here, or perhaps it has moved on.
        </p>

        <div
          style={{
            width: "40px",
            height: "1px",
            background: subtle,
            margin: "0.5rem 0",
          }}
        />

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { href: "/", label: "Go home" },
            { href: "/gallery", label: "View gallery" },
            { href: "/stories", label: "Read stories" },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              style={{
                padding: "0.65rem 1.4rem",
                border: `1px solid ${border}`,
                color,
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                fontFamily: "system-ui, sans-serif",
                opacity: 0.6,
                transition: "opacity 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.borderColor = subtle;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
                e.currentTarget.style.borderColor = border;
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Quote */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.75rem",
            color: subtle,
            opacity: 0.5,
            marginTop: "1rem",
            lineHeight: 1.7,
          }}
        >
          "Not all those who wander are lost — but this page is."
        </p>
      </div>
    </main>
  );
}
