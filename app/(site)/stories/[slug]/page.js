"use client";

// Roads of Curiosity — Story detail (new visual system: "The Route")
// Target: app/(site)/stories/[slug]/page.js
//
// Like the journal entry, no route line — a single story is a place
// to stop, not travel through. The route lives on the index pages.

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { stories as staticStories } from "@/lib/data";
import { getStory, getStories } from "@/lib/api";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const SURFACE = "#EDE7DA";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

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
        fontSize: "0.88rem",
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

function PhotoFrame({ src, alt, aspect = "3 / 2" }) {
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
      {src ? (
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
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(150deg, ${SURFACE} 0%, ${RULE} 100%)`,
          }}
        >
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "0.8rem",
              color: FAINT,
            }}
          >
            {alt || "Photograph"}
          </span>
        </div>
      )}
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

function Caption({ caption, place }) {
  if (!caption && !place) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "1rem",
        paddingTop: "0.75rem",
        marginTop: "0.75rem",
        borderTop: `1px solid ${RULE}`,
      }}
    >
      {caption && (
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: "0.88rem",
            color: INK,
          }}
        >
          {caption}
        </span>
      )}
      {place && (
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.72rem",
            color: FAINT,
            whiteSpace: "nowrap",
          }}
        >
          {place}
        </span>
      )}
    </div>
  );
}

// ─── Section renderers ─────────────────────────────────────────────────────────
function TextSection({ content }) {
  return (
    <section
      style={{ maxWidth: "660px", margin: "0 auto", padding: "2.25rem 2rem" }}
    >
      <p
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "1.12rem",
          color: INK,
          lineHeight: 1.9,
        }}
      >
        {content}
      </p>
    </section>
  );
}

function QuoteSection({ content }) {
  return (
    <section
      style={{ maxWidth: "680px", margin: "0 auto", padding: "2.75rem 2rem" }}
    >
      <div style={{ display: "flex", gap: "1.5rem" }}>
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
            fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
            color: INK,
            lineHeight: 1.6,
          }}
        >
          "{content}"
        </p>
      </div>
    </section>
  );
}

function ImageSection({ src, caption, place, orientation }) {
  return (
    <section
      style={{
        maxWidth: orientation === "portrait" ? "520px" : "900px",
        margin: "0 auto",
        padding: "2.25rem 2rem",
      }}
    >
      <PhotoFrame
        src={src}
        alt={caption || place}
        aspect={orientation === "portrait" ? "3 / 4" : "3 / 2"}
      />
      <Caption caption={caption} place={place} />
    </section>
  );
}

function ImagePairSection({ images = [] }) {
  return (
    <section
      style={{ maxWidth: "1000px", margin: "0 auto", padding: "2.25rem 2rem" }}
    >
      <div
        className="roc-image-pair-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
        }}
      >
        {images.map((img, i) => (
          <div key={i}>
            <PhotoFrame
              src={img.src}
              alt={img.caption || img.place}
              aspect={img.orientation === "landscape" ? "3 / 2" : "3 / 4"}
            />
            <Caption caption={img.caption} place={img.place} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StorySection({ section }) {
  switch (section.type) {
    case "text":
      return <TextSection content={section.content} />;
    case "quote":
      return <QuoteSection content={section.content} />;
    case "image":
      return (
        <ImageSection
          src={section.src}
          caption={section.caption}
          place={section.place}
          orientation={section.orientation}
        />
      );
    case "image-pair":
      return <ImagePairSection images={section.images} />;
    default:
      return null;
  }
}

export default function StoryDetailPage() {
  const params = useParams();
  const [story, setStory] = useState(null);
  const [allStories, setAllStories] = useState(staticStories);
  const [notFound, setNotFound] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    const init = async () => {
      try {
        const data = await getStory(params.slug);
        if (data && data.slug) {
          if (typeof data.sections === "string") {
            try {
              data.sections = JSON.parse(data.sections);
            } catch {
              data.sections = [];
            }
          }
          if (!Array.isArray(data.sections)) data.sections = [];
          setStory(data);
        } else {
          const found = staticStories.find((s) => s.slug === params.slug);
          if (found) setStory(found);
          else setNotFound(true);
        }
      } catch {
        const found = staticStories.find((s) => s.slug === params.slug);
        if (found) setStory(found);
        else setNotFound(true);
      }
      try {
        const list = await getStories();
        if (Array.isArray(list) && list.length > 0) setAllStories(list);
      } catch {
        /* static fallback */
      }
    };
    init();
    return () => clearTimeout(t);
  }, [params.slug]);

  if (notFound) {
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
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: "1.5rem",
            color: INK,
            marginBottom: "1.5rem",
          }}
        >
          This story has wandered off the map.
        </p>
        <TracedLink href="/stories">
          <ArrowLeft size={13} /> Back to all stories
        </TracedLink>
      </main>
    );
  }

  if (!story) {
    return (
      <main
        style={{
          background: BG,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            color: FAINT,
          }}
        >
          Finding the way there…
        </p>
      </main>
    );
  }

  const idx = allStories.findIndex((s) => s.slug === story.slug);
  const prevStory = idx > 0 ? allStories[idx - 1] : null;
  const nextStory =
    idx >= 0 && idx < allStories.length - 1 ? allStories[idx + 1] : null;

  return (
    <main style={{ background: BG, minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "66vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: SURFACE }}>
          {story.cover || story.image ? (
            <img
              src={story.cover || story.image}
              alt={story.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(150deg, ${SURFACE} 0%, ${RULE} 100%)`,
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(23,26,24,0.8) 0%, rgba(23,26,24,0.18) 55%, rgba(23,26,24,0.05) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            padding: "3rem 2rem 3.5rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.95s ease, transform 0.95s ease",
          }}
        >
          <Link
            href="/stories"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(244,238,227,0.75)",
              textDecoration: "none",
              marginBottom: "1.5rem",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F4EEE3")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(244,238,227,0.75)")
            }
          >
            <ArrowLeft size={13} /> All stories
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            {story.place && (
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: GOLD,
                }}
              >
                {story.place}
              </span>
            )}
            {(story.year || story.date) && (
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "rgba(244,238,227,0.7)",
                }}
              >
                · {story.year || story.date}
              </span>
            )}
            {story.read_time && (
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(244,238,227,0.7)",
                }}
              >
                · {story.read_time}
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontOpticalSizing: "auto",
              fontWeight: 480,
              fontSize: "clamp(2.1rem, 5.3vw, 3.6rem)",
              color: "#F4EEE3",
              lineHeight: 1.08,
              letterSpacing: "-0.012em",
            }}
          >
            {story.title}
          </h1>
        </div>
      </section>

      {/* ── Opening ── */}
      {(story.opening || story.intro) && (
        <section
          style={{
            padding: "3.75rem 2rem 0.5rem",
            maxWidth: "660px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.15rem, 2.2vw, 1.4rem)",
              color: INK,
              lineHeight: 1.75,
            }}
          >
            {story.opening || story.intro}
          </p>
        </section>
      )}

      {/* ── Sections ── */}
      <section style={{ padding: "1rem 0 4rem" }}>
        {(story.sections || []).map((section, i) => (
          <StorySection key={i} section={section} />
        ))}
      </section>

      {/* ── Prev / next ── */}
      <section
        style={{
          borderTop: `1px solid ${RULE}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="roc-prevnext"
      >
        {prevStory ? (
          <Link
            href={`/stories/${prevStory.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.55rem",
              padding: "2.75rem 2.25rem",
              borderRight: `1px solid ${RULE}`,
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = SURFACE)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.74rem",
                color: FAINT,
              }}
            >
              <ArrowLeft size={12} /> Previous story
            </span>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: "1.15rem",
                color: INK,
                lineHeight: 1.3,
              }}
            >
              {prevStory.title}
            </span>
          </Link>
        ) : (
          <div style={{ borderRight: `1px solid ${RULE}` }} />
        )}

        {nextStory ? (
          <Link
            href={`/stories/${nextStory.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
              gap: "0.55rem",
              padding: "2.75rem 2.25rem",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = SURFACE)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.74rem",
                color: FAINT,
              }}
            >
              Next story <ArrowRight size={12} />
            </span>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: "1.15rem",
                color: INK,
                lineHeight: 1.3,
              }}
            >
              {nextStory.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </section>

      {/* ── Closing ── */}
      <section
        style={{
          padding: "3.5rem 2rem",
          textAlign: "center",
          borderTop: `1px solid ${RULE}`,
        }}
      >
        <TracedLink href="/stories">
          All stories <ArrowRight size={13} />
        </TracedLink>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .roc-corner { position: absolute; width: 20px; height: 20px; border-color: ${GOLD}; transition: opacity 0.3s ease; }
        .roc-corner-tl { top: 9px; left: 9px; border-top: 2px solid; border-left: 2px solid; }
        .roc-corner-tr { top: 9px; right: 9px; border-top: 2px solid; border-right: 2px solid; }
        .roc-corner-bl { bottom: 9px; left: 9px; border-bottom: 2px solid; border-left: 2px solid; }
        .roc-corner-br { bottom: 9px; right: 9px; border-bottom: 2px solid; border-right: 2px solid; }

        @media (max-width: 700px) {
          .roc-image-pair-grid { grid-template-columns: 1fr !important; }
          .roc-prevnext { grid-template-columns: 1fr !important; }
          .roc-prevnext > a:first-child { border-right: none !important; border-bottom: 1px solid ${RULE}; }
          .roc-prevnext > a:last-child { align-items: flex-start !important; text-align: left !important; }
        }
      `}</style>
    </main>
  );
}
