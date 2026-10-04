"use client";

// Roads of Curiosity — Admin: About page content (new visual system: "The Route")
// Target: app/admin/about/page.js
// Light only — shares AdminShell with the rest of the admin panel.
//
// Edits the hand-written copy on the public About page — the hero kicker,
// name, intro paragraph, tagline and portrait, the two "work" paragraphs,
// the list of places, and the pull quote.

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, Image as ImageIcon, Upload } from "lucide-react";
import AdminShell, {
  PETROL,
  CLAY,
  BG,
  SURFACE,
  INK,
  FAINT,
  RULE,
  inputStyle,
  labelStyle,
  focusHandlers,
} from "@/components/admin/AdminShell";
import {
  getAboutContent,
  updateAboutContent,
  uploadImage,
  API_URL,
} from "@/lib/api";

const DEFAULT_ABOUT = {
  kicker: "The photographer",
  name: "Rik Alexander Nelissen",
  intro:
    "He doesn't set out to photograph a place. He sets out to sit with it — the camera comes along for whatever's left over once the tea is finished.",
  tagline: "Years on the road, more cups of tea than he's bothered to count",
  portrait_image:
    "https://images.unsplash.com/photo-1577632584998-56efd90c5a42?q=80&w=1200&auto=format&fit=crop",
  work_paragraph_1:
    "Roads of Curiosity started the way most honest projects do — without a plan. A camera that went everywhere he did, and a habit of writing down what happened before the photograph, not just what the photograph showed.",
  work_paragraph_2:
    "The stories and the notebook both come from the same roads. So far, those roads have run through:",
  quote:
    "I don't go looking for the photograph. I go looking for the conversation, and the photograph is what's left when it's over.",
  places: "Afghanistan, Iran, Java",
};

function resolveUploadUrl(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const base = API_URL.replace(/\/api\/?$/, "");
  return `${base}${url}`;
}

// ─── Section card ───────────────────────────────────────────────────────────────
function Section({ title, description, children }) {
  return (
    <div
      style={{
        border: `1px solid ${RULE}`,
        background: BG,
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{ padding: "1.5rem 1.75rem", borderBottom: `1px solid ${RULE}` }}
      >
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "1.1rem",
            color: INK,
            marginBottom: description ? "0.4rem" : 0,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "0.88rem",
              color: FAINT,
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div
        style={{
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Image field: paste a URL, or upload a file from disk ─────────────────────
function ImageField({ label, value, onChange }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { url } = await uploadImage(file);
      onChange(resolveUploadUrl(url));
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div
        style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            flexShrink: 0,
            background: SURFACE,
            border: `1px solid ${RULE}`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {value ? (
            <img
              src={value}
              alt=""
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
              <ImageIcon size={18} color={RULE} />
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload a file below"
            style={inputStyle}
            {...focusHandlers}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 0.9rem",
                background: SURFACE,
                border: `1px solid ${RULE}`,
                color: INK,
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                cursor: uploading ? "wait" : "pointer",
                opacity: uploading ? 0.7 : 1,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!uploading) e.currentTarget.style.background = BG;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = SURFACE;
              }}
            >
              <Upload size={13} />
              {uploading ? "Uploading…" : "Upload from computer"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            {error && (
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "#B3473E",
                }}
              >
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin about page editor ────────────────────────────────────────────────────
export default function AdminAboutPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [about, setAbout] = useState(DEFAULT_ABOUT);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      const auth =
        localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
      if (!auth) {
        router.push("/admin");
        return;
      }
      setChecked(true);

      try {
        const data = await getAboutContent();
        if (data && Object.keys(data).length > 0) {
          setAbout((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // keep the defaults shown above — same copy the live page falls back to
      }
    };
    init();
  }, [router]);

  const set = (field, value) => {
    setAbout((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAboutContent(about);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!checked) return null;

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
      {saving ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
    </button>
  );

  return (
    <AdminShell
      title="About page"
      maxWidth="760px"
      action={<SaveButton small />}
    >
      <p
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.84rem",
          color: FAINT,
          lineHeight: 1.7,
          marginBottom: "2rem",
          maxWidth: "640px",
        }}
      >
        This covers the hand-written copy on your About page — the hero
        introduction, the "work" paragraphs, the list of places, and the pull
        quote. The Ariana Expeditions cross-link and the closing navigation
        links stay fixed.
      </p>

      <Section
        title="Hero"
        description="The portrait and introduction at the top of the page."
      >
        <div>
          <label style={labelStyle}>Kicker (small label above the name)</label>
          <input
            value={about.kicker}
            onChange={(e) => set("kicker", e.target.value)}
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Name</label>
          <input
            value={about.name}
            onChange={(e) => set("name", e.target.value)}
            style={{ ...inputStyle, fontSize: "1.05rem" }}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Introduction</label>
          <textarea
            value={about.intro}
            onChange={(e) => set("intro", e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Tagline (next to the gold line)</label>
          <input
            value={about.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
        <ImageField
          label="Portrait image"
          value={about.portrait_image}
          onChange={(v) => set("portrait_image", v)}
        />
      </Section>

      <Section
        title="The work"
        description="The two paragraphs introducing the project, and the places it's covered so far."
      >
        <div>
          <label style={labelStyle}>First paragraph</label>
          <textarea
            value={about.work_paragraph_1}
            onChange={(e) => set("work_paragraph_1", e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Second paragraph</label>
          <textarea
            value={about.work_paragraph_2}
            onChange={(e) => set("work_paragraph_2", e.target.value)}
            rows={2}
            style={{ ...inputStyle, resize: "vertical" }}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>
            Places (comma-separated — each becomes a link to that place's
            stories)
          </label>
          <input
            value={about.places}
            onChange={(e) => set("places", e.target.value)}
            placeholder="Afghanistan, Iran, Java"
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
      </Section>

      <Section
        title="Pull quote"
        description="The one bold, dark moment on the page."
      >
        <textarea
          value={about.quote}
          onChange={(e) => set("quote", e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", fontStyle: "italic" }}
          {...focusHandlers}
        />
      </Section>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "0.5rem",
        }}
      >
        <SaveButton />
      </div>
    </AdminShell>
  );
}
