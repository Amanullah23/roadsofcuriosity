"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import SearchOverlay from "./Search";

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
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

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
          background: scrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--rule)"
            : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.05rem",
            color: "var(--ink)",
            letterSpacing: "0.02em",
          }}
        >
          Roads of Curiosity
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
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
                  alignItems: "baseline",
                  gap: "0.35rem",
                  color: active ? "var(--ink)" : "var(--ink-faint)",
                  fontSize: "0.75rem",
                  fontWeight: active ? 400 : 300,
                  letterSpacing: "0.05em",
                  fontFamily: "'Inter', sans-serif",
                  transition: "color 0.2s ease",
                  borderBottom: active
                    ? "1px solid var(--accent)"
                    : "1px solid transparent",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ink)")
                }
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = active
                    ? "var(--ink)"
                    : "var(--ink-faint)";
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.6rem",
                    opacity: 0.45,
                  }}
                >
                  {link.num}
                </span>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
          }}
        >
          <div className="desktop-nav">
            <SearchOverlay />
          </div>

          <div
            style={{
              width: "1px",
              height: "14px",
              background: "var(--rule)",
            }}
            className="desktop-nav"
          />

          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink-faint)",
              display: "flex",
              alignItems: "center",
              padding: 0,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--ink-faint)")
            }
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: "5px",
              padding: "4px 0",
            }}
            className="mobile-menu-btn"
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: "var(--ink)",
                transition: "transform 0.3s ease",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: "var(--ink)",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1px",
                background: "var(--ink)",
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

      {/* Mobile overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          zIndex: 200,
          background: "var(--bg)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 2.5rem",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: "1.4rem",
            right: "2.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--ink-faint)",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.85rem",
          }}
        >
          close
        </button>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          {links.map((link) => {
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
                  padding: "1.1rem 0",
                  borderBottom: "1px solid var(--rule)",
                  color: active ? "var(--ink)" : "var(--ink-faint)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ink)")
                }
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = active
                    ? "var(--ink)"
                    : "var(--ink-faint)";
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    opacity: 0.4,
                    minWidth: "18px",
                  }}
                >
                  {link.num}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.2rem",
                    fontWeight: 300,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <p
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "2.5rem",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.75rem",
            color: "var(--ink-faint)",
          }}
        >
          Roads of Curiosity
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
