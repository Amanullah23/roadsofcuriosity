"use client";

// Roads of Curiosity — Admin: Stories list (new visual system: "The Route")
// Target: app/admin/stories/page.js
// Light only — shares AdminShell with the rest of the admin panel.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, MapPin, BookOpen } from "lucide-react";
import AdminShell, {
  PETROL,
  CLAY,
  BG,
  SURFACE,
  INK,
  FAINT,
  RULE,
} from "@/components/admin/AdminShell";
import { getStories, deleteStory } from "@/lib/api";
import { stories as fallbackStories } from "@/lib/data";

// ─── Story row ─────────────────────────────────────────────────────────────────
function StoryRow({ story, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleDeleteClick = async () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    setDeleting(true);
    await onDelete(story.slug);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1.1rem 1.25rem",
        border: `1px solid ${RULE}`,
        borderTop: "none",
        background: hovered ? SURFACE : "transparent",
        opacity: deleting ? 0.4 : 1,
        transition: "opacity 0.2s ease, background 0.2s ease",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "64px",
          height: "64px",
          flexShrink: 0,
          background: SURFACE,
          border: `1px solid ${RULE}`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {story.image || story.cover ? (
          <img
            src={story.image || story.cover}
            alt={story.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BookOpen size={18} color={RULE} />
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "0.35rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.64rem",
              letterSpacing: "0.04em",
              padding: "0.15rem 0.5rem",
              border: `1px solid ${story.published !== false ? PETROL : RULE}`,
              color: story.published !== false ? PETROL : FAINT,
            }}
          >
            {story.published !== false ? "Published" : "Draft"}
          </span>
          {story.place && (
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.72rem",
                color: FAINT,
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <MapPin size={10} /> {story.place}
            </span>
          )}
        </div>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "1.05rem",
            color: INK,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {story.title || "Untitled story"}
        </p>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexShrink: 0,
        }}
      >
        <Link
          href={`/admin/stories/${story.slug}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "34px",
            height: "34px",
            border: `1px solid ${RULE}`,
            color: INK,
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = PETROL;
            e.currentTarget.style.color = PETROL;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = RULE;
            e.currentTarget.style.color = INK;
          }}
        >
          <Pencil size={14} />
        </Link>
        <button
          onClick={handleDeleteClick}
          disabled={deleting}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            justifyContent: "center",
            width: confirming ? "auto" : "34px",
            height: "34px",
            padding: confirming ? "0 0.75rem" : 0,
            border: `1px solid ${confirming ? CLAY : RULE}`,
            background: confirming ? "rgba(167,109,83,0.1)" : "transparent",
            color: confirming ? CLAY : INK,
            cursor: "pointer",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.7rem",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!confirming) {
              e.currentTarget.style.borderColor = CLAY;
              e.currentTarget.style.color = CLAY;
            }
          }}
          onMouseLeave={(e) => {
            if (!confirming) {
              e.currentTarget.style.borderColor = RULE;
              e.currentTarget.style.color = INK;
            }
          }}
        >
          <Trash2 size={14} /> {confirming && "Confirm?"}
        </button>
      </div>
    </div>
  );
}

// ─── Admin stories list page ──────────────────────────────────────────────────
export default function AdminStoriesPage() {
  const router = useRouter();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const init = async () => {
      const auth =
        localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
      if (!auth) {
        router.push("/admin");
        return;
      }

      try {
        const data = await getStories();
        setStories(
          Array.isArray(data) && data.length > 0 ? data : fallbackStories,
        );
      } catch {
        setStories(fallbackStories);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleDelete = async (slug) => {
    try {
      await deleteStory(slug);
    } catch {
      // ignore — still remove locally so the UI reflects intent
    }
    setStories((prev) => prev.filter((s) => s.slug !== slug));
  };

  const filtered = stories.filter(
    (s) =>
      (s.title || "").toLowerCase().includes(query.toLowerCase()) ||
      (s.place || "").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AdminShell
      title="Stories"
      maxWidth="1100px"
      action={
        <Link
          href="/admin/stories/new"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.55rem 1.1rem",
            background: PETROL,
            color: BG,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = CLAY)}
          onMouseLeave={(e) => (e.currentTarget.style.background = PETROL)}
        >
          <Plus size={14} /> New story
        </Link>
      }
    >
      {/* Search */}
      <div
        style={{
          position: "relative",
          maxWidth: "360px",
          marginBottom: "2rem",
        }}
      >
        <Search
          size={15}
          style={{
            position: "absolute",
            left: "0.9rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: FAINT,
          }}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories by title or place…"
          style={{
            width: "100%",
            padding: "0.65rem 0.9rem 0.65rem 2.4rem",
            border: `1px solid ${RULE}`,
            background: BG,
            color: INK,
            fontFamily: "'Fraunces', serif",
            fontSize: "0.9rem",
            outline: "none",
          }}
        />
      </div>

      {/* List */}
      {loading ? (
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            color: FAINT,
          }}
        >
          Loading stories…
        </p>
      ) : filtered.length > 0 ? (
        <div>
          <div style={{ borderTop: `1px solid ${RULE}` }} />
          {filtered.map((story) => (
            <StoryRow key={story.slug} story={story} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            border: `1px dashed ${RULE}`,
          }}
        >
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: FAINT,
              marginBottom: "1.25rem",
            }}
          >
            {query ? `No stories match "${query}".` : "No stories yet."}
          </p>
          {!query && (
            <Link
              href="/admin/stories/new"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.78rem",
                color: PETROL,
                borderBottom: `1px solid ${PETROL}`,
                paddingBottom: "2px",
                textDecoration: "none",
              }}
            >
              <Plus size={12} /> Create your first story
            </Link>
          )}
        </div>
      )}
    </AdminShell>
  );
}
