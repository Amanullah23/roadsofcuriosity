"use client";

// Roads of Curiosity — Admin: Dashboard (new visual system: "The Route")
// Target: app/admin/dashboard/page.js
//
// This page predated AdminShell (it was the very first admin page redesigned,
// before the shared sidebar/topbar was pulled out into its own component), so
// it was still carrying its own inline sidebar with the old 5-item nav list —
// which is why "Home page" wasn't showing up here while it showed everywhere
// else. Fixed by switching to the shared AdminShell, same as every other
// admin page. Nothing about the dashboard content itself changed.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Image as ImageIcon,
  Settings,
  Plus,
  ArrowRight,
  Eye,
  Users,
  TrendingUp,
} from "lucide-react";
import AdminShell, {
  PETROL,
  CLAY,
  BG,
  SURFACE,
  INK,
  FAINT,
  RULE,
} from "@/components/admin/AdminShell";
import { getStories, getJournalEntries, getPhotos } from "@/lib/api";
import { getAnalyticsSummary } from "@/lib/analytics";
import {
  stories as staticStories,
  entries as staticEntries,
  photos as staticPhotos,
} from "@/lib/data";

// ─── Mock analytics fallback (used until the backend table has real data) ─────
function buildMockAnalytics(stories, entries) {
  const today = new Date();
  const dailyViews = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    const base = 18 + Math.round(Math.sin(i / 3.2) * 8) + Math.round(i * 0.6);
    const noise = Math.round(Math.random() * 10);
    return {
      date: d.toISOString().slice(0, 10),
      count: Math.max(2, base + noise),
    };
  });
  const totalViews = dailyViews.reduce((sum, d) => sum + d.count, 0);
  const todayViews = dailyViews[dailyViews.length - 1].count;

  const pagePool = [
    { path: "/", label: "Home" },
    { path: "/stories", label: "Stories" },
    { path: "/gallery", label: "Gallery" },
    { path: "/journal", label: "Journal" },
    { path: "/about", label: "About" },
    ...stories
      .slice(0, 3)
      .map((s) => ({ path: `/stories/${s.slug}`, label: s.title })),
    ...entries
      .slice(0, 2)
      .map((e) => ({ path: `/journal/${e.slug}`, label: e.title })),
  ];
  const topPages = pagePool
    .map((p) => ({ ...p, count: Math.round(40 + Math.random() * 220) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const clickPool = [
    "Read this story",
    "Subscribe (newsletter)",
    "Instagram icon",
    "Contact form submit",
    "View gallery image",
    "Facebook icon",
    "Nav: Stories",
    "Nav: Journal",
  ];
  const topClicks = clickPool
    .map((label) => ({ label, count: Math.round(10 + Math.random() * 140) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    totalViews,
    todayViews,
    uniqueVisitors: Math.round(totalViews * (0.55 + Math.random() * 0.1)),
    dailyViews,
    topPages: topPages.map(({ path, count }) => ({ path, count })),
    topClicks,
    isMock: true,
  };
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Stat tile (links to a sub-page) ───────────────────────────────────────────
function StatTile({ label, value, href, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <Link
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        borderTop: `2px solid ${PETROL}`,
        background: SURFACE,
        padding: "1.75rem 1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition:
          "opacity 0.5s ease, transform 0.5s ease, background 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = RULE)}
      onMouseLeave={(e) => (e.currentTarget.style.background = SURFACE)}
    >
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: "2.4rem",
          color: PETROL,
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          color: FAINT,
        }}
      >
        {label}
      </div>
    </Link>
  );
}

// ─── Metric tile (analytics — no link, optional icon) ──────────────────────────
function MetricTile({ label, value, Icon, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        background: SURFACE,
        borderTop: `2px solid ${CLAY}`,
        padding: "1.75rem 1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: "2.2rem",
            color: INK,
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {Icon && <Icon size={18} strokeWidth={1.6} color={CLAY} />}
      </div>
      <div
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          color: FAINT,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Mini line chart (pure SVG, no chart library) ──────────────────────────────
function ViewsChart({ data }) {
  if (!data || data.length === 0) return null;

  const W = 640;
  const H = 190;
  const padTop = 18;
  const padBottom = 28;
  const padX = 4;
  const chartW = W - padX * 2;
  const chartH = H - padTop - padBottom;

  const values = data.map((d) => d.count);
  const max = Math.max(...values, 1);
  const n = data.length;

  const points = data.map((d, i) => {
    const x = padX + (n === 1 ? chartW / 2 : (i / (n - 1)) * chartW);
    const y = padTop + chartH - (d.count / max) * chartH;
    return [x, y];
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${points[points.length - 1][0].toFixed(1)},${(padTop + chartH).toFixed(1)} L${points[0][0].toFixed(1)},${(padTop + chartH).toFixed(1)} Z`;

  const labelIdx = [0, Math.floor((n - 1) / 2), n - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <linearGradient id="analyticsAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CLAY} stopOpacity="0.28" />
          <stop offset="100%" stopColor={CLAY} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Baseline */}
      <line
        x1={padX}
        y1={padTop + chartH}
        x2={W - padX}
        y2={padTop + chartH}
        stroke={RULE}
        strokeWidth="1"
      />

      {/* Area fill */}
      <path d={areaPath} fill="url(#analyticsAreaFill)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={PETROL}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Endpoint dot */}
      <circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r="3.5"
        fill={PETROL}
      />

      {/* X-axis labels */}
      {labelIdx.map((i) => (
        <text
          key={i}
          x={points[i][0]}
          y={H - 8}
          textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "9px",
            fill: FAINT,
            letterSpacing: "0.02em",
          }}
        >
          {formatShortDate(data[i].date)}
        </text>
      ))}
    </svg>
  );
}

// ─── Ranked list (most-viewed pages / most-clicked elements) ──────────────────
function RankedList({ title, items, format }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <div style={{ border: `1px solid ${RULE}`, padding: "1.5rem" }}>
      <h4
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          color: FAINT,
          marginBottom: "1.1rem",
        }}
      >
        {title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {items.length === 0 && (
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "0.82rem",
              color: FAINT,
            }}
          >
            No data yet.
          </p>
        )}
        {items.map((item, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.3rem",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "0.85rem",
                  color: INK,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {format ? format(item) : item.label}
              </span>
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.78rem",
                  color: FAINT,
                  flexShrink: 0,
                }}
              >
                {item.count}
              </span>
            </div>
            <div
              style={{ height: "4px", background: RULE, position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${Math.max(4, (item.count / max) * 100)}%`,
                  background: CLAY,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quick action card ─────────────────────────────────────────────────────────
function QuickAction({ label, description, href, Icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        border: `1px solid ${hovered ? PETROL : RULE}`,
        padding: "1.5rem",
        textDecoration: "none",
        transition: "border-color 0.2s ease",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${RULE}`,
          color: PETROL,
          transition: "border-color 0.2s ease",
        }}
      >
        <Icon size={17} strokeWidth={1.75} />
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: INK,
            marginBottom: "0.3rem",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "0.82rem",
            color: FAINT,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
      <ArrowRight
        size={15}
        style={{
          color: PETROL,
          flexShrink: 0,
          marginTop: "0.2rem",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.2s ease",
        }}
      />
    </Link>
  );
}

// ─── Dashboard page ──────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [counts, setCounts] = useState({
    stories: staticStories.length,
    entries: staticEntries.length,
    photos: staticPhotos.length,
    published: staticStories.filter((s) => s.published !== false).length,
  });
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const auth =
        localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
      if (!auth) {
        router.push("/admin");
        return;
      }
      setChecked(true);
      setAdminName(localStorage.getItem("roc_admin") || "Admin");

      let stories = staticStories;
      let entries = staticEntries;

      try {
        const [storiesData, entriesData, photosData] = await Promise.all([
          getStories().catch(() => staticStories),
          getJournalEntries().catch(() => staticEntries),
          getPhotos().catch(() => staticPhotos),
        ]);
        stories = Array.isArray(storiesData) ? storiesData : staticStories;
        entries = Array.isArray(entriesData) ? entriesData : staticEntries;
        const photos = Array.isArray(photosData) ? photosData : staticPhotos;

        setCounts({
          stories: stories.length,
          entries: entries.length,
          photos: photos.length,
          published: stories.filter((s) => s.published !== false).length,
        });
      } catch {
        // keep static fallback counts
      }

      try {
        const data = await getAnalyticsSummary(30);
        setAnalytics(data);
      } catch {
        setAnalytics(buildMockAnalytics(stories, entries));
      } finally {
        setAnalyticsLoading(false);
      }
    };
    init();
  }, [router]);

  if (!checked) return null;

  return (
    <AdminShell title="Dashboard">
      {/* Welcome */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.6rem, 3.4vw, 2.2rem)",
            color: INK,
          }}
        >
          {adminName ? `Welcome back, ${adminName}.` : "Welcome back."}
        </h2>
      </div>

      {/* Content stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1px",
          background: RULE,
          border: `1px solid ${RULE}`,
          marginBottom: "3rem",
        }}
      >
        <StatTile
          label="Total Stories"
          value={counts.stories}
          href="/admin/stories"
          delay={0}
        />
        <StatTile
          label="Published"
          value={counts.published}
          href="/admin/stories"
          delay={80}
        />
        <StatTile
          label="Journal Entries"
          value={counts.entries}
          href="/admin/journal"
          delay={160}
        />
        <StatTile
          label="Photographs"
          value={counts.photos}
          href="/admin/photos"
          delay={240}
        />
      </div>

      {/* ── Analytics ── */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            color: FAINT,
          }}
        >
          Analytics
        </h3>
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: "0.78rem",
            color: FAINT,
          }}
        >
          Last 30 days
          {analytics?.isMock
            ? " · sample data, connect tracking to go live"
            : ""}
        </span>
      </div>

      {analyticsLoading ? (
        <div style={{ padding: "3rem 0", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: FAINT,
            }}
          >
            Loading analytics…
          </p>
        </div>
      ) : (
        <>
          {/* Metric tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1px",
              background: RULE,
              border: `1px solid ${RULE}`,
              marginBottom: "1.5rem",
            }}
          >
            <MetricTile
              label="Total Views"
              value={analytics.totalViews.toLocaleString()}
              Icon={Eye}
              delay={0}
            />
            <MetricTile
              label="Unique Visitors"
              value={analytics.uniqueVisitors.toLocaleString()}
              Icon={Users}
              delay={80}
            />
            <MetricTile
              label="Views Today"
              value={analytics.todayViews.toLocaleString()}
              Icon={TrendingUp}
              delay={160}
            />
          </div>

          {/* Chart */}
          <div
            style={{
              border: `1px solid ${RULE}`,
              padding: "1.75rem 1.5rem 1rem",
              marginBottom: "1.5rem",
            }}
          >
            <h4
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                color: FAINT,
                marginBottom: "1rem",
              }}
            >
              Views over time
            </h4>
            <ViewsChart data={analytics.dailyViews} />
          </div>

          {/* Ranked lists */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <RankedList
              title="Most-visited pages"
              items={analytics.topPages}
              format={(item) => item.path}
            />
            <RankedList title="Most-clicked" items={analytics.topClicks} />
          </div>
        </>
      )}

      {/* Quick actions */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h3
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            color: FAINT,
          }}
        >
          Quick actions
        </h3>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        <QuickAction
          label="New Story"
          description="Start a new photographic story with images and text sections."
          href="/admin/stories/new"
          Icon={Plus}
        />
        <QuickAction
          label="New Journal Entry"
          description="Write a short encounter, note or discovery from the road."
          href="/admin/journal/new"
          Icon={Plus}
        />
        <QuickAction
          label="Manage Photos"
          description="Add, edit or remove photographs from the gallery."
          href="/admin/photos"
          Icon={ImageIcon}
        />
        <QuickAction
          label="Site Settings"
          description="Update your password and site preferences."
          href="/admin/settings"
          Icon={Settings}
        />
      </div>
    </AdminShell>
  );
}
