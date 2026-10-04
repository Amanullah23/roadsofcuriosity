"use client";

// Roads of Curiosity — Admin: Home page content (new visual system: "The Route")
// Target: app/admin/home/page.js
// Light only — shares AdminShell with the rest of the admin panel.
//
// This edits the hand-written copy and placeholder images on the public
// home page that aren't already pulled from your stories/journal data —
// the hero headline, the exhibition break, the "about" teaser, and the
// newsletter block. The three featured stories and the journal preview on
// the home page still come from your actual Stories/Journal content.
//
// Each image field now supports two ways to set an image: paste a URL, or
// upload a file from your computer (sent to POST /api/upload, which saves
// it to the backend's uploads/ folder and serves it back as a URL).

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
  getHomeContent,
  updateHomeContent,
  uploadImage,
  API_URL,
} from "@/lib/api";

const DEFAULT_HOME = {
  hero_title: "Every road keeps something back until you stop and look.",
  hero_subtitle:
    "Photographs and field notes gathered on foot — kept by Rik Alexander Nelissen, one place, one conversation, one cup of tea at a time.",
  hero_cta_label: "Begin at the first mile",
  hero_fallback_image:
    "https://images.unsplash.com/photo-1650511503717-113b2459fd13?q=80&w=2000&auto=format&fit=crop",
  exhibition_caption: "Held still, for once.",
  exhibition_fallback_image:
    "https://images.unsplash.com/photo-1692825655700-96f8bfa68166?q=80&w=2000&auto=format&fit=crop",
  about_quote:
    "I don't go looking for the photograph. I go looking for the conversation, and the photograph is what's left when it's over.",
  about_byline:
    "Rik Alexander Nelissen — photographer and keeper of this notebook",
  about_image:
    "https://images.unsplash.com/photo-1577632584998-56efd90c5a42?q=80&w=1000&auto=format&fit=crop",
  newsletter_title: "Join the journey",
  newsletter_body:
    "A short note when there's a new story, a new photograph, or a place worth telling you about. Nothing more often than that.",
};

// Turns the relative path the backend returns (/uploads/foo.jpg) into a full
// URL that works from the Next.js app, which runs on a different origin.
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

// ─── An image field with two ways in: paste a URL, or upload from disk ─────────
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

// ─── Admin home page editor ────────────────────────────────────────────────────
export default function AdminHomePage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [home, setHome] = useState(DEFAULT_HOME);
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
        const data = await getHomeContent();
        if (data && Object.keys(data).length > 0) {
          setHome((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // keep the defaults shown above — same copy the live page falls back to
      }
    };
    init();
  }, [router]);

  const set = (field, value) => {
    setHome((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHomeContent(home);
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
      title="Home page"
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
        This covers the hand-written copy and images on the home page that
        aren't already pulled from your Stories and Journal — the headline, the
        exhibition break, the "about" teaser, and the newsletter block. Your
        three featured stories and journal preview on the home page come from
        Stories and Journal themselves.
      </p>

      <Section
        title="Hero"
        description="The first thing anyone sees — headline, subtitle, and the call-to-action text."
      >
        <div>
          <label style={labelStyle}>Headline</label>
          <textarea
            value={home.hero_title}
            onChange={(e) => set("hero_title", e.target.value)}
            rows={2}
            style={{ ...inputStyle, resize: "vertical", fontSize: "1.05rem" }}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Subtitle</label>
          <textarea
            value={home.hero_subtitle}
            onChange={(e) => set("hero_subtitle", e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Call-to-action label</label>
          <input
            value={home.hero_cta_label}
            onChange={(e) => set("hero_cta_label", e.target.value)}
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
        <ImageField
          label="Fallback hero image (used only until your first story has a cover photo)"
          value={home.hero_fallback_image}
          onChange={(v) => set("hero_fallback_image", v)}
        />
      </Section>

      <Section
        title="Exhibition break"
        description="The one full-width photograph break further down the page."
      >
        <div>
          <label style={labelStyle}>
            Caption (shown if your 3rd story has no title yet)
          </label>
          <input
            value={home.exhibition_caption}
            onChange={(e) => set("exhibition_caption", e.target.value)}
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
        <ImageField
          label="Fallback image (used only until your 3rd story has a cover photo)"
          value={home.exhibition_fallback_image}
          onChange={(v) => set("exhibition_fallback_image", v)}
        />
      </Section>

      <Section
        title="About the photographer"
        description="The teaser that links through to the full About page."
      >
        <div>
          <label style={labelStyle}>Pull quote</label>
          <textarea
            value={home.about_quote}
            onChange={(e) => set("about_quote", e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical", fontStyle: "italic" }}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Byline</label>
          <input
            value={home.about_byline}
            onChange={(e) => set("about_byline", e.target.value)}
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
        <ImageField
          label="Portrait image"
          value={home.about_image}
          onChange={(v) => set("about_image", v)}
        />
      </Section>

      <Section
        title="Newsletter"
        description="The sign-up block at the bottom of the page."
      >
        <div>
          <label style={labelStyle}>Heading</label>
          <input
            value={home.newsletter_title}
            onChange={(e) => set("newsletter_title", e.target.value)}
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Body text</label>
          <textarea
            value={home.newsletter_body}
            onChange={(e) => set("newsletter_body", e.target.value)}
            rows={2}
            style={{ ...inputStyle, resize: "vertical" }}
            {...focusHandlers}
          />
        </div>
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
