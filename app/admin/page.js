"use client";

// Roads of Curiosity — Admin login (new visual system: "The Route")
// Target: app/admin/page.js
//
// The one admin page a visitor might see — so it still carries the
// public brand (the split hero grammar, the photograph) rather than
// dropping straight into utilitarian tool chrome.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { loginAdmin } from "@/lib/api";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

const SIDE_IMAGE =
  "https://images.unsplash.com/photo-1650511503717-113b2459fd13?q=80&w=1400&auto=format&fit=crop";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 70);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Enter both your username and password.");
      return;
    }
    setLoading(true);
    try {
      const data = await loginAdmin(username, password);
      if (data && data.token) {
        localStorage.setItem("roc_token", data.token);
        localStorage.setItem("roc_admin", username);
        router.push("/admin/dashboard");
      } else {
        setError("That username or password isn’t right.");
      }
    } catch (err) {
      // Log the real error so it shows up in the browser console —
      // the message on screen stays simple, but you can see what
      // actually happened (network failure, 500, timeout, etc).
      console.error("Admin login failed:", err);

      const status = err?.status || err?.response?.status;
      if (status === 401 || status === 403) {
        setError("That username or password isn’t right.");
      } else if (status) {
        setError(
          `The server responded with an error (${status}). Check the backend logs.`,
        );
      } else if (
        err?.message?.toLowerCase().includes("fetch") ||
        err?.message?.toLowerCase().includes("network")
      ) {
        setError(
          "Couldn’t reach the server. Is the backend running and is NEXT_PUBLIC_API_URL pointing at it?",
        );
      } else {
        setError("That username or password isn’t right.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid",
    borderColor: focused === name ? PETROL : RULE,
    color: INK,
    padding: "0.7rem 0",
    fontSize: "0.98rem",
    fontFamily: "'Instrument Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease",
  });

  return (
    <main
      className="roc-admin-login"
      style={{ minHeight: "100vh", background: BG }}
    >
      <div
        className="roc-login-image"
        style={{ position: "relative", overflow: "hidden", background: "#ddd" }}
      >
        <img
          src={SIDE_IMAGE}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            clipPath: mounted ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
            transition: "clip-path 1.1s cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(23,26,24,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "2.5rem",
            bottom: "2.5rem",
            right: "2.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "1.3rem",
              color: BG,
              lineHeight: 1.4,
            }}
          >
            Every story starts here, before anyone else sees it.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 3rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "380px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "baseline",
              gap: "0.35em",
              marginBottom: "2.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 560,
                fontSize: "1.4rem",
                color: INK,
              }}
            >
              Roads
            </span>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.05rem",
                color: CLAY,
              }}
            >
              of Curiosity
            </span>
          </Link>

          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "1.7rem",
              color: INK,
              marginBottom: "0.5rem",
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.88rem",
              color: FAINT,
              marginBottom: "2.5rem",
              lineHeight: 1.6,
            }}
          >
            Sign in to manage stories, journal entries and photographs.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.74rem",
                  color: FAINT,
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                autoComplete="username"
                style={inputStyle("username")}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.74rem",
                  color: FAINT,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  autoComplete="current-password"
                  style={{ ...inputStyle("password"), paddingRight: "2rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: FAINT,
                    display: "flex",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = PETROL)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = FAINT)}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(167,109,83,0.1)",
                  border: `1px solid ${CLAY}`,
                  padding: "0.7rem 0.9rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.84rem",
                    color: CLAY,
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.5rem",
                background: PETROL,
                color: BG,
                border: "none",
                cursor: loading ? "wait" : "pointer",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 600,
                transition: "background 0.2s ease",
                opacity: loading ? 0.75 : 1,
                marginTop: "0.4rem",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = CLAY;
              }}
              onMouseLeave={(e) => (e.currentTarget.style.background = PETROL)}
            >
              {loading ? "Signing in…" : "Sign in"}{" "}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <div style={{ marginTop: "2.25rem" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.8rem",
                color: FAINT,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = PETROL)}
              onMouseLeave={(e) => (e.currentTarget.style.color = FAINT)}
            >
              <ArrowLeft size={13} /> Back to the site
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .roc-admin-login { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 860px) {
          .roc-admin-login { grid-template-columns: 1fr; }
          .roc-login-image { height: 32vh; }
        }
      `}</style>
    </main>
  );
}
