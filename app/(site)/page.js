"use client";

// Roads of Curiosity — Home (new visual system: "The Route")
// Target: app/(site)/page.js

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStories, getJournalEntries, getHomeContent } from "@/lib/api";
import { stories as staticStories, entries as staticEntries } from "@/lib/data";
import RouteLine from "@/components/RouteLine";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const SURFACE = "#EDE7DA";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

// ─── Sample images (Unsplash) — swap for your own via lib/data.js `cover` fields ──
// These only ever show up when a story/entry has no cover image of its own,
// so once your real photographs are in lib/data.js (or the API), these disappear
// on their own. Kept here just so you can see the layouts with real photography.
const SAMPLE_IMAGES = {
  heroRoad:
    "https://images.unsplash.com/photo-1650511503717-113b2459fd13?q=80&w=2000&auto=format&fit=crop",
  mountainsGold:
    "https://images.unsplash.com/photo-1784570269737-21da4658a609?q=80&w=1800&auto=format&fit=crop",
  teaVendorNight:
    "https://images.unsplash.com/photo-1741836019829-6c0be185e62a?q=80&w=1400&auto=format&fit=crop",
  aerialValley:
    "https://images.unsplash.com/photo-1721297014035-5fd86e65270f?q=80&w=1800&auto=format&fit=crop",
  desertRoadBW:
    "https://images.unsplash.com/photo-1692825655700-96f8bfa68166?q=80&w=2000&auto=format&fit=crop",
  portraitMan:
    "https://images.unsplash.com/photo-1577632584998-56efd90c5a42?q=80&w=1000&auto=format&fit=crop",
};

// ─── Home page content — editable from Admin → Home page ──────────────────────
// These are the defaults used until the backend's home_content table answers
// (or if it never does). Nothing on the page changes the moment you add the
// admin page — it just becomes editable from here on.
const DEFAULT_HOME = {
  hero_title: "Every road keeps something back until you stop and look.",
  hero_subtitle:
    "Photographs and field notes gathered on foot — kept by Rik Alexander Nelissen, one place, one conversation, one cup of tea at a time.",
  hero_cta_label: "Begin at the first mile",
  hero_fallback_image: SAMPLE_IMAGES.heroRoad,
  exhibition_caption: "Held still, for once.",
  exhibition_fallback_image: SAMPLE_IMAGES.desertRoadBW,
  about_quote:
    "I don't go looking for the photograph. I go looking for the conversation, and the photograph is what's left when it's over.",
  about_byline:
    "Rik Alexander Nelissen — photographer and keeper of this notebook",
  about_image: SAMPLE_IMAGES.portraitMan,
  newsletter_title: "Join the journey",
  newsletter_body:
    "A short note when there's a new story, a new photograph, or a place worth telling you about. Nothing more often than that.",
};

// ─── A hand-traced underline link, echoing the nav's road motif ───────────────
function TracedLink({ href, children, color = PETROL }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-block",
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

// ─── A photograph treated as artwork: viewfinder brackets + a wall-label caption ──
function PhotoFrame({ src, alt, aspect = "4 / 3", caption, place }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div>
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
      {(caption || place) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "1rem",
            paddingTop: "0.7rem",
            marginTop: "0.7rem",
            borderTop: `1px solid ${RULE}`,
          }}
        >
          {caption && (
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "0.9rem",
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
      )}
    </div>
  );
}

export default function HomePage() {
  const [stories, setStories] = useState(staticStories);
  const [entries, setEntries] = useState(staticEntries);
  const [home, setHome] = useState(DEFAULT_HOME);
  const [mounted, setMounted] = useState(false);
  const [nl, setNl] = useState({ email: "", submitted: false, loading: false });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    const init = async () => {
      try {
        const s = await getStories();
        if (Array.isArray(s) && s.length > 0) setStories(s);
      } catch {
        /* static fallback */
      }
      try {
        const e = await getJournalEntries();
        if (Array.isArray(e) && e.length > 0) setEntries(e);
      } catch {
        /* static fallback */
      }
      try {
        const h = await getHomeContent();
        if (h && Object.keys(h).length > 0)
          setHome((prev) => ({ ...prev, ...h }));
      } catch {
        /* static fallback */
      }
    };
    init();
    return () => clearTimeout(t);
  }, []);

  const featured = stories.slice(0, 3);
  const places = Array.from(
    new Set(stories.map((s) => s.place).filter(Boolean)),
  ).slice(0, 5);
  const journalPreview = entries.slice(0, 2);
  const heroImage =
    featured[0]?.cover || featured[0]?.image || home.hero_fallback_image;
  const exhibitImage =
    featured[2]?.cover || featured[2]?.image || home.exhibition_fallback_image;

  const waypoints = [
    "Begin",
    ...featured.map((s) => s.place || s.title).slice(0, 3),
    "From the road",
    "The exhibition",
    "The photographer",
    "Join in",
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!nl.email) return;
    setNl((s) => ({ ...s, loading: true }));
    await new Promise((r) => setTimeout(r, 700));
    // TODO: replace with a real POST once the newsletter endpoint exists
    setNl((s) => ({ ...s, loading: false, submitted: true }));
  };

  return (
    <main style={{ background: BG }}>
      {/* ── Hero: a collision, not a banner ── */}
      <section
        className="roc-hero"
        style={{ position: "relative", minHeight: "90vh" }}
      >
        <div
          className="roc-hero-text"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "7.5rem 2rem 3rem 2.5rem",
            maxWidth: "620px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontOpticalSizing: "auto",
              fontWeight: 480,
              fontSize: "clamp(2.6rem, 6vw, 4.3rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              color: INK,
              opacity: mounted ? 1 : 0,
              filter: mounted ? "blur(0px)" : "blur(14px)",
              transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 1.1s cubic-bezier(0.22,1,0.36,1), filter 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {home.hero_title}
          </h1>

          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "1rem",
              color: FAINT,
              lineHeight: 1.7,
              marginTop: "1.6rem",
              maxWidth: "440px",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.3s",
            }}
          >
            {home.hero_subtitle}
          </p>

          {places.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "2.1rem",
                opacity: mounted ? 1 : 0,
                transition: "opacity 1s ease 0.5s",
              }}
            >
              {places.map((p, i) => (
                <span
                  key={p}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Link
                    href={`/stories?place=${encodeURIComponent(p)}`}
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: PETROL,
                      textDecoration: "none",
                      borderBottom: `1px solid ${RULE}`,
                    }}
                  >
                    {p}
                  </Link>
                  {i < places.length - 1 && (
                    <span style={{ color: FAINT, fontSize: "0.75rem" }}>—</span>
                  )}
                </span>
              ))}
            </div>
          )}

          <div
            style={{
              marginTop: "2.75rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.65s",
            }}
          >
            {featured[0] && (
              <TracedLink href={`/stories/${featured[0].slug}`}>
                {home.hero_cta_label}
              </TracedLink>
            )}
          </div>
        </div>

        <div
          className="roc-hero-image"
          style={{
            position: "relative",
            overflow: "hidden",
            background: SURFACE,
          }}
        >
          <img
            src={heroImage}
            alt={featured[0]?.title || "A road, somewhere"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              clipPath: mounted ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
              transition: "clip-path 1.3s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          />
        </div>
      </section>

      {/* ── Everything from here to the closing CTA is threaded by the route line ── */}
      <div style={{ position: "relative" }}>
        <RouteLine waypoints={waypoints} />
        <div className="roc-threaded">
          {/* ── Story I — full-bleed with a floating plaque ── */}
          {featured[0] && (
            <section style={{ padding: "6rem 2rem 2rem" }}>
              <div
                style={{
                  position: "relative",
                  maxWidth: "1360px",
                  margin: "0 auto",
                }}
              >
                <PhotoFrame
                  src={
                    featured[0].cover ||
                    featured[0].image ||
                    SAMPLE_IMAGES.mountainsGold
                  }
                  alt={featured[0].title}
                  aspect="16 / 8"
                  place={featured[0].place}
                />
                <div
                  className="roc-plaque"
                  style={{
                    position: "relative",
                    marginTop: "-1px",
                    background: BG,
                    border: `1px solid ${RULE}`,
                    padding: "1.75rem 2rem",
                    maxWidth: "440px",
                    marginLeft: "auto",
                    marginRight: "6%",
                    transform: "translateY(-1.75rem)",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontOpticalSizing: "auto",
                      fontWeight: 500,
                      fontSize: "1.65rem",
                      color: INK,
                      lineHeight: 1.2,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {featured[0].title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.88rem",
                      color: FAINT,
                      lineHeight: 1.7,
                      marginBottom: "1.1rem",
                    }}
                  >
                    {featured[0].excerpt || featured[0].intro}
                  </p>
                  <TracedLink href={`/stories/${featured[0].slug}`}>
                    Read this story
                  </TracedLink>
                </div>
              </div>
            </section>
          )}

          {/* ── Story II — text-forward, a pull quote leads ── */}
          {featured[1] && (
            <section style={{ padding: "3rem 2rem 6rem" }}>
              <div
                className="roc-split-text-first"
                style={{
                  maxWidth: "1360px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 0.72fr",
                  gap: "4rem",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                      lineHeight: 1.45,
                      color: INK,
                      marginBottom: "1.75rem",
                    }}
                  >
                    "
                    {featured[1].pullQuote ||
                      featured[1].excerpt ||
                      "Some places don’t photograph so much as they confess."}
                    "
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 500,
                      fontSize: "1.3rem",
                      color: PETROL,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {featured[1].title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: FAINT,
                      marginBottom: "1.4rem",
                    }}
                  >
                    {featured[1].place}
                  </p>
                  <TracedLink
                    href={`/stories/${featured[1].slug}`}
                    color={CLAY}
                  >
                    Continue reading
                  </TracedLink>
                </div>
                <PhotoFrame
                  src={
                    featured[1].cover ||
                    featured[1].image ||
                    SAMPLE_IMAGES.teaVendorNight
                  }
                  alt={featured[1].title}
                  aspect="3 / 4"
                />
              </div>
            </section>
          )}

          {/* ── Story III — image leads, wide and left ── */}
          {featured[2] && (
            <section style={{ padding: "3rem 0 6rem" }}>
              <div
                className="roc-split-image-first"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 0.8fr",
                  alignItems: "center",
                  gap: "0",
                }}
              >
                <div style={{ paddingLeft: "2rem" }}>
                  <PhotoFrame
                    src={
                      featured[2].cover ||
                      featured[2].image ||
                      SAMPLE_IMAGES.aerialValley
                    }
                    alt={featured[2].title}
                    aspect="5 / 4"
                    place={featured[2].place}
                  />
                </div>
                <div style={{ padding: "2rem 2rem 2rem 3rem" }}>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontOpticalSizing: "auto",
                      fontWeight: 500,
                      fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
                      color: INK,
                      lineHeight: 1.2,
                      marginBottom: "1rem",
                    }}
                  >
                    {featured[2].title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.92rem",
                      color: FAINT,
                      lineHeight: 1.75,
                      marginBottom: "1.4rem",
                    }}
                  >
                    {featured[2].excerpt || featured[2].intro}
                  </p>
                  <TracedLink href={`/stories/${featured[2].slug}`}>
                    Read this story
                  </TracedLink>
                </div>
              </div>
            </section>
          )}

          {/* ── Journal interlude — a notebook page peeking in ── */}
          {journalPreview.length > 0 && (
            <section style={{ padding: "2rem 2rem 7rem" }}>
              <div
                style={{
                  maxWidth: "1360px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="roc-notebook"
                  style={{
                    background: SURFACE,
                    border: `1px solid ${RULE}`,
                    padding: "2.25rem 2.5rem",
                    maxWidth: "560px",
                    transform: "rotate(-0.6deg)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: CLAY,
                      marginBottom: "1.25rem",
                    }}
                  >
                    From the road
                  </p>
                  {journalPreview.map((entry, i) => (
                    <div
                      key={entry.slug}
                      style={{
                        paddingBottom:
                          i < journalPreview.length - 1 ? "1.5rem" : 0,
                        marginBottom:
                          i < journalPreview.length - 1 ? "1.5rem" : 0,
                        borderBottom:
                          i < journalPreview.length - 1
                            ? `1px solid ${RULE}`
                            : "none",
                      }}
                    >
                      <Link
                        href={`/journal/${entry.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h4
                          style={{
                            fontFamily: "'Fraunces', serif",
                            fontStyle: "italic",
                            fontWeight: 400,
                            fontSize: "1.25rem",
                            color: INK,
                            lineHeight: 1.4,
                            marginBottom: "0.5rem",
                          }}
                        >
                          {entry.title}
                        </h4>
                      </Link>
                      <p
                        style={{
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontSize: "0.78rem",
                          color: FAINT,
                        }}
                      >
                        {entry.place}
                        {entry.place && entry.date ? " · " : ""}
                        {entry.date}
                      </p>
                    </div>
                  ))}
                  <div style={{ marginTop: "1.75rem" }}>
                    <TracedLink href="/journal" color={CLAY}>
                      Read the whole notebook
                    </TracedLink>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── The exhibition — one cinematic break ── */}
          <section style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "min(86vh, 760px)",
                background: SURFACE,
                overflow: "hidden",
              }}
            >
              <img
                src={exhibitImage}
                alt="A single photograph, given room to breathe"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "2rem",
                  bottom: "2rem",
                  background: BG,
                  padding: "1rem 1.4rem",
                  maxWidth: "320px",
                  border: `1px solid ${RULE}`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: INK,
                    lineHeight: 1.5,
                  }}
                >
                  {featured[2]?.title || home.exhibition_caption}
                </p>
              </div>
            </div>
          </section>

          {/* ── About teaser ── */}
          <section style={{ padding: "7rem 2rem" }}>
            <div
              className="roc-about-teaser"
              style={{
                maxWidth: "1360px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "0.85fr 1.3fr",
                gap: "4rem",
                alignItems: "center",
              }}
            >
              <PhotoFrame
                src={home.about_image}
                alt={home.about_byline}
                aspect="4 / 5"
              />
              <div>
                <p
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)",
                    lineHeight: 1.45,
                    color: INK,
                    marginBottom: "1.75rem",
                  }}
                >
                  "{home.about_quote}"
                </p>
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: FAINT,
                    marginBottom: "1.5rem",
                  }}
                >
                  {home.about_byline}
                </p>
                <TracedLink href="/about">About the photographer</TracedLink>
              </div>
            </div>
          </section>

          {/* ── Join the journey ── */}
          <section style={{ padding: "2rem 2rem 8rem" }}>
            <div
              style={{
                maxWidth: "640px",
                margin: "0 auto",
                textAlign: "left",
                borderTop: `1px solid ${RULE}`,
                paddingTop: "3.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontOpticalSizing: "auto",
                  fontWeight: 500,
                  fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
                  color: INK,
                  marginBottom: "0.9rem",
                }}
              >
                {home.newsletter_title}
              </h3>
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.92rem",
                  color: FAINT,
                  lineHeight: 1.7,
                  marginBottom: "1.75rem",
                  maxWidth: "460px",
                }}
              >
                {home.newsletter_body}
              </p>

              {nl.submitted ? (
                <p
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: "italic",
                    color: PETROL,
                    fontSize: "1rem",
                  }}
                >
                  You're on the list. The next dispatch will find you.
                </p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  style={{
                    display: "flex",
                    gap: "0",
                    maxWidth: "440px",
                    borderBottom: `1px solid ${INK}`,
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={nl.email}
                    onChange={(e) =>
                      setNl((s) => ({ ...s, email: e.target.value }))
                    }
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.95rem",
                      color: INK,
                      padding: "0.6rem 0",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={nl.loading}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: nl.loading ? "default" : "pointer",
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: PETROL,
                      padding: "0.6rem 0.25rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {nl.loading ? "Sending…" : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .roc-corner { position: absolute; width: 22px; height: 22px; border-color: ${GOLD}; transition: opacity 0.3s ease; }
        .roc-corner-tl { top: 10px; left: 10px; border-top: 2px solid; border-left: 2px solid; }
        .roc-corner-tr { top: 10px; right: 10px; border-top: 2px solid; border-right: 2px solid; }
        .roc-corner-bl { bottom: 10px; left: 10px; border-bottom: 2px solid; border-left: 2px solid; }
        .roc-corner-br { bottom: 10px; right: 10px; border-bottom: 2px solid; border-right: 2px solid; }

        .roc-hero { display: grid; grid-template-columns: 0.92fr 1.3fr; }
        .roc-threaded { padding-left: 76px; }

        @media (min-width: 861px) and (max-width: 1100px) {
          .roc-threaded { padding-left: 56px; }
        }

        @media (max-width: 860px) {
          .roc-hero { grid-template-columns: 1fr; min-height: auto; }
          .roc-hero-text { padding: 3rem 1.5rem 2.5rem !important; max-width: 100% !important; }
          .roc-hero-image { height: 55vh; }
          .roc-threaded { padding-left: 0; }
          .roc-split-text-first, .roc-split-image-first, .roc-about-teaser {
            grid-template-columns: 1fr !important;
          }
          .roc-split-image-first > div:first-child { padding-left: 0 !important; }
          .roc-split-image-first > div:last-child { padding: 1.75rem 1.5rem !important; }
          .roc-plaque { margin-right: 0 !important; max-width: 100% !important; transform: none !important; }
          .roc-notebook { max-width: 100% !important; transform: none !important; padding: 1.75rem !important; }
        }
      `}</style>
    </main>
  );
}
