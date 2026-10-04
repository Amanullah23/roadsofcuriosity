"use client";

// Roads of Curiosity — Admin: Journal list (new visual system: "The Route")
// Target: app/admin/journal/page.js
// Light only — shares AdminShell with the rest of the admin panel.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  MapPin,
  NotebookText,
} from "lucide-react";
import AdminShell, {
  PETROL,
  CLAY,
  GOLD,
  BG,
  SURFACE,
  INK,
  FAINT,
  RULE,
} from "@/components/admin/AdminShell";
import { getJournalEntries, deleteJournalEntry } from "@/lib/api";
import { entries as fallbackEntries } from "@/lib/data";

const TYPE_COLOURS = { Encounter: PETROL, Note: CLAY, Discovery: GOLD };
const types = ["All", "Encounter", "Note", "Discovery"];

// ─── Entry row ─────────────────────────────────────────────────────────────────
function EntryRow({ entry, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const typeColour = TYPE_COLOURS[entry.type] || CLAY;

  const handleDeleteClick = async () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    setDeleting(true);
    await onDelete(entry.slug);
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
        {entry.image ? (
          <img
            src={entry.image}
            alt={entry.title}
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
            <NotebookText size={18} color={RULE} />
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
              padding: "0.15rem 0.5rem",
              border: `1px solid ${typeColour}`,
              color: typeColour,
            }}
          >
            {entry.type || "Note"}
          </span>
          <span
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.64rem",
              padding: "0.15rem 0.5rem",
              border: `1px solid ${entry.published !== false ? PETROL : RULE}`,
              color: entry.published !== false ? PETROL : FAINT,
            }}
          >
            {entry.published !== false ? "Published" : "Draft"}
          </span>
          {entry.place && (
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
              <MapPin size={10} /> {entry.place}
            </span>
          )}
          {entry.date && (
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "0.74rem",
                color: FAINT,
              }}
            >
              {entry.date}
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
          {entry.title || "Untitled entry"}
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
          href={`/admin/journal/${entry.slug}`}
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

// ─── Admin journal list page ────────────────────────────────────────────────────
export default function AdminJournalPage() {
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");

  useEffect(() => {
    const init = async () => {
      const auth =
        localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
      if (!auth) {
        router.push("/admin");
        return;
      }

      try {
        const data = await getJournalEntries();
        setEntries(
          Array.isArray(data) && data.length > 0 ? data : fallbackEntries,
        );
      } catch {
        setEntries(fallbackEntries);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleDelete = async (slug) => {
    try {
      await deleteJournalEntry(slug);
    } catch {
      // still remove locally so the UI reflects intent
    }
    setEntries((prev) => prev.filter((e) => e.slug !== slug));
  };

  const filtered = entries
    .filter((e) => activeType === "All" || e.type === activeType)
    .filter(
      (e) =>
        (e.title || "").toLowerCase().includes(query.toLowerCase()) ||
        (e.place || "").toLowerCase().includes(query.toLowerCase()),
    );

  return (
    <AdminShell
      title="Journal"
      maxWidth="1100px"
      action={
        <Link
          href="/admin/journal/new"
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
          <Plus size={14} /> New entry
        </Link>
      }
    >
      {/* Search + type filter */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{ position: "relative", flex: "1 1 280px", maxWidth: "360px" }}
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
            placeholder="Search entries by title or place…"
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

        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {types.map((type) => {
            const active = activeType === type;
            const colour = type === "All" ? PETROL : TYPE_COLOURS[type] || CLAY;
            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                style={{
                  background: active ? colour : "transparent",
                  border: `1px solid ${active ? colour : RULE}`,
                  color: active ? BG : FAINT,
                  padding: "0.4rem 0.9rem",
                  fontSize: "0.74rem",
                  cursor: "pointer",
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
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
          Loading entries…
        </p>
      ) : filtered.length > 0 ? (
        <div>
          <div style={{ borderTop: `1px solid ${RULE}` }} />
          {filtered.map((entry) => (
            <EntryRow key={entry.slug} entry={entry} onDelete={handleDelete} />
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
            {query || activeType !== "All"
              ? "No entries match your filters."
              : "No journal entries yet."}
          </p>
          {!query && activeType === "All" && (
            <Link
              href="/admin/journal/new"
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
              <Plus size={12} /> Write your first entry
            </Link>
          )}
        </div>
      )}
    </AdminShell>
  );
}
