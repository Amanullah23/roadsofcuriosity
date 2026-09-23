"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowRight } from "lucide-react";

const stories = [
  {
    id: 1,
    slug: "walking-the-silk-road",
    title: "Walking the Silk Road",
    excerpt:
      "There is a kind of silence that only ancient roads know — one that holds centuries of footsteps and the whispers of traders long gone.",
    date: "March 2024",
    readTime: "6 min read",
    category: "Travel",
  },
  {
    id: 2,
    slug: "light-over-bamiyan",
    title: "Light Over Bamiyan",
    excerpt:
      "The valley changes color every hour. By noon it is gold. By dusk it is grief. I stayed three days and still could not leave.",
    date: "January 2024",
    readTime: "4 min read",
    category: "Photography",
  },
  {
    id: 3,
    slug: "a-cup-of-tea-in-kandahar",
    title: "A Cup of Tea in Kandahar",
    excerpt:
      "He poured the tea slowly, as if time here was not something to be saved but savored. We did not share a language but we shared the silence.",
    date: "November 2023",
    readTime: "5 min read",
    category: "People",
  },
  {
    id: 4,
    slug: "the-wakhan-in-winter",
    title: "The Wakhan in Winter",
    excerpt:
      "At minus twenty, the Wakhan Corridor reveals itself as a place that does not tolerate visitors — only those who truly belong to it.",
    date: "September 2023",
    readTime: "8 min read",
    category: "Travel",
  },
  {
    id: 5,
    slug: "portraits-of-panjshir",
    title: "Portraits of Panjshir",
    excerpt:
      "Every face in Panjshir carries a story older than the person wearing it. I photographed twelve people. Each felt like a lifetime.",
    date: "July 2023",
    readTime: "5 min read",
    category: "Photography",
  },
];

export default function Stories() {
  const { theme } = useTheme();

  const color = theme === "dark" ? "#f0f0f0" : "#111";
  const subtle =
    theme === "dark" ? "rgba(240,240,240,0.35)" : "rgba(0,0,0,0.35)";
  const border =
    theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tagBg =
    theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

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
          written words
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
          Stories
        </h1>
      </section>

      {/* Stories list */}
      <section style={{ padding: "0 2.5rem 6rem", maxWidth: "860px" }}>
        {stories.map((story, i) => (
          <Link
            key={story.id}
            href={`/stories/${story.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1rem",
              padding: "2.5rem 0",
              borderBottom: `1px solid ${border}`,
              alignItems: "start",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {/* Left */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: subtle,
                    padding: "0.25rem 0.6rem",
                    background: tagBg,
                    border: `1px solid ${border}`,
                  }}
                >
                  {story.category}
                </span>
                <span style={{ fontSize: "0.65rem", color: subtle }}>
                  {story.readTime}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontWeight: 400,
                  color,
                  lineHeight: 1.3,
                }}
              >
                {story.title}
              </h2>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: subtle,
                  lineHeight: 1.8,
                  maxWidth: "560px",
                }}
              >
                {story.excerpt}
              </p>
            </div>

            {/* Right */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: "100%",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  color: subtle,
                  whiteSpace: "nowrap",
                }}
              >
                {story.date}
              </span>
              <ArrowRight size={16} color={subtle} />
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
