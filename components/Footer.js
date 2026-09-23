"use client";

import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  const color = theme === "dark" ? "#e8e4de" : "#1a1a1a";
  const subtle =
    theme === "dark" ? "rgba(232,228,222,0.25)" : "rgba(26,26,26,0.25)";
  const border =
    theme === "dark" ? "rgba(232,228,222,0.1)" : "rgba(26,26,26,0.1)";

  const socials = [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Email", href: "mailto:hello@roadsofcuriosity.com" },
  ];

  return (
    <footer
      style={{
        padding: "0 2.5rem 2.5rem",
        marginTop: "4rem",
      }}
    >
      {/* Year marker on top border */}
      <div
        style={{
          position: "relative",
          borderTop: `1px solid ${border}`,
          marginBottom: "2rem",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "-0.6rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: theme === "dark" ? "#0a0a0a" : "#fafaf8",
            padding: "0 1rem",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.7rem",
            color: subtle,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          {new Date().getFullYear()}
        </span>
      </div>

      {/* Single row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Brand */}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.88rem",
            color,
            opacity: 0.7,
            letterSpacing: "0.01em",
          }}
        >
          Roads of Curiosity
        </span>

        {/* Poetic center line */}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.75rem",
            color: subtle,
            textAlign: "center",
            flex: 1,
            minWidth: "180px",
          }}
        >
          "Every road ends somewhere beautiful."
        </span>

        {/* Right — socials + copyright */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.8rem",
          }}
        >
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
                color: subtle,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = color)}
              onMouseLeave={(e) => (e.currentTarget.style.color = subtle)}
            >
              {s.label}
            </a>
          ))}

          <span
            style={{
              width: "1px",
              height: "12px",
              background: border,
              display: "inline-block",
            }}
          />

          <span
            style={{
              fontSize: "0.68rem",
              color: subtle,
              fontFamily: "system-ui, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          .footer-center { display: none !important; }
        }
      `}</style>
    </footer>
  );
}
