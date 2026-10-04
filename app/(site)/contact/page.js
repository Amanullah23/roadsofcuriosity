"use client";

// Roads of Curiosity — Contact (new visual system: "The Route")
// Target: app/(site)/contact/page.js
//
// A destination, not a journey — no route line here. Just a clear
// way to reach him, laid out as a collision like the home hero.

import { useState, useEffect } from "react";
import { getContactInfo, submitContactMessage } from "@/lib/api";

const PETROL = "#294B4A";
const CLAY = "#A76D53";
const GOLD = "#C99A4E";
const BG = "#F4EEE3";
const INK = "#292D2B";
const FAINT = "#7A7D7B";
const RULE = "#D6CFC3";

// Falls back to this if /api/contact-info isn't reachable — same values as
// before, now editable from Admin → Contact.
const DEFAULT_CONTACT_INFO = {
  email: "hello@roadsofcuriosity.com",
  phone: "",
  whatsapp: "",
  reply_time: "A few days — slower when he's somewhere without signal",
  instagram_url: "https://instagram.com",
  facebook_url: "https://facebook.com",
  ariana_label: "Ariana Expeditions",
  ariana_url: "https://ariana-expeditions.com",
};

const socialIcons = {
  Instagram: (
    <svg
      width="16"
      height="16"
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
      width="16"
      height="16"
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
      width="16"
      height="16"
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

const fields = [
  { name: "name", label: "Your name", type: "text" },
  { name: "email", label: "Your email", type: "email" },
];

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [info, setInfo] = useState(DEFAULT_CONTACT_INFO);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactMessage(form);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const socials = [
    info.instagram_url && { label: "Instagram", href: info.instagram_url },
    info.facebook_url && { label: "Facebook", href: info.facebook_url },
    info.whatsapp && {
      label: "WhatsApp",
      href: `https://wa.me/${info.whatsapp.replace(/[^\d]/g, "")}`,
    },
  ].filter(Boolean);

  return (
    <main style={{ background: BG }}>
      <section className="roc-contact" style={{ minHeight: "88vh" }}>
        {/* ── Left: info ── */}
        <div
          className="roc-contact-left"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "7rem 2.5rem 3rem 2.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.8rem",
              color: CLAY,
              marginBottom: "1.1rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            Get in touch
          </p>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontOpticalSizing: "auto",
              fontWeight: 480,
              fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
              color: INK,
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              maxWidth: "460px",
              opacity: mounted ? 1 : 0,
              filter: mounted ? "blur(0px)" : "blur(12px)",
              transition: "opacity 1s ease, filter 1s ease",
            }}
          >
            Most journeys begin with a message.
          </h1>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.95rem",
              color: FAINT,
              lineHeight: 1.75,
              marginTop: "1.75rem",
              maxWidth: "400px",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.3s",
            }}
          >
            Prints, commissions, a story you think he should hear about, or just
            a question about a place — write in.
          </p>

          <div
            style={{
              marginTop: "3rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          >
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.74rem",
                color: FAINT,
                marginBottom: "0.4rem",
              }}
            >
              Email
            </p>
            <a
              href={`mailto:${info.email}`}
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "1.3rem",
                color: INK,
                textDecoration: "none",
                borderBottom: `1px solid ${RULE}`,
              }}
            >
              {info.email}
            </a>
          </div>

          {(info.phone || info.whatsapp) && (
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
                opacity: mounted ? 1 : 0,
                transition: "opacity 1s ease 0.55s",
              }}
            >
              {info.phone && (
                <div>
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.74rem",
                      color: FAINT,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${info.phone.replace(/[^\d+]/g, "")}`}
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.95rem",
                      color: INK,
                      textDecoration: "none",
                      borderBottom: `1px solid ${RULE}`,
                    }}
                  >
                    {info.phone}
                  </a>
                </div>
              )}
              {info.whatsapp && (
                <div>
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.74rem",
                      color: FAINT,
                      marginBottom: "0.4rem",
                    }}
                  >
                    WhatsApp
                  </p>
                  <a
                    href={`https://wa.me/${info.whatsapp.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.95rem",
                      color: INK,
                      textDecoration: "none",
                      borderBottom: `1px solid ${RULE}`,
                    }}
                  >
                    {info.whatsapp}
                  </a>
                </div>
              )}
            </div>
          )}

          <div
            style={{
              marginTop: "2.25rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.6s",
            }}
          >
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.74rem",
                color: FAINT,
                marginBottom: "0.6rem",
              }}
            >
              Usually replies within
            </p>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.9rem",
                color: INK,
              }}
            >
              {info.reply_time}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.85rem",
              marginTop: "2.5rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.7s",
            }}
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
                  color: INK,
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = CLAY;
                  e.currentTarget.style.color = CLAY;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = RULE;
                  e.currentTarget.style.color = INK;
                }}
              >
                {socialIcons[s.label]}
              </a>
            ))}
          </div>

          {info.ariana_url && (
            <div
              style={{
                marginTop: "2.75rem",
                paddingTop: "1.75rem",
                borderTop: `1px solid ${RULE}`,
                opacity: mounted ? 1 : 0,
                transition: "opacity 1s ease 0.8s",
                maxWidth: "400px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.74rem",
                  color: FAINT,
                  marginBottom: "0.5rem",
                }}
              >
                Also leading small groups through these same roads
              </p>
              <a
                href={info.ariana_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: CLAY,
                  textDecoration: "none",
                  borderBottom: `1px solid ${RULE}`,
                }}
              >
                {info.ariana_label || info.ariana_url}
              </a>
            </div>
          )}
        </div>

        {/* ── Right: the form ── */}
        <div
          className="roc-contact-right"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "3rem 2.5rem 4rem",
            background: "rgba(214,207,195,0.25)",
          }}
        >
          <div style={{ width: "100%", maxWidth: "440px" }}>
            {status === "sent" ? (
              <div>
                <p
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: "italic",
                    fontSize: "1.5rem",
                    color: PETROL,
                    marginBottom: "0.75rem",
                  }}
                >
                  Sent.
                </p>
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.88rem",
                    color: FAINT,
                  }}
                >
                  He'll read it, likely with tea in hand. More soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.75rem",
                }}
              >
                {fields.map((f) => (
                  <div key={f.name}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: "0.72rem",
                        color: FAINT,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      required
                      value={form[f.name]}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, [f.name]: e.target.value }))
                      }
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottom: `1px solid ${INK}`,
                        background: "transparent",
                        outline: "none",
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: "0.98rem",
                        color: INK,
                        padding: "0.5rem 0",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: FAINT,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Your message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, message: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: `1px solid ${INK}`,
                      background: "transparent",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.98rem",
                      color: INK,
                      padding: "0.5rem 0",
                      lineHeight: 1.6,
                    }}
                  />
                </div>
                {status === "error" && (
                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: CLAY,
                      marginTop: "-0.75rem",
                    }}
                  >
                    Something went wrong sending that — please try again in a
                    moment.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    alignSelf: "flex-start",
                    marginTop: "0.5rem",
                    background: "none",
                    border: "none",
                    cursor: status === "sending" ? "default" : "pointer",
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: PETROL,
                    padding: "0.5rem 0",
                    borderBottom: `2px solid ${GOLD}`,
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .roc-contact { display: grid; grid-template-columns: 1fr 0.9fr; }

        @media (max-width: 860px) {
          .roc-contact { grid-template-columns: 1fr; min-height: auto; }
          .roc-contact-left { padding: 3rem 1.5rem 2rem !important; }
          .roc-contact-right { padding: 2rem 1.5rem 4rem !important; }
        }
      `}</style>
    </main>
  );
}
