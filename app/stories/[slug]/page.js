"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReadingProgress from "@/components/ReadingProgress";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export const stories = [
  {
    slug: "walking-the-silk-road",
    title: "Walking the Silk Road",
    date: "March 2024",
    readTime: "6 min read",
    category: "Travel",
    excerpt:
      "There is a kind of silence that only ancient roads know — one that holds centuries of footsteps and the whispers of traders long gone.",
    content: `There is a kind of silence that only ancient roads know — one that holds centuries of footsteps and the whispers of traders long gone.

I first heard about the Silk Road not from a book but from my grandfather, who spoke of it the way people speak of dreams they are not sure they had. A road that connected everything. A road that was not one road but many — shifting, breathing, alive.

When I finally walked a stretch of it, somewhere between Balkh and the Iranian border, I understood what he meant. The road does not announce itself. There are no signs, no markers. You simply find yourself on it, and then you know.

The light here is different. It falls at angles you do not expect, as if the sun itself is curious about this place. I stopped every few minutes to photograph it — not because I thought I could capture it, but because the act of trying felt like a kind of conversation.

A shepherd passed me near dusk, his flock moving like a slow river around my feet. He nodded. I nodded. We understood each other completely.

That night I slept in a small teahouse where the owner spoke no English and I spoke no Dari, and yet by morning I felt I had made a friend for life. He brought me bread and a hard-boiled egg and refused to let me pay.

The Silk Road teaches you that generosity is a language older than words.`,
  },
  {
    slug: "light-over-bamiyan",
    title: "Light Over Bamiyan",
    date: "January 2024",
    readTime: "4 min read",
    category: "Photography",
    excerpt:
      "The valley changes color every hour. By noon it is gold. By dusk it is grief. I stayed three days and still could not leave.",
    content: `The valley changes color every hour. By noon it is gold. By dusk it is grief. I stayed three days and still could not leave.

Bamiyan is a place that does something to time. The cliffs where the Buddhas once stood are still watching — not empty, as people say, but full of a different kind of presence. The absence itself has become a monument.

I came to photograph the landscape but ended up photographing light. The way it moved across the red earth. The way it found the faces of children playing near the old city. The way it disappeared behind the Hindu Kush and left everything in a blue so deep it was almost sound.

On my second evening, a woman invited me to her home for tea. Her daughters sat quietly, watching me with the careful attention of people who have learned to read strangers quickly. I showed them my camera. The youngest one laughed.

That laugh is the best photograph I took in Bamiyan, and I did not take it with a camera.`,
  },
  {
    slug: "a-cup-of-tea-in-kandahar",
    title: "A Cup of Tea in Kandahar",
    date: "November 2023",
    readTime: "5 min read",
    category: "People",
    excerpt:
      "He poured the tea slowly, as if time here was not something to be saved but savored. We did not share a language but we shared the silence.",
    content: `He poured the tea slowly, as if time here was not something to be saved but savored. We did not share a language but we shared the silence.

His name was something I could not pronounce correctly, no matter how many times he gently corrected me. He found this funny. I found it humbling. By the end of the afternoon we had settled on a look — a slight tilt of the head — that meant hello, thank you, I see you, all at once.

Kandahar has a reputation that precedes it like a shadow. But shadows are cast by light, and there is so much light here — in the pomegranate markets, in the blue of the shrine at dusk, in the careful hands of the man who repaired my broken camera strap for nothing.

I think often about what it means to visit a place. Whether the act of looking changes what you see. Whether a photograph takes something from its subject or gives something back.

That afternoon over tea, I decided it can be both. The important thing is to know which one you are doing.`,
  },
  {
    slug: "the-wakhan-in-winter",
    title: "The Wakhan in Winter",
    date: "September 2023",
    readTime: "8 min read",
    category: "Travel",
    excerpt:
      "At minus twenty, the Wakhan Corridor reveals itself as a place that does not tolerate visitors — only those who truly belong to it.",
    content: `At minus twenty, the Wakhan Corridor reveals itself as a place that does not tolerate visitors — only those who truly belong to it.

I did not belong to it. But I stayed anyway.

The Wakhan is a strip of land that stretches east like a finger pointing toward China, squeezed between Tajikistan to the north and Pakistan to the south. In winter, the passes close, the rivers freeze, and the Wakhi people fold inward toward their fires and their animals and their ancient knowledge of how to survive.

I traveled with a local guide named Daud, who had the build of someone who had spent a lifetime carrying things uphill. He said little, which I respected. When he did speak, it was worth hearing.

On the third day he told me: this land does not care about your story. It only cares whether you are paying attention.

I tried to pay attention. To the yaks moving against the white. To the smoke rising from a settlement so remote it had no name on any map I had. To the stars at night, which in the Wakhan are not a backdrop but a ceiling — close enough, it seems, to touch.

I did not touch them. But I understood, for the first time, why people have always tried.`,
  },
  {
    slug: "portraits-of-panjshir",
    title: "Portraits of Panjshir",
    date: "July 2023",
    readTime: "5 min read",
    category: "Photography",
    excerpt:
      "Every face in Panjshir carries a story older than the person wearing it. I photographed twelve people. Each felt like a lifetime.",
    content: `Every face in Panjshir carries a story older than the person wearing it. I photographed twelve people. Each felt like a lifetime.

Portrait photography is an act of negotiation. You are asking someone to be still, to be seen, to trust that what you do with their image will be worthy of their trust. In Panjshir, people understood this instinctively. They prepared themselves — not by posing, but by arriving.

An old man sat with me for an hour before he let me photograph him. We drank tea. He showed me a photograph of his son, taken years ago. I showed him photographs of my family. Only then did he nod.

When I finally raised the camera he looked directly into the lens with an expression I have never been able to fully describe. Not pride, not sorrow — something older than both. Recognition, perhaps. Of the camera, of me, of the moment itself.

I have printed that photograph and hung it on my wall. Some mornings I stand in front of it and feel that he is still looking, still waiting to see what I will do with what he gave me.

I am still trying to be worthy of it.`,
  },
];

export default function StoryPage() {
  const { theme } = useTheme();
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const slug = params?.slug;
  const story = stories.find((s) => s.slug === slug);
  const related = story
    ? stories
        .filter((s) => s.slug !== slug && s.category === story.category)
        .slice(0, 2)
    : [];

  const color = theme === "dark" ? "#e8e4de" : "#1a1a1a";
  const subtle =
    theme === "dark" ? "rgba(232,228,222,0.35)" : "rgba(26,26,26,0.35)";
  const border =
    theme === "dark" ? "rgba(232,228,222,0.08)" : "rgba(26,26,26,0.08)";
  const tagBg =
    theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const cardBg =
    theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";

  if (!mounted) return null;

  if (!story) {
    return (
      <main
        style={{
          paddingTop: "64px",
          minHeight: "100vh",
          padding: "8rem 2.5rem",
        }}
      >
        <p style={{ color: subtle }}>Story not found.</p>
        <Link href="/stories" style={{ color, fontSize: "0.85rem" }}>
          ← Back to stories
        </Link>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
      <ReadingProgress />

      {/* Back link */}
      <div style={{ padding: "2.5rem 2.5rem 0" }}>
        <Link
          href="/stories"
          style={{
            fontSize: "0.78rem",
            color: subtle,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = color)}
          onMouseLeave={(e) => (e.currentTarget.style.color = subtle)}
        >
          <ArrowLeft size={14} /> Back to Stories
        </Link>
      </div>

      {/* Story header */}
      <section style={{ padding: "3rem 2.5rem 2rem", maxWidth: "720px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
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
          <span style={{ fontSize: "0.65rem", color: subtle }}>
            {story.date}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color,
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          {story.title}
        </h1>

        <div
          style={{
            width: "40px",
            height: "1px",
            background: subtle,
            margin: "2rem 0",
          }}
        />
      </section>

      {/* Cover image placeholder */}
      <div
        style={{
          margin: "0 2.5rem",
          maxWidth: "720px",
          aspectRatio: "16/7",
          background: cardBg,
          border: `1px solid ${border}`,
          marginBottom: "3rem",
        }}
      />

      {/* Story body */}
      <article style={{ padding: "0 2.5rem", maxWidth: "680px" }}>
        {story.content.split("\n\n").map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.05rem",
              color,
              lineHeight: 1.9,
              marginBottom: "1.8rem",
              opacity: 0.85,
            }}
          >
            {para}
          </p>
        ))}
      </article>

      {/* Related stories */}
      {related.length > 0 && (
        <section
          style={{
            padding: "4rem 2.5rem 6rem",
            maxWidth: "720px",
            borderTop: `1px solid ${border}`,
            marginTop: "3rem",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: subtle,
              marginBottom: "2rem",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            more from {story.category.toLowerCase()}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1px",
            }}
          >
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/stories/${s.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  padding: "1.8rem",
                  background: cardBg,
                  border: `1px solid ${border}`,
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = subtle;
                  e.currentTarget.querySelector(".arrow").style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.querySelector(".arrow").style.opacity = "0";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: subtle,
                      padding: "0.2rem 0.5rem",
                      background: tagBg,
                      border: `1px solid ${border}`,
                    }}
                  >
                    {s.category}
                  </span>
                  <ArrowRight
                    className="arrow"
                    size={14}
                    color={subtle}
                    style={{ opacity: 0, transition: "opacity 0.2s ease" }}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color,
                    lineHeight: 1.4,
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.78rem",
                    color: subtle,
                    lineHeight: 1.7,
                  }}
                >
                  {s.excerpt}
                </p>

                <span
                  style={{
                    fontSize: "0.65rem",
                    color: subtle,
                    marginTop: "0.3rem",
                  }}
                >
                  {s.date} · {s.readTime}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
