"use client";

import { useState } from "react";
import { X, Camera, MapPin } from "lucide-react";

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

const card = {
  background: "var(--surface)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--rule)",
};

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (photo) => {
    setLightboxIndex(filtered.findIndex((p) => p.id === photo.id));
    setSelected(photo);
  };

  const navigate = (dir) => {
    const next = lightboxIndex + dir;
    if (next < 0 || next >= filtered.length) return;
    setLightboxIndex(next);
    setSelected(filtered[next]);
  };

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
            the collection
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
          Gallery
        </h1>
      </section>

      {/* Filter + grid card */}
      <section
        style={{
          padding: "0 2.5rem 5rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div style={{ ...card, padding: "2rem" }}>
          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.8rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background:
                      activeCategory === cat ? "var(--accent)" : "var(--bg)",
                    border: "1px solid",
                    borderColor:
                      activeCategory === cat ? "var(--accent)" : "var(--rule)",
                    color: activeCategory === cat ? "#fff" : "var(--ink-faint)",
                    padding: "0.38rem 1rem",
                    fontSize: "0.7rem",
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = "var(--ink-faint)";
                      e.currentTarget.style.color = "var(--ink)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = "var(--rule)";
                      e.currentTarget.style.color = "var(--ink-faint)";
                    }
                  }}
                >
                  {cat}
                  {cat !== "All" && (
                    <span
                      style={{
                        marginLeft: "0.35rem",
                        opacity: 0.5,
                        fontSize: "0.6rem",
                      }}
                    >
                      {photos.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "0.82rem",
                color: "var(--ink-faint)",
              }}
            >
              {filtered.length}{" "}
              {filtered.length === 1 ? "photograph" : "photographs"}
              {activeCategory !== "All" && ` — ${activeCategory}`}
            </p>
          </div>

          {/* Masonry grid */}
          <div
            key={activeCategory}
            style={{ columns: "3 220px", gap: "0.75rem" }}
          >
            {filtered.map((photo) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo)}
                style={{
                  breakInside: "avoid",
                  marginBottom: "0.75rem",
                  aspectRatio: photo.aspect,
                  background: "var(--bg)",
                  borderRadius: "10px",
                  border: "1px solid var(--rule)",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "0.9rem",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.querySelector(".photo-info").style.opacity =
                    "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--rule)";
                  e.currentTarget.querySelector(".photo-info").style.opacity =
                    "0";
                }}
              >
                {/* Placeholder icon */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -60%)",
                    opacity: 0.12,
                  }}
                >
                  <Camera size={28} color="var(--ink)" />
                </div>

                <div
                  className="photo-info"
                  style={{
                    opacity: 0,
                    transition: "opacity 0.25s ease",
                    background: "var(--surface)",
                    borderRadius: "8px",
                    padding: "0.6rem 0.75rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.9rem",
                      color: "var(--ink)",
                      fontWeight: 400,
                    }}
                  >
                    {photo.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      color: "var(--ink-faint)",
                      marginTop: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontWeight: 300,
                    }}
                  >
                    <MapPin size={9} color="var(--accent)" />
                    {photo.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          {/* Lightbox card */}
          <div
            style={{
              ...card,
              padding: "1.5rem",
              width: "100%",
              maxWidth: "700px",
              position: "relative",
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "var(--ink-faint)",
                }}
              >
                {lightboxIndex + 1} / {filtered.length}
              </p>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--rule)",
                  cursor: "pointer",
                  color: "var(--ink-faint)",
                  borderRadius: "6px",
                  padding: "0.3rem 0.6rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ink)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ink-faint)")
                }
              >
                <X size={12} /> close
              </button>
            </div>

            {/* Photo area */}
            <div
              style={{
                width: "100%",
                aspectRatio: selected.aspect,
                background: "var(--bg)",
                borderRadius: "10px",
                border: "1px solid var(--rule)",
                marginBottom: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={32} color="var(--rule)" />
            </div>

            {/* Info + nav */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
                  {selected.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    color: "var(--ink-faint)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontWeight: 300,
                  }}
                >
                  <MapPin size={10} color="var(--accent)" />
                  {selected.location}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button
                  onClick={() => navigate(-1)}
                  disabled={lightboxIndex === 0}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--rule)",
                    color: "var(--ink-faint)",
                    cursor: lightboxIndex === 0 ? "not-allowed" : "pointer",
                    opacity: lightboxIndex === 0 ? 0.3 : 1,
                    padding: "0.45rem 1rem",
                    fontSize: "0.72rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  ← prev
                </button>
                <button
                  onClick={() => navigate(1)}
                  disabled={lightboxIndex === filtered.length - 1}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--rule)",
                    color: "var(--ink-faint)",
                    cursor:
                      lightboxIndex === filtered.length - 1
                        ? "not-allowed"
                        : "pointer",
                    opacity: lightboxIndex === filtered.length - 1 ? 0.3 : 1,
                    padding: "0.45rem 1rem",
                    fontSize: "0.72rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
