"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { X } from "lucide-react";

const photos = [
  {
    id: 1,
    title: "Mountain Silence",
    location: "Hindu Kush, Afghanistan",
    aspect: "4/5",
    category: "Landscapes",
  },
  {
    id: 2,
    title: "The Last Light",
    location: "Bamiyan Valley",
    aspect: "16/9",
    category: "Landscapes",
  },
  {
    id: 3,
    title: "Desert Roads",
    location: "Dasht-e Margo",
    aspect: "4/5",
    category: "Travel",
  },
  {
    id: 4,
    title: "Kabul Morning",
    location: "Kabul, Afghanistan",
    aspect: "1/1",
    category: "Architecture",
  },
  {
    id: 5,
    title: "Band-e Amir",
    location: "Bamyan Province",
    aspect: "16/9",
    category: "Landscapes",
  },
  {
    id: 6,
    title: "Wakhan Corridor",
    location: "Badakhshan",
    aspect: "4/5",
    category: "Travel",
  },
  {
    id: 7,
    title: "Old City Walls",
    location: "Ghazni, Afghanistan",
    aspect: "1/1",
    category: "Architecture",
  },
  {
    id: 8,
    title: "Shepherd at Dusk",
    location: "Panjshir Valley",
    aspect: "4/5",
    category: "Portraits",
  },
  {
    id: 9,
    title: "Market Faces",
    location: "Kabul Bazaar",
    aspect: "1/1",
    category: "Portraits",
  },
  {
    id: 10,
    title: "River Bend",
    location: "Kunduz Province",
    aspect: "16/9",
    category: "Landscapes",
  },
  {
    id: 11,
    title: "The Blue Mosque",
    location: "Mazar-i-Sharif",
    aspect: "4/5",
    category: "Architecture",
  },
  {
    id: 12,
    title: "Nomad Camp",
    location: "Faryab Province",
    aspect: "16/9",
    category: "Travel",
  },
];

const categories = ["All", "Landscapes", "Portraits", "Travel", "Architecture"];

export default function Gallery() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const color = theme === "dark" ? "#e8e4de" : "#1a1a1a";
  const subtle =
    theme === "dark" ? "rgba(232,228,222,0.35)" : "rgba(26,26,26,0.35)";
  const border =
    theme === "dark" ? "rgba(232,228,222,0.08)" : "rgba(26,26,26,0.08)";
  const cardBg =
    theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const overlayBg =
    theme === "dark" ? "rgba(0,0,0,0.96)" : "rgba(250,250,248,0.97)";
  const activeBg =
    theme === "dark" ? "rgba(232,228,222,0.1)" : "rgba(26,26,26,0.08)";

  const filtered =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (photo) => {
    const index = filtered.findIndex((p) => p.id === photo.id);
    setLightboxIndex(index);
    setSelected(photo);
  };

  const navigate = (dir) => {
    const next = lightboxIndex + dir;
    if (next < 0 || next >= filtered.length) return;
    setLightboxIndex(next);
    setSelected(filtered[next]);
  };

  return (
    <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ padding: "4rem 2.5rem 2rem" }}>
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            color: subtle,
            marginBottom: "1rem",
          }}
        >
          the collection
        </p>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color,
            lineHeight: 1.1,
            marginBottom: "2.5rem",
          }}
        >
          Gallery
        </h1>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? activeBg : "transparent",
                border: `1px solid ${activeCategory === cat ? subtle : border}`,
                color: activeCategory === cat ? color : subtle,
                padding: "0.45rem 1.1rem",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = subtle;
                  e.currentTarget.style.color = color;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.color = subtle;
                }
              }}
            >
              {cat}
              {cat !== "All" && (
                <span
                  style={{
                    marginLeft: "0.4rem",
                    fontSize: "0.6rem",
                    opacity: 0.5,
                  }}
                >
                  {photos.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "1.5rem 2.5rem 5rem" }}>
        {/* Count */}
        <p
          style={{
            fontSize: "0.7rem",
            color: subtle,
            marginBottom: "1.5rem",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          {filtered.length}{" "}
          {filtered.length === 1 ? "photograph" : "photographs"}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>

        <div
          style={{
            columns: "3 280px",
            gap: "1px",
          }}
        >
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              style={{
                breakInside: "avoid",
                marginBottom: "1px",
                aspectRatio: photo.aspect,
                background: cardBg,
                border: `1px solid ${border}`,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "1.2rem",
                transition: "border-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = subtle;
                e.currentTarget.querySelector(".photo-info").style.opacity =
                  "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.querySelector(".photo-info").style.opacity =
                  "0";
              }}
            >
              <div
                className="photo-info"
                style={{ opacity: 0, transition: "opacity 0.25s ease" }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    color,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {photo.title}
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: subtle,
                    marginTop: "0.2rem",
                  }}
                >
                  {photo.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: overlayBg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "0.78rem",
              opacity: 0.5,
            }}
          >
            close
          </button>

          {/* Counter */}
          <p
            style={{
              position: "absolute",
              top: "1.6rem",
              left: "2rem",
              fontSize: "0.7rem",
              color: subtle,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {lightboxIndex + 1} / {filtered.length}
          </p>

          {/* Photo */}
          <div
            style={{
              width: "100%",
              maxWidth: "780px",
              aspectRatio: selected.aspect,
              background: cardBg,
              border: `1px solid ${border}`,
              marginBottom: "1.5rem",
            }}
          />

          {/* Info */}
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1rem",
              color,
              marginBottom: "0.3rem",
            }}
          >
            {selected.title}
          </p>
          <p
            style={{ fontSize: "0.72rem", color: subtle, marginBottom: "2rem" }}
          >
            {selected.location}
          </p>

          {/* Navigation arrows */}
          <div
            key={activeCategory}
            style={{
              columns: "3 280px",
              gap: "1px",
            }}
          >
            <button
              onClick={() => navigate(-1)}
              disabled={lightboxIndex === 0}
              style={{
                background: "none",
                border: `1px solid ${border}`,
                color,
                cursor: lightboxIndex === 0 ? "not-allowed" : "pointer",
                opacity: lightboxIndex === 0 ? 0.2 : 0.6,
                padding: "0.6rem 1.4rem",
                fontSize: "0.75rem",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (lightboxIndex !== 0) e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                if (lightboxIndex !== 0) e.currentTarget.style.opacity = "0.6";
              }}
            >
              ← prev
            </button>
            <button
              onClick={() => navigate(1)}
              disabled={lightboxIndex === filtered.length - 1}
              style={{
                background: "none",
                border: `1px solid ${border}`,
                color,
                cursor:
                  lightboxIndex === filtered.length - 1
                    ? "not-allowed"
                    : "pointer",
                opacity: lightboxIndex === filtered.length - 1 ? 0.2 : 0.6,
                padding: "0.6rem 1.4rem",
                fontSize: "0.75rem",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (lightboxIndex !== filtered.length - 1)
                  e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                if (lightboxIndex !== filtered.length - 1)
                  e.currentTarget.style.opacity = "0.6";
              }}
            >
              next →
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
