"use client";

// Roads of Curiosity — Admin: Settings (new visual system: "The Route")
// Target: app/admin/settings/page.js
// Light only — the Appearance/dark-mode card is gone entirely; there is
// nothing left to toggle, since the whole admin panel is light-only now.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, AlertCircle, LogOut } from "lucide-react";
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
import { changePassword } from "@/lib/api";

// ─── Settings card (section wrapper) ───────────────────────────────────────────
function SettingsCard({ title, description, children }) {
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
      <div style={{ padding: "1.75rem" }}>{children}</div>
    </div>
  );
}

// ─── Password section ──────────────────────────────────────────────────────────
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

// ─── Account info section ──────────────────────────────────────────────────────
function AccountSection() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("roc_admin");
    setUsername(stored || "Admin");
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          background: PETROL,
          color: BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: "1.15rem",
          flexShrink: 0,
        }}
      >
        {username ? username.charAt(0).toUpperCase() : "A"}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "1rem",
            color: INK,
            marginBottom: "0.2rem",
          }}
        >
          {username || "Admin"}
        </p>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.8rem",
            color: FAINT,
          }}
        >
          Roads of Curiosity administrator
        </p>
      </div>
    </div>
  );
}

// ─── Session section ────────────────────────────────────────────────────────────
function SessionSection() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const handleSignOut = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    localStorage.removeItem("roc_admin");
    localStorage.removeItem("roc_token");
    router.push("/admin");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "0.94rem",
            color: INK,
            marginBottom: "0.3rem",
          }}
        >
          Sign out of this session
        </p>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.8rem",
            color: FAINT,
          }}
        >
          You'll need your username and password to sign back in.
        </p>
      </div>
      <button
        onClick={handleSignOut}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.65rem 1.4rem",
          background: confirming ? CLAY : "transparent",
          color: confirming ? BG : CLAY,
          border: `1px solid ${CLAY}`,
          cursor: "pointer",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.78rem",
          fontWeight: 600,
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
      >
        <LogOut size={14} /> {confirming ? "Click to confirm" : "Sign out"}
      </button>
    </div>
  );
}

// ─── Admin settings page ────────────────────────────────────────────────────────
export default function AdminSettingsPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const auth =
      localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
    if (!auth) {
      router.push("/admin");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <AdminShell title="Settings" maxWidth="720px">
      <SettingsCard title="Account">
        <AccountSection />
      </SettingsCard>

      <SettingsCard
        title="Password"
        description="Change the password used to sign in to this admin panel."
      >
        <PasswordSection />
      </SettingsCard>

      <SettingsCard title="Session">
        <SessionSection />
      </SettingsCard>
    </AdminShell>
  );
}
