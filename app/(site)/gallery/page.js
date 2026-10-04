"use client";

// Roads of Curiosity — Gallery (new visual system: "The Route")
// Target: app/(site)/gallery/page.js
//
// Not a filterable grid of thumbnails — a walk through four rooms,
// each opening with one signature piece given full room to breathe,
// then its wall of related work in an irregular, hand-set hang.

import { useState, useEffect, useCallback } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { getPhotos } from "@/lib/api";
import { photos as staticPhotos } from "@/lib/data";
import RouteLine from "@/components/RouteLine";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const SURFACE = "#EDE7DA";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

const ROOM_ORDER = ["Landscapes", "Portraits", "Travel", "Architecture"];
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1784570269737-21da4658a609?q=80&w=1800&auto=format&fit=crop";

// How much room a photograph gets in the hand-set hang, from its own aspect ratio —
// never a uniform thumbnail size.
function spanFor(aspect) {
  const parts = String(aspect || "4 / 3")
    .split("/")
    .map((s) => parseFloat(s.trim()) || 1);
  const ratio = parts[0] / (parts[1] || 1);
  if (ratio >= 1.5) return { col: 4, row: 2 };
  if (ratio >= 1.05) return { col: 3, row: 2 };
  if (ratio > 0.9) return { col: 2, row: 2 };
  return { col: 2, row: 3 };
}

// ─── A photograph on the wall: viewfinder brackets + a permanent wall label ───
function Frame({ photo, onOpen, span }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        textAlign: "left",
        border: "none",
        padding: 0,
        background: "none",
        cursor: "pointer",
        display: "block",
        gridColumn: `span ${span.col}`,
        gridRow: `span ${span.row}`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: SURFACE,
        }}
      >
        <img
          src={photo.src || FALLBACK_IMAGE}
          alt={photo.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.02)" : "scale(1)",
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

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0.9rem 1rem",
            background:
              "linear-gradient(to top, rgba(41,45,43,0.55), rgba(41,45,43,0))",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "0.88rem",
              color: BG,
            }}
          >
            {photo.title}
          </p>
        </div>
      </div>
    </button>
  );
}

// ─── The room's opening piece — full width, caption floating off the corner ──
function FeatureFrame({ photo, onOpen }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "2.5rem" }}>
      <button
        onClick={onOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          width: "100%",
          border: "none",
          padding: 0,
          cursor: "pointer",
          position: "relative",
          aspectRatio: "16 / 7",
          overflow: "hidden",
          background: SURFACE,
        }}
      >
        <img
          src={photo.src || FALLBACK_IMAGE}
          alt={photo.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.015)" : "scale(1)",
            transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
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
      </button>
      <div
        className="roc-feature-plaque"
        style={{
          position: "relative",
          background: BG,
          border: `1px solid ${RULE}`,
          padding: "1.4rem 1.75rem",
          maxWidth: "400px",
          marginLeft: "6%",
          transform: "translateY(-1.5rem)",
        }}
      >
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: INK,
            marginBottom: "0.4rem",
          }}
        >
          {photo.title}
        </p>
        {photo.location && (
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.74rem",
              color: FAINT,
            }}
          >
            {photo.location}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Lightbox — an aperture opening, not a modal popping up ──────────────────
function Lightbox({ photo, onClose, onPrev, onNext }) {
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const requestClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 380);
  }, [onClose]);

  const requestNav = useCallback(
    (dir) => {
      setImgVisible(false);
      setTimeout(() => {
        dir === "next" ? onNext() : onPrev();
        setImgVisible(true);
      }, 220);
    },
    [onNext, onPrev],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowRight") requestNav("next");
      if (e.key === "ArrowLeft") requestNav("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose, requestNav]);

  const open = visible && !closing;

  return (
    <div
      onClick={requestClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(23,26,24,0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: open ? "circle(140% at 50% 50%)" : "circle(0% at 50% 50%)",
        transition: "clip-path 0.42s cubic-bezier(0.65, 0, 0.35, 1)",
      }}
    >
      <button
        onClick={requestClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: BG,
          opacity: open ? 0.85 : 0,
          transition: "opacity 0.3s ease 0.15s",
        }}
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          requestNav("prev");
        }}
        aria-label="Previous"
        className="roc-lightbox-arrow"
        style={{
          position: "absolute",
          left: "1.25rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: BG,
          opacity: open ? 0.7 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <ArrowLeft size={22} strokeWidth={1.5} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "82vw",
          maxHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.96)",
          transition: "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s",
        }}
      >
        <img
          src={photo.src || FALLBACK_IMAGE}
          alt={photo.title}
          style={{
            maxWidth: "82vw",
            maxHeight: "68vh",
            objectFit: "contain",
            opacity: imgVisible ? 1 : 0,
            transition: "opacity 0.22s ease",
          }}
        />
        <div
          style={{
            marginTop: "1.1rem",
            textAlign: "center",
            opacity: imgVisible ? 1 : 0,
            transition: "opacity 0.22s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: BG,
              marginBottom: "0.3rem",
            }}
          >
            {photo.title}
          </p>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.76rem",
              color: "rgba(244,238,227,0.55)",
            }}
          >
            {photo.location}
            {photo.location && photo.description ? " — " : ""}
            {photo.description}
          </p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          requestNav("next");
        }}
        aria-label="Next"
        className="roc-lightbox-arrow"
        style={{
          position: "absolute",
          right: "1.25rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: BG,
          opacity: open ? 0.7 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <ArrowRight size={22} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState(staticPhotos);
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    const init = async () => {
      try {
        const data = await getPhotos();
        if (Array.isArray(data) && data.length > 0) setPhotos(data);
      } catch {
        /* static fallback */
      }
    };
    init();
    return () => clearTimeout(t);
  }, []);

  const rooms = ROOM_ORDER.map((name) => ({
    name,
    photos: photos.filter((p) => p.category === name),
  })).filter((r) => r.photos.length > 0);

  const flat = rooms.flatMap((r) => r.photos);
  const activePhoto = activeIndex !== null ? flat[activeIndex] : null;

  const openAt = (photo) => setActiveIndex(flat.findIndex((p) => p === photo));
  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + flat.length) % flat.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % flat.length);

  const waypoints = ["Begin", ...rooms.map((r) => r.name), "Close"];

  return (
    <main style={{ background: BG }}>
      {/* ── Intro ── */}
      <section
        style={{
          padding: "7rem 2rem 3rem",
          maxWidth: "1360px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontWeight: 480,
            fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
            color: INK,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            maxWidth: "680px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          Photographs don't need a caption until you're ready to leave them.
        </h1>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.95rem",
            color: FAINT,
            lineHeight: 1.7,
            marginTop: "1.5rem",
            maxWidth: "480px",
          }}
        >
          Four rooms, arranged the way they were taken rather than how they'd
          tile neatly. Walk through, or jump to one.
        </p>

        {rooms.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginTop: "2.25rem",
            }}
          >
            {rooms.map((r) => (
              <a
                key={r.name}
                href={`#room-${r.name}`}
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: PETROL,
                  textDecoration: "none",
                  borderBottom: `1px solid ${RULE}`,
                  paddingBottom: "2px",
                }}
              >
                {r.name}{" "}
                <span style={{ color: FAINT }}>({r.photos.length})</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ── Rooms, threaded by the route ── */}
      <div style={{ position: "relative" }}>
        <RouteLine waypoints={waypoints} />
        <div className="roc-threaded">
          {rooms.map((room, ri) => {
            const [feature, ...rest] = room.photos;
            return (
              <section
                key={room.name}
                id={`room-${room.name}`}
                style={{ padding: "3rem 2rem 5rem" }}
              >
                <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: CLAY,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Room {ri + 1} of {rooms.length}
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontOpticalSizing: "auto",
                      fontWeight: 500,
                      fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                      color: INK,
                      marginBottom: "2.25rem",
                    }}
                  >
                    {room.name}
                  </h2>

                  {feature && (
                    <FeatureFrame
                      photo={feature}
                      onOpen={() => openAt(feature)}
                    />
                  )}

                  {rest.length > 0 && (
                    <div
                      className="roc-room-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gridAutoRows: "130px",
                        gridAutoFlow: "dense",
                        gap: "1rem",
                      }}
                    >
                      {rest.map((photo, i) => (
                        <Frame
                          key={i}
                          photo={photo}
                          span={spanFor(photo.aspect)}
                          onOpen={() => openAt(photo)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {rooms.length === 0 && (
            <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  color: FAINT,
                  fontSize: "1.1rem",
                }}
              >
                The walls are bare for now — add some photographs from the admin
                panel.
              </p>
            </div>
          )}
        </div>
      </div>

      {activePhoto && (
        <Lightbox
          photo={activePhoto}
          onClose={() => setActiveIndex(null)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .roc-corner { position: absolute; width: 20px; height: 20px; border-color: ${GOLD}; transition: opacity 0.3s ease; }
        .roc-corner-tl { top: 9px; left: 9px; border-top: 2px solid; border-left: 2px solid; }
        .roc-corner-tr { top: 9px; right: 9px; border-top: 2px solid; border-right: 2px solid; }
        .roc-corner-bl { bottom: 9px; left: 9px; border-bottom: 2px solid; border-left: 2px solid; }
        .roc-corner-br { bottom: 9px; right: 9px; border-bottom: 2px solid; border-right: 2px solid; }

        .roc-threaded { padding-left: 76px; }

        @media (min-width: 861px) and (max-width: 1100px) {
          .roc-threaded { padding-left: 56px; }
        }

        @media (max-width: 860px) {
          .roc-threaded { padding-left: 0; }
          .roc-room-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 160px !important; }
          .roc-feature-plaque { margin-left: 0 !important; max-width: 100% !important; transform: none !important; }
          .roc-lightbox-arrow { display: none; }
        }
      `}</style>
    </main>
  );
}
