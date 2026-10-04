"use client";

// Roads of Curiosity — Admin: Profile (new visual system: "The Route")
// Target: app/admin/profile/page.js
// Light only — shares AdminShell with the rest of the admin panel.
//
// Reached by clicking the avatar circle in the top-right of every admin
// page. Holds the profile photo, display name and bio (stored in the new
// admin_profile table, keyed by username) plus password change (same form
// as Settings — kept there too for now; say if you'd rather it only live
// here).

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  User,
  Upload,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from "lucide-react";
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
  getProfile,
  updateProfile,
  uploadImage,
  changePassword,
  API_URL,
} from "@/lib/api";

function resolveUploadUrl(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const base = API_URL.replace(/\/api\/?$/, "");
  return `${base}${url}`;
}

// ─── Card (section wrapper) ─────────────────────────────────────────────────────
function Card({ title, description, children }) {
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

// ─── Circular photo uploader ────────────────────────────────────────────────────
function AvatarUploader({ value, onChange }) {
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
    <div
      style={{
        display: "flex",
        gap: "1.25rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: "88px",
          height: "88px",
          flexShrink: 0,
          borderRadius: "50%",
          background: SURFACE,
          border: `1px solid ${RULE}`,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value ? (
          <img
            src={value}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <User size={28} color={RULE} />
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
          {uploading ? "Uploading…" : "Upload photo"}
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
  );
}

// ─── Password section (same form as Settings) ───────────────────────────────────
function PasswordSection() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!current || !next || !confirm) {
      setError("Fill in all three fields.");
      return;
    }
    if (next.length < 6) {
      setError("New password should be at least 6 characters.");
      return;
    }
    if (next !== confirm) {
      setError("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    try {
      await changePassword(current, next);
      setSuccess(true);
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      setError(
        err?.message ||
          "Could not update the password. Check your current password and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Current password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showCurrent ? "text" : "password"}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            style={{ ...inputStyle, paddingRight: "2.75rem" }}
            {...focusHandlers}
          />
          <button
            type="button"
            onClick={() => setShowCurrent((s) => !s)}
            style={{
              position: "absolute",
              right: "0.7rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: FAINT,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Toggle password visibility"
          >
            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
        className="password-grid"
      >
        <div>
          <label style={labelStyle}>New password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showNext ? "text" : "password"}
              value={next}
              onChange={(e) => setNext(e.target.value)}
              style={{ ...inputStyle, paddingRight: "2.75rem" }}
              {...focusHandlers}
            />
            <button
              type="button"
              onClick={() => setShowNext((s) => !s)}
              style={{
                position: "absolute",
                right: "0.7rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: FAINT,
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Toggle password visibility"
            >
              {showNext ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Confirm new password</label>
          <input
            type={showNext ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
      </div>

      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            marginBottom: "1.25rem",
            background: "rgba(167,109,83,0.1)",
            border: `1px solid ${CLAY}`,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.82rem",
            color: CLAY,
          }}
        >
          <AlertCircle size={15} /> {error}
        </div>
      )}
      {success && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            marginBottom: "1.25rem",
            background: "rgba(41,75,74,0.08)",
            border: `1px solid ${PETROL}`,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.82rem",
            color: PETROL,
          }}
        >
          <Check size={15} /> Password updated.
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        style={{
          padding: "0.75rem 1.75rem",
          background: saving ? FAINT : PETROL,
          color: BG,
          border: "none",
          cursor: saving ? "default" : "pointer",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.78rem",
          fontWeight: 600,
          transition: "background 0.2s ease",
        }}
      >
        {saving ? "Saving…" : "Update password"}
      </button>

      <style>{`
        @media (max-width: 560px) {
          .password-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

// ─── Profile page ────────────────────────────────────────────────────────────────
export default function AdminProfilePage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState({
    display_name: "",
    bio: "",
    avatar_url: "",
  });
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
      const name = localStorage.getItem("roc_admin") || "Admin";
      setUsername(name);
      setChecked(true);

      try {
        const data = await getProfile(name);
        if (data && Object.keys(data).length > 0) {
          setProfile((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // nothing saved yet — keep the blank defaults
      }
    };
    init();
  }, [router]);

  const set = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(username, profile);
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
    <AdminShell title="Profile" maxWidth="720px" action={<SaveButton small />}>
      <Card
        title="Photo & details"
        description="Shown in the top-right of every admin page."
      >
        <AvatarUploader
          value={profile.avatar_url}
          onChange={(v) => set("avatar_url", v)}
        />

        <div>
          <label style={labelStyle}>Username</label>
          <input
            value={username}
            disabled
            style={{ ...inputStyle, color: FAINT, cursor: "not-allowed" }}
          />
        </div>

        <div>
          <label style={labelStyle}>Display name</label>
          <input
            value={profile.display_name || ""}
            onChange={(e) => set("display_name", e.target.value)}
            placeholder="How your name should appear"
            style={inputStyle}
            {...focusHandlers}
          />
        </div>

        <div>
          <label style={labelStyle}>Bio</label>
          <textarea
            value={profile.bio || ""}
            onChange={(e) => set("bio", e.target.value)}
            placeholder="A short line about you"
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            {...focusHandlers}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveButton />
        </div>
      </Card>

      <Card
        title="Password"
        description="Change the password used to sign in to this admin panel."
      >
        <PasswordSection />
      </Card>
    </AdminShell>
  );
}
