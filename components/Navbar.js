"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import SearchOverlay from "./Search";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home", num: "i" },
  { href: "/gallery", label: "Gallery", num: "ii" },
  { href: "/stories", label: "Stories", num: "iii" },
  { href: "/about", label: "About", num: "iv" },
  { href: "/contact", label: "Contact", num: "v" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const color = theme === "dark" ? "#e8e4de" : "#1a1a1a";
  const subtle =
    theme === "dark" ? "rgba(232,228,222,0.3)" : "rgba(26,26,26,0.3)";
  const bg = theme === "dark" ? "#0a0a0a" : "#fafaf8";
  const mobileBg = theme === "dark" ? "#0d0d0b" : "#fafaf8";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
          background: scrolled ? bg : "transparent",
          borderBottom: scrolled
            ? `1px solid ${subtle}`
            : "1px solid transparent",
          transition: "background 0.5s ease, border-color 0.5s ease",
        }}
      >
        {/* Brand — italic serif, left */}
        <Link
          href="/"
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "1rem",
            fontWeight: 400,
            color,
            letterSpacing: "0.01em",
          }}
        >
          Roads of Curiosity
        </Link>

        {/* Desktop nav — right aligned */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.8rem",
          }}
          className="desktop-nav"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                  color,
                  opacity: active ? 1 : 0.38,
                  transition: "opacity 0.2s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = active ? "1" : "0.38")
                }
              >
                {/* Roman numeral */}
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.65rem",
                    opacity: 0.5,
                    lineHeight: 1,
                    marginTop: "1px",
                  }}
                >
                  {link.num}
                </span>

                {/* Label */}
                <span
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {link.label}
                </span>

                {/* Active dot */}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-18px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: color,
                      opacity: 0.6,
                    }}
                  />
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "16px",
              background: subtle,
            }}
          />

          {/* Search */}
          {/* Search */}
          <SearchOverlay />

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "16px",
              background: subtle,
            }}
          />

          {/* Theme toggle */}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color,
              opacity: 0.45,
              display: "flex",
              alignItems: "center",
              padding: 0,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile right side */}
        <div
          style={{ display: "none", alignItems: "center", gap: "1.2rem" }}
          className="mobile-right"
        >
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color,
              opacity: 0.5,
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Hamburger — two lines style */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "4px 0",
            }}
            aria-label="Open menu"
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: color,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: color,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            <span
              style={{
                display: "block",
                width: "14px",
                height: "1px",
                background: color,
                transition: "transform 0.3s ease, width 0.3s ease",
                transform: menuOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
                width: menuOpen ? "22px" : "14px",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay — slides from right */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          zIndex: 200,
          background: mobileBg,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 2.5rem",
        }}
      >
        {/* Close */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: "1.4rem",
            right: "2.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color,
            fontFamily: "Georgia, serif",
            fontSize: "0.78rem",
            opacity: 0.5,
            letterSpacing: "0.05em",
          }}
        >
          close
        </button>

        {/* Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  padding: "1.2rem 0",
                  borderBottom: `1px solid ${subtle}`,
                  textDecoration: "none",
                  opacity: active ? 1 : 0.35,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = active ? "1" : "0.35")
                }
              >
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.75rem",
                    color,
                    opacity: 0.4,
                    minWidth: "20px",
                  }}
                >
                  {link.num}
                </span>
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color,
                    lineHeight: 1.2,
                  }}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom info */}
        <p
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "2.5rem",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.72rem",
            color,
            opacity: 0.25,
          }}
        >
          Roads of Curiosity
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-right { display: flex !important; }
        }
      `}</style>
    </>
  );
}
