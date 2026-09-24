"use client";

export default function Footer() {
  const links = [
    { label: "Stories", href: "/stories" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  const socials = [
    { label: "Instagram", href: "#" },
    { label: "Email", href: "mailto:rik@roadsofcuriosity.com" },
  ];

  return (
    <footer style={{ padding: "0 2.5rem 3rem", marginTop: "5rem" }}>
      {/* Top rule with year */}
      <div
        style={{
          position: "relative",
          borderTop: "1px solid var(--rule)",
          marginBottom: "2.5rem",
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
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "0.7rem",
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
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {/* Brand */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.95rem",
              color: "var(--ink)",
              fontWeight: 400,
            }}
          >
            Roads of Curiosity
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              color: "var(--ink-faint)",
              fontWeight: 300,
            }}
          >
            Photography & stories by Rik Alexander Nelissen
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "0.75rem",
              color: "var(--ink-faint)",
              marginTop: "0.4rem",
              opacity: 0.6,
              maxWidth: "240px",
              lineHeight: 1.6,
            }}
          >
            "Every road ends somewhere beautiful."
          </span>
        </div>

        {/* Nav links */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              color: "var(--ink-faint)",
              fontWeight: 400,
              letterSpacing: "0.1em",
              marginBottom: "0.2rem",
            }}
          >
            NAVIGATE
          </span>
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "var(--ink-faint)",
                fontWeight: 300,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--ink-faint)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              color: "var(--ink-faint)",
              fontWeight: 400,
              letterSpacing: "0.1em",
              marginBottom: "0.2rem",
            }}
          >
            CONNECT
          </span>
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "var(--ink-faint)",
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
          <a
            href="https://ariana-expeditions.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              color: "var(--petrol)",
              fontWeight: 300,
              transition: "opacity 0.2s ease",
              marginTop: "0.4rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Ariana Expeditions ↗
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        style={{
          borderTop: "1px solid var(--rule)",
          paddingTop: "1.5rem",
          marginTop: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            color: "var(--ink-faint)",
            fontWeight: 300,
          }}
        >
          © {new Date().getFullYear()} Rik Alexander Nelissen. All rights
          reserved.
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            color: "var(--ink-faint)",
            fontWeight: 300,
            opacity: 0.5,
          }}
        >
          Photography · Stories · Travel
        </span>
      </div>
    </footer>
  );
}
