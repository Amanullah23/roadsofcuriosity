"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const card = {
  background: "var(--surface)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--rule)",
};

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = () => {
    setError("");
    if (!form.username || !form.password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);

    // Temporary hardcoded check — will connect to DB later
    setTimeout(() => {
      if (form.username === "admin" && form.password === "admin123") {
        localStorage.setItem("roc_admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect username or password.");
        setLoading(false);
      }
    }, 800);
  };

  const inputStyle = (name) => ({
    width: "100%",
    background: "var(--bg)",
    border: "1px solid",
    borderColor: focused === name ? "var(--accent)" : "var(--rule)",
    borderRadius: "8px",
    color: "var(--ink)",
    padding: "0.85rem 1rem",
    fontSize: "0.88rem",
    fontFamily: "'Cormorant Garamond', serif",
    outline: "none",
    transition: "border-color 0.2s ease",
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "3rem auto 1rem",
            }}
          >
            <Lock size={20} color="#fff" />
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
              marginBottom: "0.4rem",
            }}
          >
            Admin Panel
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.88rem",
              color: "var(--ink-faint)",
            }}
          >
            Roads of Curiosity
          </p>
        </div>

        {/* Login card */}
        <div style={{ ...card, padding: "2rem" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            {/* Username */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.62rem",
                  color: "var(--ink-faint)",
                  fontWeight: 300,
                  letterSpacing: "0.06em",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Enter username"
                style={inputStyle("username")}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {/* Password */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.62rem",
                  color: "var(--ink-faint)",
                  fontWeight: 300,
                  letterSpacing: "0.06em",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Enter password"
                  style={{ ...inputStyle("password"), paddingRight: "3rem" }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "0.85rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--ink-faint)",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--ink)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--ink-faint)")
                  }
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  background:
                    "color-mix(in srgb, var(--accent) 8%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    color: "var(--accent)",
                    fontWeight: 300,
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                padding: "0.9rem 2rem",
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                opacity: loading ? 0.7 : 1,
                transition: "opacity 0.2s ease",
                width: "100%",
                marginTop: "0.4rem",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.opacity = "1";
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.75rem",
            color: "var(--ink-faint)",
            textAlign: "center",
            opacity: 0.6,
          }}
        >
          This area is restricted to the site owner.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
