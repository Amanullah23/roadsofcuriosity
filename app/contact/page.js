"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { Send } from "lucide-react";

export default function Contact() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const color = theme === "dark" ? "#f0f0f0" : "#111";
  const subtle =
    theme === "dark" ? "rgba(240,240,240,0.35)" : "rgba(0,0,0,0.35)";
  const border =
    theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const inputBg =
    theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const focusBorder =
    theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // will connect to API later
    setSent(true);
  };

  const inputStyle = {
    width: "100%",
    background: inputBg,
    border: `1px solid ${border}`,
    color,
    padding: "0.9rem 1rem",
    fontSize: "0.88rem",
    fontFamily: "Georgia, serif",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ padding: "4rem 2.5rem 2.5rem" }}>
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            color: subtle,
            marginBottom: "1rem",
          }}
        >
          get in touch
        </p>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color,
            lineHeight: 1.1,
          }}
        >
          Contact
        </h1>
      </section>

      {/* Content */}
      <section
        style={{
          padding: "2rem 2.5rem 6rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "5rem",
          maxWidth: "900px",
        }}
      >
        {/* Left — info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.95rem",
              color,
              lineHeight: 1.9,
              opacity: 0.75,
            }}
          >
            Whether you want to collaborate, license a photograph, share a
            story, or simply say hello — I would love to hear from you.
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            {[
              { label: "Email", value: "hello@roadsofcuriosity.com" },
              { label: "Based in", value: "Kabul, Afghanistan" },
              {
                label: "Available for",
                value: "Commissions · Collaborations · Licensing",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: subtle,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ width: "40px", height: "1px", background: subtle }} />

          <p style={{ fontSize: "0.78rem", color: subtle, lineHeight: 1.7 }}>
            I try to respond within 2–3 days. For urgent matters, email
            directly.
          </p>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "3rem 2rem",
                border: `1px solid ${border}`,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.3rem",
                  color,
                }}
              >
                Thank you.
              </span>
              <p
                style={{ fontSize: "0.82rem", color: subtle, lineHeight: 1.7 }}
              >
                Your message has been received. I will be in touch soon.
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              onSubmit={handleSubmit}
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
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: subtle,
                  }}
                >
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = focusBorder)}
                  onBlur={(e) => (e.target.style.borderColor = border)}
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
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: subtle,
                  }}
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = focusBorder)}
                  onBlur={(e) => (e.target.style.borderColor = border)}
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
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: subtle,
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  rows={6}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = focusBorder)}
                  onBlur={(e) => (e.target.style.borderColor = border)}
                />
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.9rem 2rem",
                  background: color,
                  color: theme === "dark" ? "#0a0a0a" : "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  transition: "opacity 0.2s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Send Message <Send size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
