"use client";

// Roads of Curiosity — shared admin chrome (new visual system: "The Route")
// Target: components/admin/AdminShell.js
//
// Stories, Journal, Photos and Settings all import this one file for the
// sidebar + topbar, so the admin panel reads as one consistent room. Light
// only — there is no dark mode anywhere in the admin panel.

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  NotebookText,
  Image as ImageIcon,
  Home,
  UserRound,
  Mail,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { getProfile } from "@/lib/api";

export const PETROL = "#294B4A";
export const CLAY = "#A76D53";
export const GOLD = "#C99A4E";
export const BG = "#F4EEE3";
export const SURFACE = "#EDE7DA";
export const INK = "#292D2B";
export const FAINT = "#7A7D7B";
export const RULE = "#D6CFC3";

export const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Home page", href: "/admin/home", icon: Home },
  { label: "About page", href: "/admin/about", icon: UserRound },
  { label: "Contact", href: "/admin/contact", icon: Mail },
  { label: "Stories", href: "/admin/stories", icon: BookOpen },
  { label: "Journal", href: "/admin/journal", icon: NotebookText },
  { label: "Photos", href: "/admin/photos", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

// ─── Shared field styles (used by every editor/form in the admin panel) ──────
export const inputStyle = {
  width: "100%",
  background: BG,
  border: `1px solid ${RULE}`,
  color: INK,
  padding: "0.7rem 0.9rem",
  fontSize: "0.92rem",
  fontFamily: "'Fraunces', serif",
  outline: "none",
  transition: "border-color 0.2s ease",
  borderRadius: 0,
};
export const labelStyle = {
  fontFamily: "'Instrument Sans', sans-serif",
  fontSize: "0.68rem",
  color: FAINT,
  fontWeight: 500,
  letterSpacing: "0.07em",
  display: "block",
  marginBottom: "0.4rem",
};
export const focusHandlers = {
  onFocus: (e) => {
    e.target.style.borderColor = PETROL;
  },
  onBlur: (e) => {
    e.target.style.borderColor = RULE;
  },
};

// ─── Sidebar (shared: desktop rail + mobile overlay) ──────────────────────────
function SidebarContent({ pathname, onNavigate, onLogout }) {
  return (
    <>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "block",
          padding: "1.75rem 1.5rem 1.5rem",
        }}
        onClick={onNavigate}
      >
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            lineHeight: 1,
            display: "flex",
            gap: "0.25em",
            alignItems: "baseline",
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: PETROL }}>Roads</span>
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "0.85em",
              color: GOLD,
            }}
          >
            of Curiosity
          </span>
        </span>
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: FAINT,
            display: "block",
            marginTop: "0.4rem",
          }}
        >
          Admin Panel
        </span>
      </Link>

      <div style={{ borderTop: `1px solid ${RULE}`, margin: "0 1.5rem" }} />

      <nav
        style={{
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          flex: 1,
        }}
      >
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.7rem 0.9rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: active ? 600 : 400,
                color: active ? BG : INK,
                background: active ? PETROL : "transparent",
                textDecoration: "none",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = SURFACE;
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon size={16} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ borderTop: `1px solid ${RULE}`, margin: "0 1.5rem" }} />

      <button
        onClick={onLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          margin: "1.25rem 1.5rem",
          padding: "0.7rem 0.9rem",
          background: "transparent",
          border: `1px solid ${RULE}`,
          color: FAINT,
          cursor: "pointer",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.78rem",
          transition: "border-color 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = CLAY;
          e.currentTarget.style.color = CLAY;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = RULE;
          e.currentTarget.style.color = FAINT;
        }}
      >
        <LogOut size={15} strokeWidth={1.75} /> Log out
      </button>
    </>
  );
}

// ─── Admin shell (sidebar + topbar wrapper — every admin page sits inside this) ──
export default function AdminShell({ title, action, maxWidth, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("roc_admin") || "Admin";
    setAdminName(name);
    getProfile(name)
      .then((data) => {
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      })
      .catch(() => {
        // no profile saved yet, or /api/profile not set up yet — the
        // initial-letter avatar below covers this fine
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("roc_admin");
    localStorage.removeItem("roc_token");
    router.push("/admin");
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex" }}>
      {/* Desktop sidebar */}
      <aside
        className="admin-sidebar-desktop"
        style={{
          width: "240px",
          flexShrink: 0,
          borderRight: `1px solid ${RULE}`,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <SidebarContent
          pathname={pathname}
          onNavigate={() => {}}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      <div
        className="admin-sidebar-mobile"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          display: mobileOpen ? "block" : "none",
        }}
      >
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(20,20,18,0.45)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "280px",
            maxWidth: "80vw",
            height: "100%",
            background: BG,
            display: "flex",
            flexDirection: "column",
            boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: FAINT,
            }}
          >
            <X size={20} />
          </button>
          <SidebarContent
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Main column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.1rem 1.75rem",
            borderBottom: `1px solid ${RULE}`,
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: BG,
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              minWidth: 0,
            }}
          >
            <button
              className="admin-hamburger"
              onClick={() => setMobileOpen(true)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: INK,
                padding: "0.25rem",
                flexShrink: 0,
              }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: INK,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.9rem",
              flexShrink: 0,
            }}
          >
            {action}
            <Link
              href="/admin/profile"
              aria-label="Your profile"
              style={{ flexShrink: 0, lineHeight: 0 }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: PETROL,
                  color: BG,
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : adminName ? (
                  adminName[0].toUpperCase()
                ) : (
                  "A"
                )}
              </div>
            </Link>
          </div>
        </header>

        <main
          style={{
            padding: "2.5rem 1.75rem 5rem",
            maxWidth: maxWidth || "none",
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        @media (max-width: 900px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
