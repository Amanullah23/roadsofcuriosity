"use client";

import Link from "next/link";
import { ArrowRight, Camera, BookOpen, MapPin, Mail } from "lucide-react";

const card = {
  background: "var(--surface)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--rule)",
};

const accentTag = {
  fontSize: "0.6rem",
  color: "var(--accent)",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  letterSpacing: "0.08em",
  background: "color-mix(in srgb, var(--accent) 10%, transparent)",
  padding: "0.18rem 0.55rem",
  borderRadius: "4px",
  display: "inline-block",
};

export default function About() {
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
          maxWidth: "1100px",
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
            <Camera size={15} color="#fff" />
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
            the person behind the lens
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
          }}
        >
          About
        </h1>
      </section>

      <div
        style={{
          padding: "0.5rem 2.5rem 6rem",
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {/* ── Section 1: Bio + Portrait ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {/* Portrait card */}
          <div
            style={{
              ...card,
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                background: "var(--bg)",
                borderRadius: "10px",
                border: "1px solid var(--rule)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={32} color="var(--rule)" />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  marginBottom: "0.25rem",
                }}
              >
                The Photographer
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  color: "var(--ink-faint)",
                  fontWeight: 300,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <MapPin size={10} color="var(--accent)" />
                Based in Kabul, Afghanistan
              </p>
            </div>
          </div>

          {/* Bio card */}
          <div
            style={{
              ...card,
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Quote */}
            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--ink)",
                lineHeight: 1.6,
                borderLeft: "2px solid var(--accent)",
                paddingLeft: "1.2rem",
                margin: 0,
              }}
            >
              "I photograph not what I see, but what I feel when I see it."
            </blockquote>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "var(--rule)",
              }}
            />

            {[
              "I am a photographer and writer drawn to the places most people pass through without stopping. Roads, borders, valleys, markets — the in-between spaces where real life happens quietly.",
              "My work is rooted in Central Asia, particularly Afghanistan, where I have spent years documenting landscapes and the people who inhabit them with a dignity the news rarely shows.",
              "Photography, for me, is an act of attention. Writing is how I process what the camera could not hold. Together they form something closer to the truth than either alone.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.98rem",
                  color: "var(--ink-faint)",
                  lineHeight: 1.85,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── Section 2: Stats ── */}
        <div
          style={{
            ...card,
            padding: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0",
          }}
        >
          {[
            {
              value: "12+",
              label: "Years on the road",
              icon: <MapPin size={16} color="var(--accent)" />,
            },
            {
              value: "6",
              label: "Countries documented",
              icon: <Camera size={16} color="var(--accent)" />,
            },
            {
              value: "3k+",
              label: "Photographs taken",
              icon: <Camera size={16} color="var(--accent)" />,
            },
            {
              value: "24",
              label: "Stories published",
              icon: <BookOpen size={16} color="var(--accent)" />,
            },
          ].map((stat, i, arr) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem 1.5rem",
                borderRight:
                  i < arr.length - 1 ? "1px solid var(--rule)" : "none",
              }}
            >
              {stat.icon}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.2rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  color: "var(--ink-faint)",
                  fontWeight: 300,
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Section 3: My approach ── */}
        <div style={{ ...card, padding: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.8rem",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={13} color="#fff" />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--ink)",
              }}
            >
              My Approach
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              {
                title: "Slow Travel",
                body: "I never rush a place. I stay until the light changes, until the street becomes familiar, until I stop being a stranger.",
              },
              {
                title: "Natural Light Only",
                body: "Every photograph I take uses the light that was already there. I do not add, I only observe what the world offers.",
              },
              {
                title: "People First",
                body: "Landscapes set the stage, but people tell the story. I spend as much time listening as I do looking through the lens.",
              },
              {
                title: "Writing as Memory",
                body: "A photograph freezes a moment. A story explains why that moment mattered. I need both to feel I have truly been somewhere.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg)",
                  borderRadius: "10px",
                  border: "1px solid var(--rule)",
                  padding: "1.4rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                <span style={accentTag}>{`0${i + 1}`}</span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.88rem",
                    color: "var(--ink-faint)",
                    lineHeight: 1.75,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 4: Equipment ── */}
        <div style={{ ...card, padding: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.8rem",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={13} color="#fff" />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--ink)",
              }}
            >
              Equipment
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              {
                category: "Primary Camera",
                name: "Fujifilm X-T5",
                note: "For landscapes and travel",
              },
              {
                category: "Secondary",
                name: "Fujifilm X100V",
                note: "Street and documentary",
              },
              {
                category: "Primary Lens",
                name: "XF 23mm f/1.4",
                note: "My most-used focal length",
              },
              {
                category: "Editing",
                name: "Lightroom Classic",
                note: "Minimal, film-inspired edits",
              },
            ].map((gear, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg)",
                  borderRadius: "10px",
                  border: "1px solid var(--rule)",
                  padding: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    color: "var(--ink-faint)",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                  }}
                >
                  {gear.category}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  {gear.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    color: "var(--ink-faint)",
                  }}
                >
                  {gear.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 5: Featured in ── */}
        <div style={{ ...card, padding: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.8rem",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={13} color="#fff" />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--ink)",
              }}
            >
              Featured In
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              {
                name: "National Geographic Traveller",
                year: "2023",
                role: "Photo Essay — Central Asia",
              },
              {
                name: "The Guardian",
                year: "2023",
                role: "Afghanistan Through a Local Lens",
              },
              {
                name: "Sidetracked Magazine",
                year: "2022",
                role: "The Wakhan Corridor in Winter",
              },
              {
                name: "Outdoor Photographer",
                year: "2022",
                role: "Landscape Portfolio",
              },
            ].map((item, i, arr) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.1rem 0",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid var(--rule)" : "none",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: "var(--ink)",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "0.82rem",
                      color: "var(--ink-faint)",
                    }}
                  >
                    {item.role}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    color: "var(--ink-faint)",
                    fontWeight: 300,
                    flexShrink: 0,
                  }}
                >
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 6: Closing quote + CTA ── */}
        <div
          style={{
            ...card,
            padding: "3rem 2.5rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              color: "var(--ink)",
              lineHeight: 1.8,
              maxWidth: "560px",
              opacity: 0.75,
            }}
          >
            "Roads of Curiosity is not a portfolio. It is a journal — an ongoing
            record of what it means to move through the world with open eyes."
          </p>

          <div
            style={{
              width: "40px",
              height: "1.5px",
              background: "var(--accent)",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="/gallery"
              style={{
                padding: "0.75rem 1.8rem",
                background: "var(--accent)",
                color: "#fff",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View Gallery <ArrowRight size={13} />
            </Link>
            <Link
              href="/contact"
              style={{
                padding: "0.75rem 1.8rem",
                border: "1px solid var(--rule)",
                color: "var(--ink-faint)",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--ink-faint)";
                e.currentTarget.style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--rule)";
                e.currentTarget.style.color = "var(--ink-faint)";
              }}
            >
              <Mail size={13} /> Get in touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
