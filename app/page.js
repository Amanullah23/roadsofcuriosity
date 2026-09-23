"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { theme } = useTheme();

  const color = theme === "dark" ? "#f0f0f0" : "#111";
  const subtle = theme === "dark" ? "rgba(240,240,240,0.4)" : "rgba(0,0,0,0.4)";
  const border =
    theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const cardBg =
    theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";

  return (
    <main style={{ paddingTop: "64px" }}>
      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "6rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              theme === "dark"
                ? "radial-gradient(ellipse at 50% 60%, rgba(80,60,40,0.25) 0%, transparent 70%)"
                : "radial-gradient(ellipse at 50% 60%, rgba(180,160,130,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            color: subtle,
            marginBottom: "2rem",
          }}
        >
          photography · stories · travel
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            fontWeight: 400,
            color,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: "1.8rem",
            maxWidth: "800px",
          }}
        >
          Roads of
          <br />
          Curiosity
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: subtle,
            maxWidth: "420px",
            lineHeight: 1.8,
            marginBottom: "3rem",
            fontFamily: "Georgia, serif",
          }}
        >
          A visual journal of places, light, and the stories found along the
          way.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1.2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/gallery"
            style={{
              padding: "0.75rem 2rem",
              background: color,
              color: theme === "dark" ? "#0a0a0a" : "#fff",
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View Gallery
          </Link>
          <Link
            href="/stories"
            style={{
              padding: "0.75rem 2rem",
              border: `1px solid ${border}`,
              color,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Read Stories
          </Link>
        </div>
      </section>

      {/* Featured Photos */}
      <section style={{ padding: "5rem 2.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.6rem",
              fontWeight: 400,
              color,
            }}
          >
            Recent Photos
          </h2>
          <Link
            href="/gallery"
            style={{
              fontSize: "0.78rem",
              color: subtle,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = subtle)}
          >
            All photos <ArrowRight size={14} />
          </Link>
        </div>

        {/* Photo grid — placeholder cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
          }}
        >
          {[
            { label: "Mountain Silence", location: "Hindu Kush, Afghanistan" },
            { label: "The Last Light", location: "Bamiyan Valley" },
            { label: "Desert Roads", location: "Dasht-e Margo" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "4/5",
                background: cardBg,
                border: `1px solid ${border}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = subtle)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
            >
              <span
                style={{
                  fontSize: "0.9rem",
                  color,
                  fontFamily: "Georgia, serif",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: subtle,
                  marginTop: "0.3rem",
                }}
              >
                {item.location}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Stories */}
      <section
        style={{ padding: "5rem 2.5rem", borderTop: `1px solid ${border}` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.6rem",
              fontWeight: 400,
              color,
            }}
          >
            Latest Stories
          </h2>
          <Link
            href="/stories"
            style={{
              fontSize: "0.78rem",
              color: subtle,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = subtle)}
          >
            All stories <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            {
              title: "Walking the Silk Road",
              excerpt:
                "There is a kind of silence that only ancient roads know — one that holds centuries of footsteps.",
              date: "March 2024",
            },
            {
              title: "Light Over Bamiyan",
              excerpt:
                "The valley changes color every hour. By noon it is gold. By dusk it is grief.",
              date: "January 2024",
            },
            {
              title: "A Cup of Tea in Kandahar",
              excerpt:
                "He poured the tea slowly, as if time here was not something to be saved but savored.",
              date: "November 2023",
            },
          ].map((story, i) => (
            <Link
              key={i}
              href="/stories"
              style={{
                padding: "2rem 0",
                borderBottom: `1px solid ${border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "2rem",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.1rem",
                    color,
                    fontWeight: 400,
                  }}
                >
                  {story.title}
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: subtle,
                    lineHeight: 1.7,
                    maxWidth: "520px",
                  }}
                >
                  {story.excerpt}
                </span>
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: subtle,
                  flexShrink: 0,
                  marginTop: "0.3rem",
                }}
              >
                {story.date}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
