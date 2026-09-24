"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  Phone,
  Camera,
  Play,
  ArrowRight,
} from "lucide-react";

const card = {
  background: "var(--surface)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--rule)",
};

const accentBox = {
  width: "28px",
  height: "28px",
  borderRadius: "7px",
  background: "var(--accent)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const inputStyle = (name) => ({
    width: "100%",
    background: "var(--bg)",
    border: "1px solid",
    borderColor: focused === name ? "var(--accent)" : "var(--rule)",
    borderRadius: "8px",
    color: "var(--ink)",
    padding: "0.8rem 1rem",
    fontSize: "0.85rem",
    fontFamily: "'Cormorant Garamond', serif",
    outline: "none",
    transition: "border-color 0.2s ease",
    resize: "none",
  });

  return (
    <main
      style={{
        paddingTop: "56px",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* Page header */}
      <section
        style={{
          padding: "3.5rem 2.5rem 1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              ...accentBox,
              width: "32px",
              height: "32px",
              borderRadius: "8px",
            }}
          >
            <Mail size={15} color="#fff" />
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              color: "var(--accent)",
              fontWeight: 400,
            }}
          >
            get in touch
          </p>
        </div>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 400,
            color: "var(--ink)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Contact
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--ink-faint)",
            lineHeight: 1.7,
            maxWidth: "480px",
          }}
        >
          Whether you want to collaborate, license a photograph, or simply say
          hello — I would love to hear from you.
        </p>
      </section>

      <div
        style={{
          padding: "0.5rem 2.5rem 6rem",
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {/* ── Row 1: Contact info + Form ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0.75rem",
            alignItems: "start",
          }}
        >
          {/* Left — Contact info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {/* Direct contact card */}
            <div style={{ ...card, padding: "1.8rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={accentBox}>
                  <Mail size={13} color="#fff" />
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  Direct Contact
                </h2>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    icon: <Mail size={14} color="var(--accent)" />,
                    label: "Email",
                    value: "hello@roadsofcuriosity.com",
                    href: "mailto:hello@roadsofcuriosity.com",
                  },
                  {
                    icon: <Phone size={14} color="var(--accent)" />,
                    label: "WhatsApp",
                    value: "+93 700 000 000",
                    href: "https://wa.me/93700000000",
                  },
                  {
                    icon: <MapPin size={14} color="var(--accent)" />,
                    label: "Location",
                    value: "Kabul, Afghanistan",
                    href: null,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.85rem",
                      padding: "1rem",
                      background: "var(--bg)",
                      borderRadius: "10px",
                      border: "1px solid var(--rule)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background:
                          "color-mix(in srgb, var(--accent) 10%, transparent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.2rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.6rem",
                          color: "var(--ink-faint)",
                          fontWeight: 300,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "0.95rem",
                            color: "var(--ink)",
                            fontWeight: 400,
                            transition: "color 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--accent)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--ink)")
                          }
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "0.95rem",
                            color: "var(--ink)",
                            fontWeight: 400,
                          }}
                        >
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links card */}
            <div style={{ ...card, padding: "1.8rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={accentBox}>
                  <Camera size={13} color="#fff" />
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  Follow Along
                </h2>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[
                  {
                    icon: <Camera size={15} color="var(--accent)" />,
                    name: "Instagram",
                    handle: "@roadsofcuriosity",
                    href: "https://instagram.com",
                    desc: "Daily photos and behind the scenes",
                  },
                  {
                    icon: <Play size={15} color="var(--accent)" />,
                    name: "YouTube",
                    handle: "Roads of Curiosity",
                    href: "https://youtube.com",
                    desc: "Travel films and photo essays",
                  },
                  {
                    icon: <Send size={15} color="var(--accent)" />,
                    name: "Telegram",
                    handle: "@roadsofcuriosity",
                    href: "https://t.me",
                    desc: "Updates and exclusive content",
                  },
                  {
                    icon: <Mail size={15} color="var(--accent)" />,
                    name: "Newsletter",
                    handle: "Subscribe free",
                    href: "#",
                    desc: "Monthly dispatches from the road",
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.9rem 1rem",
                      background: "var(--bg)",
                      borderRadius: "10px",
                      border: "1px solid var(--rule)",
                      transition: "border-color 0.2s ease",
                      gap: "1rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--rule)")
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background:
                            "color-mix(in srgb, var(--accent) 10%, transparent)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {s.icon}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.1rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "0.92rem",
                            fontWeight: 400,
                            color: "var(--ink)",
                          }}
                        >
                          {s.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.6rem",
                            color: "var(--ink-faint)",
                            fontWeight: 300,
                          }}
                        >
                          {s.desc}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "0.15rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.6rem",
                          color: "var(--accent)",
                          fontWeight: 400,
                        }}
                      >
                        {s.handle}
                      </span>
                      <ArrowRight size={12} color="var(--accent)" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div style={{ ...card, padding: "1.8rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={accentBox}>
                <Send size={13} color="#fff" />
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                }}
              >
                Send a Message
              </h2>
            </div>

            {sent ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  padding: "3rem 1rem",
                  textAlign: "center",
                  background: "var(--bg)",
                  borderRadius: "10px",
                  border: "1px solid var(--rule)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Send size={20} color="#fff" />
                </div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  Message sent.
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    color: "var(--ink-faint)",
                    lineHeight: 1.7,
                    maxWidth: "280px",
                  }}
                >
                  Thank you for reaching out. I will be in touch within 2–3
                  days.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Name + Email row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                  }}
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
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.62rem",
                        color: "var(--ink-faint)",
                        fontWeight: 300,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      style={inputStyle("name")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
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
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.62rem",
                        color: "var(--ink-faint)",
                        fontWeight: 300,
                        letterSpacing: "0.06em",
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
                      style={inputStyle("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      color: "var(--ink-faint)",
                      fontWeight: 300,
                      letterSpacing: "0.06em",
                    }}
                  >
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    style={{
                      ...inputStyle("subject"),
                      cursor: "pointer",
                    }}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="">Select a subject…</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="licensing">Photo Licensing</option>
                    <option value="commission">Commission Work</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Just saying hello</option>
                  </select>
                </div>

                {/* Message */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      color: "var(--ink-faint)",
                      fontWeight: 300,
                      letterSpacing: "0.06em",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What would you like to say?"
                    rows={7}
                    style={inputStyle("message")}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "0.85rem 2rem",
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "opacity 0.2s ease",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Send Message <Send size={14} />
                </button>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.78rem",
                    color: "var(--ink-faint)",
                    textAlign: "center",
                    lineHeight: 1.6,
                  }}
                >
                  I respond within 2–3 days. For urgent matters, reach out via
                  WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Row 2: Map / Location card ── */}
        <div style={{ ...card, padding: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.5rem",
            }}
          >
            <div style={accentBox}>
              <MapPin size={13} color="#fff" />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem",
                fontWeight: 400,
                color: "var(--ink)",
              }}
            >
              Where I Am
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {/* Map placeholder */}
            <div
              style={{
                gridColumn: "span 2",
                height: "200px",
                background: "var(--bg)",
                borderRadius: "10px",
                border: "1px solid var(--rule)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <MapPin size={28} color="var(--rule)" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  color: "var(--ink-faint)",
                }}
              >
                Kabul, Afghanistan
              </span>
            </div>

            {[
              { label: "Based in", value: "Kabul, Afghanistan" },
              { label: "Time zone", value: "AFT — UTC+4:30" },
              { label: "Available for", value: "Remote & On-location" },
              { label: "Response time", value: "2–3 business days" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg)",
                  borderRadius: "10px",
                  border: "1px solid var(--rule)",
                  padding: "1rem 1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    color: "var(--ink-faint)",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 3: Availability banner ── */}
        <div
          style={{
            ...card,
            padding: "1.5rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            borderColor: "color-mix(in srgb, var(--accent) 30%, var(--rule))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#4caf7d",
                boxShadow:
                  "0 0 0 3px color-mix(in srgb, #4caf7d 20%, transparent)",
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                }}
              >
                Currently available for new projects
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  color: "var(--ink-faint)",
                  fontWeight: 300,
                  marginTop: "0.15rem",
                }}
              >
                Commissions · Collaborations · Photo Licensing · Editorial work
              </p>
            </div>
          </div>
          <a
            href="mailto:hello@roadsofcuriosity.com"
            style={{
              padding: "0.65rem 1.5rem",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "0.72rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "opacity 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Mail size={13} /> Email directly
          </a>
        </div>
      </div>
    </main>
  );
}
