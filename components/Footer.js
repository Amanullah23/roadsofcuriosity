"use client";

// Roads of Curiosity — Footer (new visual system)
// Target: components/Footer.js
//
// A deliberate dark close: petrol used as a bold full-bleed surface
// rather than a thin accent, the one strong contrast moment the
// whole page has been building toward.

import { useState, useEffect } from "react";
import Link from "next/link";
import { getContactInfo } from "@/lib/api";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const RULE = "rgba(244,238,227,0.18)";
const FAINT = "rgba(244,238,227,0.55)";

// Falls back to this if /api/contact-info isn't reachable. These are the
// same social links as before — now editable from Admin → Contact, and
// shared with the public Contact page so both stay in sync.
const DEFAULT_CONTACT_INFO = {
  instagram_url: "https://instagram.com",
  facebook_url: "https://facebook.com",
  whatsapp: "",
};

const socialIcons = {
  Instagram: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M14 8.5h-1.6c-.9 0-1.4.5-1.4 1.4V11h3l-.4 2.6h-2.6V20" />
    </svg>
  ),
  WhatsApp: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path
        d="M8.5 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.8.1.1.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.1.6.2.3.8 1.2 1.7 1.9 1.1.9 1.9 1.1 2.2 1.3.3.1.4.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.6.7 1.8.9.2.1.4.2.4.3.1.3.1.8-.1 1.3-.3.5-1.4 1-2 1-.5 0-1.8-.2-3.5-1.4-1.9-1.4-3.2-3.2-3.4-3.5-.2-.3-1-1.3-1-2.5 0-1.1.6-1.7.8-2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
};

const columns = [
  {
    heading: "Follow the road",
    links: [
      { label: "Stories", href: "/stories" },
      { label: "Journal", href: "/journal" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "The photographer",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const [info, setInfo] = useState(DEFAULT_CONTACT_INFO);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getContactInfo();
        if (data && Object.keys(data).length > 0) {
          setInfo((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // keep DEFAULT_CONTACT_INFO
      }
    };
    init();
  }, []);

  const socials = [
    info.instagram_url && { label: "Instagram", href: info.instagram_url },
    info.facebook_url && { label: "Facebook", href: info.facebook_url },
    info.whatsapp && {
      label: "WhatsApp",
      href: `https://wa.me/${info.whatsapp.replace(/[^\d]/g, "")}`,
    },
  ].filter(Boolean);

  return (
    <footer style={{ background: PETROL, color: BG }}>
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "5rem 2rem 2.5rem",
        }}
      >
        {/* Top: wordmark + closing line */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "3.5rem",
            borderBottom: `1px solid ${RULE}`,
          }}
          className="roc-footer-grid"
        >
          <div>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontOpticalSizing: "auto",
                fontWeight: 500,
                fontSize: "1.7rem",
                display: "block",
                marginBottom: "1.1rem",
                color: BG,
              }}
            >
              Roads{" "}
              <span
                style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}
              >
                of Curiosity
              </span>
            </span>
            <p
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: FAINT,
                maxWidth: "360px",
              }}
            >
              A photographer's notebook, kept open on the road — every page a
              place that asked to be looked at twice.
            </p>
            <div
              style={{ display: "flex", gap: "0.9rem", marginTop: "1.75rem" }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: `1px solid ${RULE}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: BG,
                    transition: "border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.color = GOLD;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = RULE;
                    e.currentTarget.style.color = BG;
                  }}
                >
                  {socialIcons[s.label]}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.78rem",
                  color: FAINT,
                  marginBottom: "1.1rem",
                }}
              >
                {col.heading}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {col.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.92rem",
                      color: BG,
                      textDecoration: "none",
                      width: "fit-content",
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.2s ease, color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = GOLD;
                      e.currentTarget.style.color = GOLD;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.color = BG;
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            paddingTop: "1.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.78rem",
              color: FAINT,
            }}
          >
            © {new Date().getFullYear()} Roads of Curiosity
          </p>
          <a
            href="https://yawari.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(244,238,227,0.3)",
              textDecoration: "none",
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CLAY)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(244,238,227,0.3)")
            }
          >
            Designed &amp; developed by Amanullah Yawari
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .roc-footer-grid { grid-template-columns: 1fr !important; gap: 2.25rem !important; }
        }
      `}</style>
    </footer>
  );
}
