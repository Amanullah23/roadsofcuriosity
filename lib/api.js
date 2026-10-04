// Roads of Curiosity — API client
// Target: lib/api.js (full replacement — this is your complete file)

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function authHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("roc_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error || data?.message) message = data.error || data.message;
    } catch {
      // body wasn't JSON — keep the generic message
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

// ── Auth ──
export async function loginAdmin(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(res);
}

export async function changePassword(currentPassword, newPassword) {
  const res = await fetch(`${API_URL}/auth/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return handleResponse(res);
}

// ── Stories ──
export async function getStories() {
  const res = await fetch(`${API_URL}/stories`);
  return handleResponse(res);
}

export async function getStory(slug) {
  const res = await fetch(`${API_URL}/stories/${slug}`);
  return handleResponse(res);
}

export async function createStory(data) {
  const res = await fetch(`${API_URL}/stories`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateStory(slug, data) {
  const res = await fetch(`${API_URL}/stories/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteStory(slug) {
  const res = await fetch(`${API_URL}/stories/${slug}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// ── Journal ──
export async function getJournalEntries() {
  const res = await fetch(`${API_URL}/journal`);
  return handleResponse(res);
}

export async function getJournalEntry(slug) {
  const res = await fetch(`${API_URL}/journal/${slug}`);
  return handleResponse(res);
}

export async function createJournalEntry(data) {
  const res = await fetch(`${API_URL}/journal`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateJournalEntry(slug, data) {
  const res = await fetch(`${API_URL}/journal/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteJournalEntry(slug) {
  const res = await fetch(`${API_URL}/journal/${slug}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// ── Photos ──
export async function getPhotos() {
  const res = await fetch(`${API_URL}/photos`);
  return handleResponse(res);
}

export async function createPhoto(data) {
  const res = await fetch(`${API_URL}/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updatePhoto(id, data) {
  const res = await fetch(`${API_URL}/photos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deletePhoto(id) {
  const res = await fetch(`${API_URL}/photos/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// ── Home page content ──
export async function getHomeContent() {
  const res = await fetch(`${API_URL}/home`);
  return handleResponse(res);
}

export async function updateHomeContent(data) {
  const res = await fetch(`${API_URL}/home`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ── Uploads ──
// Sends a File (from an <input type="file">) to the backend and gets back
// { url: '/uploads/169...-whatever.jpg' } — a path relative to the API
// server, not the Next.js app. Callers resolve it against API_URL before
// storing it (see admin-home-page.js's ImageField).
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: { ...authHeaders() }, // no Content-Type — the browser sets the multipart boundary itself
    body: formData,
  });
  return handleResponse(res);
}

// ── Admin profile ──
export async function getProfile(username) {
  const res = await fetch(`${API_URL}/profile/${encodeURIComponent(username)}`);
  return handleResponse(res);
}

export async function updateProfile(username, data) {
  const res = await fetch(
    `${API_URL}/profile/${encodeURIComponent(username)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    },
  );
  return handleResponse(res);
}

// ── About page content ──
export async function getAboutContent() {
  const res = await fetch(`${API_URL}/about`);
  return handleResponse(res);
}

export async function updateAboutContent(data) {
  const res = await fetch(`${API_URL}/about`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ── Contact form submissions ──
export async function submitContactMessage(data) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function getContactSubmissions() {
  const res = await fetch(`${API_URL}/contact`, {
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

export async function deleteContactSubmission(id) {
  const res = await fetch(`${API_URL}/contact/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// ── Contact details (email, phone, WhatsApp, socials, Ariana reference) ──
export async function getContactInfo() {
  const res = await fetch(`${API_URL}/contact-info`);
  return handleResponse(res);
}

export async function updateContactInfo(data) {
  const res = await fetch(`${API_URL}/contact-info`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}
