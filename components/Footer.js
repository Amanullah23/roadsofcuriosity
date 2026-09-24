"use client";

export default function Footer() {
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
      <div
        style={{
          position: "relative",
          borderTop: "1px solid var(--rule)",
          marginBottom: "2rem",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "-0.6rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--bg)",
            padding: "0 1rem",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.72rem",
            color: "var(--ink-faint)",
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          {new Date().getFullYear()}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "var(--ink-faint)",
          }}
        >
          Roads of Curiosity
        </span>

        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.78rem",
            color: "var(--ink-faint)",
            textAlign: "center",
            flex: 1,
            minWidth: "180px",
            opacity: 0.6,
          }}
        >
          "Every road ends somewhere beautiful."
        </span>

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
                fontSize: "0.72rem",
                color: "var(--ink-faint)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--ink-faint)")
              }
            >
              {s.label}
            </a>
          ))}

          <span
            style={{
              width: "1px",
              height: "12px",
              background: "var(--rule)",
              display: "inline-block",
            }}
          />

          <span
            style={{
              fontSize: "0.68rem",
              color: "var(--ink-faint)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
