"use client";

// Roads of Curiosity — Admin: Journal editor (new visual system: "The Route")
// Target: app/admin/journal/[slug]/page.js
// Light only — shares AdminShell with the rest of the admin panel.

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";
import AdminShell, {
  PETROL,
  CLAY,
  GOLD,
  BG,
  SURFACE,
  INK,
  FAINT,
  RULE,
  inputStyle,
  labelStyle,
  focusHandlers,
} from "@/components/admin/AdminShell";
import { entries as initialEntries } from "@/lib/data";
import {
  getJournalEntry,
  createJournalEntry,
  updateJournalEntry,
} from "@/lib/api";

const TYPE_COLOURS = { Encounter: PETROL, Note: CLAY, Discovery: GOLD };
const emptyEntry = {
  slug: "",
  title: "",
  place: "",
  date: "",
  type: "Note",
  body: "",
};

// ─── Journal editor page ────────────────────────────────────────────────────────
export default function JournalEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.slug === "new";

  const [mounted, setMounted] = useState(false);
  const [entry, setEntry] = useState(emptyEntry);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      setMounted(true);
      const auth =
        localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
      if (!auth) {
        router.push("/admin");
        return;
      }

      if (!isNew) {
        try {
          const data = await getJournalEntry(params.slug);
          if (data && data.slug) {
            setEntry(data);
          } else {
            const found = initialEntries.find((e) => e.slug === params.slug);
            if (found) setEntry(found);
          }
        } catch {
          const found = initialEntries.find((e) => e.slug === params.slug);
          if (found) setEntry(found);
        }
      }
    };
    init();
  }, [router, params.slug, isNew]);

  const handleField = (field, value) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) {
        await createJournalEntry(entry);
      } else {
        await updateJournalEntry(params.slug, entry);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) return null;

  const typeColour = TYPE_COLOURS[entry.type] || CLAY;

  const SaveButton = ({ small }) => (
    <button
      onClick={handleSave}
      disabled={saving}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: small ? "0.55rem 1.1rem" : "0.85rem 2rem",
        background: saved ? PETROL : INK,
        color: BG,
        border: "none",
        cursor: saving ? "wait" : "pointer",
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: small ? "0.75rem" : "0.8rem",
        fontWeight: 600,
        transition: "background 0.2s ease",
        opacity: saving ? 0.7 : 1,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!saved && !saving) e.currentTarget.style.background = CLAY;
      }}
      onMouseLeave={(e) => {
        if (!saving) e.currentTarget.style.background = saved ? PETROL : INK;
      }}
    >
      <Save size={small ? 13 : 14} />
      {saving ? "Saving…" : saved ? "Saved ✓" : "Save entry"}
    </button>
  );

  return (
    <AdminShell
      title={isNew ? "New entry" : "Edit entry"}
      maxWidth="800px"
      action={<SaveButton small />}
    >
      <Link
        href="/admin/journal"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.74rem",
          color: FAINT,
          textDecoration: "none",
          marginBottom: "2rem",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = PETROL)}
        onMouseLeave={(e) => (e.currentTarget.style.color = FAINT)}
      >
        <ArrowLeft size={12} /> All journal entries
      </Link>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            color: CLAY,
            fontWeight: 600,
          }}
        >
          Entry details
        </span>

        {/* Title + Slug */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
          className="field-row-2"
        >
          <div>
            <label style={labelStyle}>Title</label>
            <input
              value={entry.title}
              onChange={(e) => handleField("title", e.target.value)}
              placeholder="Entry title"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>Slug</label>
            <input
              value={entry.slug}
              onChange={(e) => handleField("slug", e.target.value)}
              placeholder="entry-slug-here"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
        </div>

        {/* Place + Date + Type */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
          }}
          className="field-row-3"
        >
          <div>
            <label style={labelStyle}>Place</label>
            <input
              value={entry.place}
              onChange={(e) => handleField("place", e.target.value)}
              placeholder="Kabul, Afghanistan"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input
              value={entry.date}
              onChange={(e) => handleField("date", e.target.value)}
              placeholder="June 12, 2024"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>Type</label>
            <select
              value={entry.type}
              onChange={(e) => handleField("type", e.target.value)}
              style={{
                ...inputStyle,
                cursor: "pointer",
                borderColor: typeColour,
                color: typeColour,
                fontWeight: 600,
              }}
            >
              <option value="Note">Note</option>
              <option value="Encounter">Encounter</option>
              <option value="Discovery">Discovery</option>
            </select>
          </div>
        </div>

        {/* Body */}
        <div>
          <label style={labelStyle}>Entry text</label>
          <textarea
            value={entry.body}
            onChange={(e) => handleField("body", e.target.value)}
            placeholder="Write your journal entry here… (separate paragraphs with a blank line)"
            rows={10}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 }}
            {...focusHandlers}
          />
        </div>

        {/* Preview */}
        {entry.body && (
          <div style={{ border: `1px solid ${RULE}`, background: SURFACE }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.75rem 1.25rem",
                borderBottom: `1px solid ${RULE}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.62rem",
                  color: FAINT,
                  fontWeight: 500,
                }}
              >
                Preview
              </span>
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.62rem",
                  color: typeColour,
                  border: `1px solid ${typeColour}`,
                  padding: "0.1rem 0.45rem",
                }}
              >
                {entry.type}
              </span>
            </div>
            <div style={{ padding: "2rem" }}>
              {entry.title && (
                <p
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 600,
                    fontSize: "1.3rem",
                    color: INK,
                    marginBottom: "1rem",
                  }}
                >
                  {entry.title}
                </p>
              )}
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontSize: "0.98rem",
                  color: FAINT,
                  lineHeight: 1.85,
                  whiteSpace: "pre-wrap",
                }}
              >
                {entry.body}
              </p>
            </div>
          </div>
        )}

        {/* Bottom actions */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: `1px solid ${RULE}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            href="/admin/journal"
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.78rem",
              color: FAINT,
              transition: "color 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
            onMouseLeave={(e) => (e.currentTarget.style.color = FAINT)}
          >
            ← Back without saving
          </Link>
          <SaveButton />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .field-row-2, .field-row-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminShell>
  );
}
