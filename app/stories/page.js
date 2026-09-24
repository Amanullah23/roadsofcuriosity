"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, MapPin } from "lucide-react";

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
    location: "Balkh, Afghanistan",
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
    location: "Bamiyan Valley",
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
    location: "Kandahar, Afghanistan",
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
    location: "Wakhan Corridor, Badakhshan",
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
    location: "Panjshir Valley",
  },
];

const card = {
  background: "var(--surface)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--rule)",
};

export default function Stories() {
  return (
    <main
      style={{
        paddingTop: "56px",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* Page header */}
      <section
        style={{
          padding: "3.5rem 2.5rem 1.5rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BookOpen size={15} color="#fff" />
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              color: "var(--accent)",
              fontWeight: 400,
            }}
          >
            written words
          </p>
        </div>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 400,
            color: "var(--ink)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Stories
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--ink-faint)",
            lineHeight: 1.7,
            maxWidth: "480px",
          }}
        >
          Written accounts of places, people, and moments that stay with you
          long after the road ends.
        </p>
      </section>

      {/* Stories list */}
      <section
        style={{
          padding: "0.5rem 2.5rem 6rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              style={{
                ...card,
                padding: "1.8rem 2rem",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "1.5rem",
                alignItems: "start",
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.boxShadow =
                  "0 4px 24px rgba(192,68,42,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--rule)";
                e.currentTarget.style.boxShadow = "var(--shadow)";
              }}
            >
              {/* Left */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.7rem",
                }}
              >
                {/* Tags row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "var(--accent)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.08em",
                      background:
                        "color-mix(in srgb, var(--accent) 10%, transparent)",
                      padding: "0.18rem 0.55rem",
                      borderRadius: "4px",
                    }}
                  >
                    {story.category}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "var(--ink-faint)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {story.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                    fontWeight: 400,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  {story.title}
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.92rem",
                    color: "var(--ink-faint)",
                    lineHeight: 1.75,
                    maxWidth: "520px",
                  }}
                >
                  {story.excerpt}
                </p>

                {/* Location */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <MapPin size={10} color="var(--accent)" />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      color: "var(--ink-faint)",
                      fontWeight: 300,
                    }}
                  >
                    {story.location}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  minWidth: "80px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    color: "var(--ink-faint)",
                    fontWeight: 300,
                    whiteSpace: "nowrap",
                  }}
                >
                  {story.date}
                </span>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background:
                      "color-mix(in srgb, var(--accent) 10%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowRight size={14} color="var(--accent)" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
