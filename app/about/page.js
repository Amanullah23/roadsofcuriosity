"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function About() {
  const { theme } = useTheme();

  const color = theme === "dark" ? "#f0f0f0" : "#111";
  const subtle =
    theme === "dark" ? "rgba(240,240,240,0.35)" : "rgba(0,0,0,0.35)";
  const border =
    theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const cardBg =
    theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";

  return (
    <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ padding: "4rem 2.5rem 2.5rem" }}>
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            color: subtle,
            marginBottom: "1rem",
          }}
        >
          the person behind the lens
        </p>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color,
            lineHeight: 1.1,
          }}
        >
          About
        </h1>
      </section>

      {/* Main content */}
      <section
        style={{
          padding: "2rem 2.5rem 6rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          maxWidth: "1000px",
        }}
      >
        {/* Portrait placeholder */}
        <div>
          <div
            style={{
              aspectRatio: "3/4",
              background: cardBg,
              border: `1px solid ${border}`,
              marginBottom: "1.2rem",
              maxWidth: "380px",
            }}
          />
          <p
            style={{
              fontSize: "0.72rem",
              color: subtle,
              letterSpacing: "0.08em",
            }}
          >
            Somewhere on the road — 2023
          </p>
        </div>

        {/* Bio */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.8rem",
            paddingTop: "0.5rem",
          }}
        >
          {/* Quote */}
          <blockquote
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.3rem",
              fontWeight: 400,
              color,
              lineHeight: 1.6,
              borderLeft: `2px solid ${subtle}`,
              paddingLeft: "1.5rem",
              margin: "0 0 0.5rem",
              opacity: 0.85,
            }}
          >
            "I photograph not what I see, but what I feel when I see it."
          </blockquote>

          {[
            `I am a photographer and writer drawn to the places most people pass through without stopping. Roads, borders, valleys, markets — the in-between spaces where real life happens quietly.`,
            `My work is rooted in Central Asia, particularly Afghanistan, where I have spent years documenting landscapes and the people who inhabit them with a dignity the news rarely shows.`,
            `Photography, for me, is an act of attention. Writing is how I process what the camera could not hold. Together they form something closer to the truth than either alone.`,
            `Roads of Curiosity is where I share both — not as a portfolio, but as a journal. An ongoing record of what it means to move through the world with open eyes.`,
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.95rem",
                color,
                lineHeight: 1.9,
                opacity: 0.8,
              }}
            >
              {para}
            </p>
          ))}

          {/* Divider */}
          <div style={{ width: "40px", height: "1px", background: subtle }} />

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {[
              { value: "12+", label: "Years on the road" },
              { value: "6", label: "Countries documented" },
              { value: "3k+", label: "Photographs taken" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.8rem",
                    fontWeight: 400,
                    color,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{ fontSize: "0.7rem", color: subtle, lineHeight: 1.5 }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom quote band */}
      <section
        style={{
          borderTop: `1px solid ${border}`,
          padding: "4rem 2.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color,
            opacity: 0.5,
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          "The road is not a means to an end. The road is the thing itself."
        </p>
      </section>
    </main>
  );
}
