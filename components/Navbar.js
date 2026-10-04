"use client";

// Roads of Curiosity — Navbar (new visual system)
// Target: components/Navbar.js

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

const links = [
  { href: "/stories", label: "Stories" },
  { href: "/journal", label: "Journal" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const traced = active || hovered;
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: "0.92rem",
        fontWeight: 500,
        color: active ? PETROL : INK,
        textDecoration: "none",
        padding: "0.3rem 0",
      }}
    >
      {label}
      <svg
        width="100%"
        height="6"
        viewBox="0 0 60 6"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          bottom: "-4px",
          width: "100%",
          height: "6px",
        }}
      >
        <path
          d="M1,3 C12,0.5 22,5.5 30,2.5 C38,-0.5 48,5 59,2"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.6"
          strokeDasharray="70"
          strokeDashoffset={traced ? 0 : 70}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: BG,
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        <div
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            padding: "1.1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "baseline",
              gap: "0.4em",
            }}
          >
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontOpticalSizing: "auto",
                fontWeight: 560,
                fontSize: "1.3rem",
                color: INK,
                letterSpacing: "-0.01em",
              }}
            >
              Roads
            </span>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.02rem",
                color: CLAY,
              }}
            >
              of Curiosity
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            className="roc-nav-links"
            style={{ display: "flex", alignItems: "center", gap: "2.1rem" }}
          >
            {links.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                label={l.label}
                active={
                  pathname === l.href || pathname?.startsWith(l.href + "/")
                }
              />
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: INK,
                display: "flex",
              }}
            >
              <Search size={18} strokeWidth={1.6} />
            </button>
            <button
              className="roc-hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: INK,
              }}
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: BG,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "1.3rem 1.75rem",
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: INK,
              }}
            >
              <X size={24} />
            </button>
          </div>
          <nav
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1.6rem",
              padding: "0 2.5rem 4rem",
            }}
          >
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontOpticalSizing: "auto",
                  fontWeight: 480,
                  fontSize: "clamp(2.1rem, 9vw, 3rem)",
                  color: pathname === l.href ? PETROL : INK,
                  textDecoration: "none",
                  lineHeight: 1.15,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(41,45,43,0.4)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "14vh 1.5rem 0",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "640px",
              background: BG,
              padding: "2rem",
              border: `1px solid ${RULE}`,
            }}
          >
            <input
              autoFocus
              placeholder="Search stories, places, journal entries…"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.4rem",
                color: INK,
                borderBottom: `1px solid ${RULE}`,
                paddingBottom: "0.75rem",
              }}
            />
            <p
              style={{
                marginTop: "1rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.8rem",
                color: FAINT,
              }}
            >
              Press Escape or click outside to close.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        @media (max-width: 860px) {
          .roc-nav-links { display: none !important; }
          .roc-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
