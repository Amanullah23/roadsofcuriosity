// Roads of Curiosity — client-side analytics helpers
// Target: lib/analytics.js
//
// Cookie-free, no third-party service. Every call fails silently —
// analytics must never break the site for a visitor.

const STORAGE_KEY = "roc_session_id";

function getSessionId() {
  if (typeof window === "undefined") return "sess_server";
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id =
        "sess_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return "sess_anon";
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function send(payload) {
  if (typeof window === "undefined") return;
  const url = `${API_BASE}/api/analytics/track`;
  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }
  } catch {
    // fall through to fetch
  }

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

/** Call once per route change on the public site. */
export function trackPageView(path) {
  send({
    type: "pageview",
    path,
    sessionId: getSessionId(),
    referrer: typeof document !== "undefined" ? document.referrer : "",
  });
}

/** Call from any CTA, button or link you want counted. */
export function trackClick(label, path) {
  send({
    type: "click",
    path:
      path || (typeof window !== "undefined" ? window.location.pathname : ""),
    label,
    sessionId: getSessionId(),
  });
}

/** Admin dashboard only — pulls the aggregated summary. */
export async function getAnalyticsSummary(days = 30) {
  const auth =
    typeof window !== "undefined"
      ? localStorage.getItem("roc_token") || localStorage.getItem("roc_admin")
      : null;

  const res = await fetch(`${API_BASE}/api/analytics/summary?days=${days}`, {
    headers: auth ? { Authorization: `Bearer ${auth}` } : {},
  });
  if (!res.ok) throw new Error("Failed to load analytics");
  return res.json();
}
