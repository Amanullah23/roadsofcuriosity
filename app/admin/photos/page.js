"use client";

// Roads of Curiosity — Admin: Photos (new visual system: "The Route")
// Target: app/admin/photos/page.js
// Light only — shares AdminShell with the rest of the admin panel.

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  MapPin,
  Save,
  XCircle,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
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
  getPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
  uploadImage,
  API_URL,
} from "@/lib/api";
import { photos as fallbackPhotos } from "@/lib/data";

const categories = ["All", "Landscapes", "Portraits", "Travel", "Architecture"];
const categoryOptions = ["Landscapes", "Portraits", "Travel", "Architecture"];

const emptyPhoto = {
  src: "",
  title: "",
  location: "",
  category: "Landscapes",
  aspect: "3 / 2",
  description: "",
};

function resolveUploadUrl(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const base = API_URL.replace(/\/api\/?$/, "");
  return `${base}${url}`;
}

// ─── Image field: paste a URL, or upload a file from disk ─────────────────────
function PhotoImageField({ value, onChange }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { url } = await uploadImage(file);
      onChange(resolveUploadUrl(url));
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label style={labelStyle}>Image</label>
      <div
        style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            flexShrink: 0,
            background: BG,
            border: `1px solid ${RULE}`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {value ? (
            <img
              src={value}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageIcon size={16} color={RULE} />
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
          }}
        >
          <input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload a file below"
            style={inputStyle}
            {...focusHandlers}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.4rem 0.8rem",
                background: BG,
                border: `1px solid ${RULE}`,
                color: INK,
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                cursor: uploading ? "wait" : "pointer",
                opacity: uploading ? 0.7 : 1,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!uploading) e.currentTarget.style.background = SURFACE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = BG;
              }}
            >
              <Upload size={12} />
              {uploading ? "Uploading…" : "Upload from computer"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            {error && (
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.7rem",
                  color: "#B3473E",
                }}
              >
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Photo form (used inline for both add + edit) ──────────────────────────────
function PhotoForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial);
  const set = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div
      style={{
        border: `1px solid ${PETROL}`,
        background: SURFACE,
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.85rem",
          marginBottom: "0.85rem",
        }}
        className="photo-form-row"
      >
        <div>
          <label style={labelStyle}>Title</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Mountain Silence"
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="Hindu Kush, Afghanistan"
            style={inputStyle}
            {...focusHandlers}
          />
        </div>
      </div>

      <div style={{ marginBottom: "0.85rem" }}>
        <PhotoImageField value={form.src} onChange={(v) => set("src", v)} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.85rem",
          marginBottom: "0.85rem",
        }}
        className="photo-form-row"
      >
        <div>
          <label style={labelStyle}>Category</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Aspect ratio</label>
          <select
            value={form.aspect}
            onChange={(e) => set("aspect", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="3 / 2">Landscape (3:2)</option>
            <option value="4 / 3">Landscape (4:3)</option>
            <option value="1 / 1">Square (1:1)</option>
            <option value="3 / 4">Portrait (3:4)</option>
            <option value="2 / 3">Portrait (2:3)</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Short description</label>
        <textarea
          value={form.description || ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="One short line shown on hover in the gallery…"
          rows={2}
          style={{ ...inputStyle, resize: "vertical" }}
          {...focusHandlers}
        />
      </div>

      <div style={{ display: "flex", gap: "0.6rem" }}>
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.6rem 1.25rem",
            background: PETROL,
            color: BG,
            border: "none",
            cursor: saving ? "wait" : "pointer",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.76rem",
            fontWeight: 600,
            transition: "background 0.2s ease",
            opacity: saving ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!saving) e.currentTarget.style.background = CLAY;
          }}
          onMouseLeave={(e) => (e.currentTarget.style.background = PETROL)}
        >
          <Save size={13} /> {saving ? "Saving…" : "Save photo"}
        </button>
        <button
          onClick={onCancel}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.6rem 1.25rem",
            background: "transparent",
            color: FAINT,
            border: `1px solid ${RULE}`,
            cursor: "pointer",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.76rem",
            transition: "color 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = INK;
            e.currentTarget.style.borderColor = FAINT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = FAINT;
            e.currentTarget.style.borderColor = RULE;
          }}
        >
          <XCircle size={13} /> Cancel
        </button>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .photo-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Photo card ─────────────────────────────────────────────────────────────────
function PhotoCard({
  photo,
  isEditing,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  saving,
}) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (isEditing) {
    return (
      <PhotoForm
        initial={photo}
        onSave={onSaveEdit}
        onCancel={onCancelEdit}
        saving={saving}
      />
    );
  }

  const handleDeleteClick = async () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    setDeleting(true);
    await onDelete(photo.id);
  };

  return (
    <div
      style={{
        border: `1px solid ${RULE}`,
        background: BG,
        opacity: deleting ? 0.4 : 1,
        transition: "opacity 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          aspectRatio: photo.aspect || "3 / 2",
          background: SURFACE,
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        {photo.src ? (
          <img
            src={photo.src}
            alt={photo.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageIcon size={24} color={RULE} />
          </div>
        )}
        {/* Category tag */}
        <span
          style={{
            position: "absolute",
            top: "0.6rem",
            left: "0.6rem",
            background: BG,
            border: `1px solid ${RULE}`,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.64rem",
            color: PETROL,
            padding: "0.15rem 0.5rem",
          }}
        >
          {photo.category}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: "0.9rem 1rem" }}>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "0.98rem",
            color: INK,
            marginBottom: "0.3rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {photo.title || "Untitled photo"}
        </p>
        {photo.location && (
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.72rem",
              color: FAINT,
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              marginBottom: "0.8rem",
            }}
          >
            <MapPin size={10} /> {photo.location}
          </p>
        )}

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => onEdit(photo.id)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              padding: "0.45rem",
              border: `1px solid ${RULE}`,
              background: "transparent",
              color: INK,
              cursor: "pointer",
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.7rem",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = PETROL;
              e.currentTarget.style.color = PETROL;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = RULE;
              e.currentTarget.style.color = INK;
            }}
          >
            <Pencil size={12} /> Edit
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={deleting}
            style={{
              flex: confirming ? 2 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              padding: "0.45rem",
              border: `1px solid ${confirming ? CLAY : RULE}`,
              background: confirming ? "rgba(167,109,83,0.1)" : "transparent",
              color: confirming ? CLAY : INK,
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
                e.currentTarget.style.color = INK;
              }
            }}
          >
            <Trash2 size={12} /> {confirming ? "Confirm delete?" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin photos page ──────────────────────────────────────────────────────────
export default function AdminPhotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [editingId, setEditingId] = useState(null); // photo.id or 'new'
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      const auth =
        localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
      if (!auth) {
        router.push("/admin");
        return;
      }

      try {
        const data = await getPhotos();
        setPhotos(
          Array.isArray(data) && data.length > 0 ? data : fallbackPhotos,
        );
      } catch {
        setPhotos(fallbackPhotos);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleSaveNew = async (form) => {
    setSaving(true);
    try {
      const created = await createPhoto(form);
      setPhotos((prev) => [
        created && created.id ? created : { ...form, id: Date.now() },
        ...prev,
      ]);
    } catch {
      setPhotos((prev) => [{ ...form, id: Date.now() }, ...prev]);
    } finally {
      setSaving(false);
      setEditingId(null);
    }
  };

  const handleSaveEdit = async (form) => {
    setSaving(true);
    try {
      await updatePhoto(form.id, form);
    } catch {
      // still update locally
    }
    setPhotos((prev) => prev.map((p) => (p.id === form.id ? form : p)));
    setSaving(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deletePhoto(id);
    } catch {
      // still remove locally
    }
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const filtered = photos
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter(
      (p) =>
        (p.title || "").toLowerCase().includes(query.toLowerCase()) ||
        (p.location || "").toLowerCase().includes(query.toLowerCase()),
    );

  return (
    <AdminShell
      title="Photos"
      maxWidth="1200px"
      action={
        <button
          onClick={() => setEditingId("new")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.55rem 1.1rem",
            background: PETROL,
            color: BG,
            border: "none",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = CLAY)}
          onMouseLeave={(e) => (e.currentTarget.style.background = PETROL)}
        >
          <Plus size={14} /> Add photo
        </button>
      }
    >
      {/* Search + category filter */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{ position: "relative", flex: "1 1 280px", maxWidth: "360px" }}
        >
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "0.9rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: FAINT,
            }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search photos by title or location…"
            style={{
              width: "100%",
              padding: "0.65rem 0.9rem 0.65rem 2.4rem",
              border: `1px solid ${RULE}`,
              background: BG,
              color: INK,
              fontFamily: "'Fraunces', serif",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: active ? PETROL : "transparent",
                  border: `1px solid ${active ? PETROL : RULE}`,
                  color: active ? BG : FAINT,
                  padding: "0.4rem 0.9rem",
                  fontSize: "0.74rem",
                  cursor: "pointer",
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add new photo form */}
      {editingId === "new" && (
        <div style={{ marginBottom: "1.5rem" }}>
          <PhotoForm
            initial={emptyPhoto}
            onSave={handleSaveNew}
            onCancel={() => setEditingId(null)}
            saving={saving}
          />
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            color: FAINT,
          }}
        >
          Loading photos…
        </p>
      ) : filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isEditing={editingId === photo.id}
              onEdit={setEditingId}
              onCancelEdit={() => setEditingId(null)}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
              saving={saving}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            border: `1px dashed ${RULE}`,
          }}
        >
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: FAINT,
              marginBottom: "1.25rem",
            }}
          >
            {query || activeCategory !== "All"
              ? "No photos match your filters."
              : "No photos yet."}
          </p>
          {!query && activeCategory === "All" && editingId !== "new" && (
            <button
              onClick={() => setEditingId("new")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.78rem",
                color: PETROL,
                borderBottom: `1px solid ${PETROL}`,
                paddingBottom: "2px",
              }}
            >
              <Plus size={12} /> Add your first photo
            </button>
          )}
        </div>
      )}
    </AdminShell>
  );
}
