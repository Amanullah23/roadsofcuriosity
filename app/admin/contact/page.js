"use client";

// Roads of Curiosity — Admin: Contact (new visual system: "The Route")
// Target: app/admin/contact/page.js
// Light only — shares AdminShell with the rest of the admin panel.
//
// Two things live here: the editable contact details shown on the public
// Contact page (email, phone, WhatsApp, reply-time note, socials, and the
// Ariana Expeditions reference), and the inbox of messages people have
// actually sent through that page's form — which, before this, went
// nowhere at all.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Mail, Trash2, User, Clock } from "lucide-react";
import AdminShell, {
  PETROL,
  CLAY,
  BG,
  SURFACE,
  INK,
  FAINT,
  RULE,
  inputStyle,
  labelStyle,
  focusHandlers,
} from "@/components/admin/AdminShell";
import {
  getContactInfo,
  updateContactInfo,
  getContactSubmissions,
  deleteContactSubmission,
} from "@/lib/api";

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

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return (
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " · " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  );
}

// ─── Section card ───────────────────────────────────────────────────────────────
function Section({ title, description, children }) {
  return (
    <div
      style={{
        border: `1px solid ${RULE}`,
        background: BG,
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{ padding: "1.5rem 1.75rem", borderBottom: `1px solid ${RULE}` }}
      >
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "1.1rem",
            color: INK,
            marginBottom: description ? "0.4rem" : 0,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "0.88rem",
              color: FAINT,
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div
        style={{
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── One inbox message ──────────────────────────────────────────────────────────
function MessageCard({ msg, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = async () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    setDeleting(true);
    await onDelete(msg.id);
  };

  return (
    <div
      style={{
        border: `1px solid ${RULE}`,
        padding: "1.25rem 1.5rem",
        opacity: deleting ? 0.4 : 1,
        transition: "opacity 0.2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          marginBottom: "0.6rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: "0.98rem",
              color: INK,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <User size={13} color={FAINT} /> {msg.name}
          </p>
          <a
            href={`mailto:${msg.email}`}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.78rem",
              color: PETROL,
              textDecoration: "none",
              borderBottom: `1px solid ${RULE}`,
            }}
          >
            {msg.email}
          </a>
        </div>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.7rem",
            color: FAINT,
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            flexShrink: 0,
          }}
        >
          <Clock size={11} /> {formatDate(msg.created_at)}
        </p>
      </div>

      <p
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "0.92rem",
          color: INK,
          lineHeight: 1.7,
          marginBottom: "1rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {msg.message}
      </p>

      <button
        onClick={handleDeleteClick}
        disabled={deleting}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.4rem 0.8rem",
          border: `1px solid ${confirming ? CLAY : RULE}`,
          background: confirming ? "rgba(167,109,83,0.1)" : "transparent",
          color: confirming ? CLAY : FAINT,
          cursor: "pointer",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.7rem",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!confirming) {
            e.currentTarget.style.borderColor = CLAY;
            e.currentTarget.style.color = CLAY;
          }
        }}
        onMouseLeave={(e) => {
          if (!confirming) {
            e.currentTarget.style.borderColor = RULE;
            e.currentTarget.style.color = FAINT;
          }
        }}
      >
        <Trash2 size={12} /> {confirming ? "Confirm delete?" : "Delete"}
      </button>
    </div>
  );
}

// ─── Admin contact page ─────────────────────────────────────────────────────────
export default function AdminContactPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const [info, setInfo] = useState(DEFAULT_CONTACT_INFO);
  const [savedInfo, setSavedInfo] = useState(false);
  const [savingInfo, setSavingInfo] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    const init = async () => {
      const auth =
        localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
      if (!auth) {
        router.push("/admin");
        return;
      }
      setChecked(true);

      try {
        const data = await getContactInfo();
        if (data && Object.keys(data).length > 0) {
          setInfo((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // keep defaults
      }

      try {
        const subs = await getContactSubmissions();
        setMessages(Array.isArray(subs) ? subs : []);
      } catch {
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };
    init();
  }, [router]);

  const set = (field, value) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
    setSavedInfo(false);
  };

  const handleSaveInfo = async () => {
    setSavingInfo(true);
    try {
      await updateContactInfo(info);
      setSavedInfo(true);
      setTimeout(() => setSavedInfo(false), 2000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSavingInfo(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteContactSubmission(id);
    } catch {
      // still remove locally
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  if (!checked) return null;

  return (
    <AdminShell title="Contact" maxWidth="760px">
      <Section
        title="Contact details"
        description="Shown on the public Contact page — fill in phone and WhatsApp to have them appear there."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.1rem",
          }}
          className="contact-form-row"
        >
          <div>
            <label style={labelStyle}>Email</label>
            <input
              value={info.email || ""}
              onChange={(e) => set("email", e.target.value)}
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>Reply time note</label>
            <input
              value={info.reply_time || ""}
              onChange={(e) => set("reply_time", e.target.value)}
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.1rem",
          }}
          className="contact-form-row"
        >
          <div>
            <label style={labelStyle}>Phone number</label>
            <input
              value={info.phone || ""}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+93 70 000 0000"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>WhatsApp number</label>
            <input
              value={info.whatsapp || ""}
              onChange={(e) => set("whatsapp", e.target.value)}
              placeholder="+93 70 000 0000"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
        </div>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.74rem",
            color: FAINT,
            marginTop: "-0.6rem",
          }}
        >
          Use the full international format (with country code) — it's used to
          build the WhatsApp chat link.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.1rem",
          }}
          className="contact-form-row"
        >
          <div>
            <label style={labelStyle}>Instagram URL</label>
            <input
              value={info.instagram_url || ""}
              onChange={(e) => set("instagram_url", e.target.value)}
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>Facebook URL</label>
            <input
              value={info.facebook_url || ""}
              onChange={(e) => set("facebook_url", e.target.value)}
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${RULE}`,
            paddingTop: "1.1rem",
            marginTop: "0.25rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              color: FAINT,
              marginBottom: "0.9rem",
            }}
          >
            ARIANA EXPEDITIONS REFERENCE
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.1rem",
            }}
            className="contact-form-row"
          >
            <div>
              <label style={labelStyle}>Label</label>
              <input
                value={info.ariana_label || ""}
                onChange={(e) => set("ariana_label", e.target.value)}
                style={inputStyle}
                {...focusHandlers}
              />
            </div>
            <div>
              <label style={labelStyle}>URL</label>
              <input
                value={info.ariana_url || ""}
                onChange={(e) => set("ariana_url", e.target.value)}
                style={inputStyle}
                {...focusHandlers}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "0.5rem",
          }}
        >
          <button
            onClick={handleSaveInfo}
            disabled={savingInfo}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.75rem 1.75rem",
              background: savedInfo ? PETROL : INK,
              color: BG,
              border: "none",
              cursor: savingInfo ? "wait" : "pointer",
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              transition: "background 0.2s ease",
              opacity: savingInfo ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!savedInfo && !savingInfo)
                e.currentTarget.style.background = CLAY;
            }}
            onMouseLeave={(e) => {
              if (!savingInfo)
                e.currentTarget.style.background = savedInfo ? PETROL : INK;
            }}
          >
            <Save size={13} />
            {savingInfo ? "Saving…" : savedInfo ? "Saved ✓" : "Save changes"}
          </button>
        </div>
      </Section>

      <Section
        title="Messages"
        description="Sent through the Contact page's form."
      >
        {loadingMessages ? (
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: FAINT,
            }}
          >
            Loading messages…
          </p>
        ) : messages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem 1rem",
              border: `1px dashed ${RULE}`,
            }}
          >
            <Mail size={20} color={RULE} style={{ marginBottom: "0.75rem" }} />
            <p
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                color: FAINT,
              }}
            >
              No messages yet.
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {messages.map((msg) => (
              <MessageCard
                key={msg.id}
                msg={msg}
                onDelete={handleDeleteMessage}
              />
            ))}
          </div>
        )}
      </Section>

      <style>{`
        @media (max-width: 560px) {
          .contact-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminShell>
  );
}
