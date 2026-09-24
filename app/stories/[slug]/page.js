"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReadingProgress from "@/components/ReadingProgress";
import { useState, useEffect } from "react";

export const stories = [
  {
    slug: "walking-the-silk-road",
    title: "Walking the Silk Road",
    place: "Afghanistan",
    date: "March 2024",
    readTime: "6 min read",
    count: 14,
    excerpt:
      "There is a kind of silence that only ancient roads know — one that holds centuries of footsteps and the whispers of traders long gone.",
    opening:
      "There is a kind of silence that only ancient roads know — one that holds centuries of footsteps and the whispers of traders long gone. I first heard about the Silk Road not from a book but from my grandfather, who spoke of it the way people speak of dreams they are not sure they had.",
    sections: [
      {
        type: "text",
        content:
          "When I finally walked a stretch of it, somewhere between Balkh and the Iranian border, I understood what he meant. The road does not announce itself. There are no signs, no markers. You simply find yourself on it, and then you know.",
      },
      {
        type: "image",
        orientation: "landscape",
        caption:
          "The road between Balkh and the border. Early morning, before the heat.",
        place: "Balkh Province",
      },
      {
        type: "text",
        content:
          "The light here is different. It falls at angles you do not expect, as if the sun itself is curious about this place. I stopped every few minutes to photograph it — not because I thought I could capture it, but because the act of trying felt like a kind of conversation.",
      },
      {
        type: "image",
        orientation: "portrait",
        caption:
          "A shepherd I met near dusk. He nodded. I nodded. We understood each other completely.",
        place: "Near Mazar-i-Sharif",
      },
      {
        type: "text",
        content:
          "That night I slept in a small teahouse where the owner spoke no English and I spoke no Dari, and yet by morning I felt I had made a friend for life. He brought me bread and a hard-boiled egg and refused to let me pay. The Silk Road teaches you that generosity is a language older than words.",
      },
      {
        type: "image-pair",
        images: [
          {
            orientation: "portrait",
            caption: "Inside the teahouse",
            place: "Balkh",
          },
          { orientation: "portrait", caption: "Morning bread", place: "Balkh" },
        ],
      },
      {
        type: "quote",
        content:
          "The road does not care where you are going. It only asks that you keep moving.",
      },
      {
        type: "text",
        content:
          "By the third day I had stopped trying to photograph everything. Some moments are better held than framed. A conversation with a passing merchant. The smell of bread from a mud-brick oven at dawn. The way the mountains change color as the sun moves — not dramatically, but honestly, the way things change when no one is performing.",
      },
      {
        type: "image",
        orientation: "landscape",
        caption: "The mountains at the edge of the Amu Darya river plain.",
        place: "Northern Afghanistan",
      },
    ],
  },
  {
    slug: "light-over-bamiyan",
    title: "Light Over Bamiyan",
    place: "Afghanistan",
    date: "January 2024",
    readTime: "4 min read",
    count: 9,
    excerpt:
      "The valley changes color every hour. By noon it is gold. By dusk it is grief.",
    opening:
      "The valley changes color every hour. By noon it is gold. By dusk it is grief. I stayed three days and still could not leave.",
    sections: [
      {
        type: "text",
        content:
          "Bamiyan is a place that does something to time. The cliffs where the Buddhas once stood are still watching — not empty, as people say, but full of a different kind of presence. The absence itself has become a monument.",
      },
      {
        type: "image",
        orientation: "landscape",
        caption: "The cliffs at Bamiyan, late afternoon.",
        place: "Bamiyan Valley",
      },
      {
        type: "text",
        content:
          "I came to photograph the landscape but ended up photographing light. The way it moved across the red earth. The way it found the faces of children playing near the old city.",
      },
      {
        type: "quote",
        content:
          "That laugh is the best photograph I took in Bamiyan, and I did not take it with a camera.",
      },
      {
        type: "image",
        orientation: "portrait",
        caption: "A girl near the old city walls.",
        place: "Bamiyan",
      },
    ],
  },
  {
    slug: "a-cup-of-tea-in-kandahar",
    title: "A Cup of Tea in Kandahar",
    place: "Afghanistan",
    date: "November 2023",
    readTime: "5 min read",
    count: 7,
    excerpt:
      "He poured the tea slowly, as if time here was not something to be saved but savored.",
    opening:
      "He poured the tea slowly, as if time here was not something to be saved but savored. We did not share a language but we shared the silence.",
    sections: [
      {
        type: "text",
        content:
          "His name was something I could not pronounce correctly, no matter how many times he gently corrected me. He found this funny. I found it humbling.",
      },
      {
        type: "image",
        orientation: "portrait",
        caption: "The tea maker. He has run this stall for thirty years.",
        place: "Kandahar",
      },
      {
        type: "text",
        content:
          "Kandahar has a reputation that precedes it like a shadow. But shadows are cast by light, and there is so much light here — in the pomegranate markets, in the blue of the shrine at dusk.",
      },
      {
        type: "image",
        orientation: "landscape",
        caption: "The shrine at dusk.",
        place: "Kandahar",
      },
    ],
  },
  {
    slug: "the-wakhan-in-winter",
    title: "The Wakhan in Winter",
    place: "Afghanistan",
    date: "September 2023",
    readTime: "8 min read",
    count: 18,
    excerpt:
      "At minus twenty, the Wakhan Corridor reveals itself as a place that does not tolerate visitors.",
    opening:
      "At minus twenty, the Wakhan Corridor reveals itself as a place that does not tolerate visitors — only those who truly belong to it. I did not belong to it. But I stayed anyway.",
    sections: [
      {
        type: "text",
        content:
          "The Wakhan is a strip of land that stretches east like a finger pointing toward China, squeezed between Tajikistan to the north and Pakistan to the south. In winter, the passes close, the rivers freeze.",
      },
      {
        type: "image",
        orientation: "landscape",
        caption: "The frozen Wakhan river at dawn.",
        place: "Wakhan Corridor",
      },
      {
        type: "quote",
        content:
          "This land does not care about your story. It only cares whether you are paying attention.",
      },
      {
        type: "image",
        orientation: "portrait",
        caption: "Daud, my guide. He said little, which I respected.",
        place: "Wakhan",
      },
      {
        type: "text",
        content:
          "I tried to pay attention. To the yaks moving against the white. To the smoke rising from a settlement so remote it had no name on any map I had.",
      },
      {
        type: "image",
        orientation: "landscape",
        caption: "Yaks at the edge of the snowfield.",
        place: "Upper Wakhan",
      },
    ],
  },
  {
    slug: "portraits-of-panjshir",
    title: "Portraits of Panjshir",
    place: "Afghanistan",
    date: "July 2023",
    readTime: "5 min read",
    count: 12,
    excerpt:
      "Every face in Panjshir carries a story older than the person wearing it.",
    opening:
      "Every face in Panjshir carries a story older than the person wearing it. I photographed twelve people. Each felt like a lifetime.",
    sections: [
      {
        type: "text",
        content:
          "Portrait photography is an act of negotiation. You are asking someone to be still, to be seen, to trust that what you do with their image will be worthy of their trust.",
      },
      {
        type: "image",
        orientation: "portrait",
        caption: "The old man who made me wait an hour before he nodded.",
        place: "Panjshir Valley",
      },
      {
        type: "text",
        content:
          "An old man sat with me for an hour before he let me photograph him. We drank tea. He showed me a photograph of his son. Only then did he nod.",
      },
      {
        type: "image-pair",
        images: [
          {
            orientation: "portrait",
            caption: "A young farmer",
            place: "Panjshir",
          },
          { orientation: "portrait", caption: "His father", place: "Panjshir" },
        ],
      },
      {
        type: "quote",
        content: "I am still trying to be worthy of what he gave me.",
      },
      {
        type: "image",
        orientation: "landscape",
        caption: "The valley from above, late afternoon.",
        place: "Panjshir Valley",
      },
    ],
  },
];

function ImageBlock({ orientation, caption, place }) {
  return (
    <figure style={{ margin: 0, width: "100%" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: orientation === "portrait" ? "3/4" : "4/3",
          background: "var(--surface)",
          border: "1px solid var(--rule)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        <div
          style={{
            border: "1px solid var(--rule)",
            padding: "0.35rem 0.65rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "0.65rem",
              color: "var(--ink-faint)",
            }}
          >
            {orientation === "portrait" ? "3:4" : "4:3"}
          </span>
        </div>
      </div>
      {caption && (
        <figcaption
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            marginTop: "0.75rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--rule)",
          }}
        >
          <span
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
              fontSize: "0.82rem",
              color: "var(--ink-faint)",
              lineHeight: 1.6,
            }}
          >
            {caption}
          </span>
          {place && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                color: "var(--accent)",
                fontWeight: 300,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {place}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export default function StoryPage() {
  const { slug } = useParams();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const story = stories.find((s) => s.slug === slug);
  const storyIndex = stories.findIndex((s) => s.slug === slug);
  const prev = storyIndex > 0 ? stories[storyIndex - 1] : null;
  const next = storyIndex < stories.length - 1 ? stories[storyIndex + 1] : null;

  if (!mounted) return null;

  if (!story) {
    return (
      <main
        style={{
          paddingTop: "60px",
          padding: "8rem 2.5rem",
          background: "var(--bg)",
        }}
      >
        <p
          style={{
            color: "var(--ink-faint)",
            fontFamily: "'Source Serif 4', serif",
          }}
        >
          Story not found.
        </p>
        <Link
          href="/stories"
          style={{ color: "var(--ink)", fontSize: "0.85rem" }}
        >
          ← Back to stories
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        paddingTop: "60px",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <ReadingProgress />

      {/* Back bar */}
      <div
        style={{
          padding: "1.5rem 2.5rem",
          borderBottom: "1px solid var(--rule)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/stories"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            color: "var(--ink-faint)",
            fontWeight: 300,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--ink-faint)")
          }
        >
          <ArrowLeft size={13} /> All Stories
        </Link>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "0.72rem",
            color: "var(--ink-faint)",
          }}
        >
          {story.count} photographs · {story.readTime}
        </span>
      </div>

      {/* Opening image — full width */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/7",
          background: "var(--surface)",
          borderBottom: "1px solid var(--rule)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{ border: "1px solid var(--rule)", padding: "0.4rem 0.8rem" }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "0.7rem",
              color: "var(--ink-faint)",
            }}
          >
            Opening photograph — 16:7
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.58rem",
            color: "var(--ink-faint)",
            fontWeight: 300,
            letterSpacing: "0.08em",
          }}
        >
          {story.place}
        </span>
      </div>

      {/* Story header — centered */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "5rem 2.5rem 4rem",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              color: "var(--accent)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              borderBottom: "1px solid var(--accent)",
              paddingBottom: "1px",
            }}
          >
            {story.place.toUpperCase()}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              color: "var(--ink-faint)",
              fontWeight: 300,
            }}
          >
            {story.date}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: "var(--ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: "2rem",
          }}
        >
          {story.title}
        </h1>

        <div
          style={{
            width: "32px",
            height: "1px",
            background: "var(--accent)",
            marginBottom: "2rem",
          }}
        />

        <p
          style={{
            fontFamily: "'Source Serif 4', serif",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "var(--ink)",
            lineHeight: 1.9,
            opacity: 0.85,
          }}
        >
          {story.opening}
        </p>
      </div>

      {/* Story body */}
      <article>
        {story.sections.map((section, i) => {
          if (section.type === "text") {
            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--rule)",
                  padding: "4rem 2.5rem",
                }}
              >
                <div style={{ maxWidth: "660px", margin: "0 auto" }}>
                  <p
                    style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: "1.05rem",
                      color: "var(--ink)",
                      lineHeight: 1.95,
                      opacity: 0.85,
                    }}
                  >
                    {section.content}
                  </p>
                </div>
              </div>
            );
          }

          if (section.type === "image") {
            const isPortrait = section.orientation === "portrait";
            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--rule)",
                  padding: "3rem 2.5rem",
                }}
              >
                <div
                  style={{
                    maxWidth: isPortrait ? "480px" : "860px",
                    margin: "0 auto",
                  }}
                >
                  <ImageBlock
                    orientation={section.orientation}
                    caption={section.caption}
                    place={section.place}
                  />
                </div>
              </div>
            );
          }

          if (section.type === "image-pair") {
            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--rule)",
                  padding: "3rem 2.5rem",
                }}
              >
                <div
                  style={{
                    maxWidth: "860px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  {section.images.map((img, j) => (
                    <ImageBlock
                      key={j}
                      orientation={img.orientation}
                      caption={img.caption}
                      place={img.place}
                    />
                  ))}
                </div>
              </div>
            );
          }

          if (section.type === "quote") {
            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--rule)",
                  padding: "5rem 2.5rem",
                }}
              >
                <div
                  style={{
                    maxWidth: "640px",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                >
                  <blockquote
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                      fontWeight: 400,
                      color: "var(--ink)",
                      lineHeight: 1.6,
                      opacity: 0.75,
                      margin: 0,
                    }}
                  >
                    "{section.content}"
                  </blockquote>
                </div>
              </div>
            );
          }

          return null;
        })}
      </article>

      {/* Prev / Next */}
      <nav
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderTop: "1px solid var(--rule)",
        }}
      >
        {prev ? (
          <Link
            href={`/stories/${prev.slug}`}
            style={{
              padding: "2.5rem",
              borderRight: "1px solid var(--rule)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--surface)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                color: "var(--ink-faint)",
                fontWeight: 300,
                letterSpacing: "0.08em",
              }}
            >
              <ArrowLeft size={11} /> PREVIOUS
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 400,
                color: "var(--ink)",
              }}
            >
              {prev.title}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                color: "var(--accent)",
                fontWeight: 300,
              }}
            >
              {prev.place}
            </span>
          </Link>
        ) : (
          <div style={{ borderRight: "1px solid var(--rule)" }} />
        )}

        {next ? (
          <Link
            href={`/stories/${next.slug}`}
            style={{
              padding: "2.5rem",
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "flex-end",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--surface)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                color: "var(--ink-faint)",
                fontWeight: 300,
                letterSpacing: "0.08em",
              }}
            >
              NEXT <ArrowRight size={11} />
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 400,
                color: "var(--ink)",
              }}
            >
              {next.title}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                color: "var(--accent)",
                fontWeight: 300,
              }}
            >
              {next.place}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}
