"use client";

// Roads of Curiosity — Admin: Story editor (new visual system: "The Route")
// Target: app/admin/stories/[slug]/page.js
// Light only — shares AdminShell with the rest of the admin panel.

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
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
import { stories as initialStories } from "@/lib/data";
import { getStory, createStory, updateStory } from "@/lib/api";

const sectionTypes = ["text", "image", "image-pair", "quote"];

const emptyStory = {
  slug: "",
  title: "",
  place: "",
  date: "",
  read_time: "",
  count: 0,
  excerpt: "",
  opening: "",
  sections: [],
};

const emptySection = (type) => {
  if (type === "text") return { type: "text", content: "" };
  if (type === "image")
    return {
      type: "image",
      orientation: "landscape",
      caption: "",
      place: "",
      src: "",
    };
  if (type === "image-pair")
    return {
      type: "image-pair",
      images: [
        { orientation: "portrait", caption: "", place: "", src: "" },
        { orientation: "portrait", caption: "", place: "", src: "" },
      ],
    };
  if (type === "quote") return { type: "quote", content: "" };
};

const sectionLabel = {
  text: "¶ Text",
  image: "▭ Image",
  "image-pair": "▭▭ Pair",
  quote: '" Quote',
};

// ─── Section heading tag (small caps serif index + petrol-bordered type tag) ──
function SectionTag({ index, type }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <span
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontSize: "0.7rem",
          color: FAINT,
          minWidth: "20px",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.68rem",
          color: PETROL,
          fontWeight: 600,
          border: `1px solid ${PETROL}`,
          padding: "0.15rem 0.55rem",
        }}
      >
        {type}
      </span>
    </div>
  );
}

// ─── Story editor page ──────────────────────────────────────────────────────────
export default function StoryEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.slug === "new";

  const [story, setStory] = useState(emptyStory);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addingSection, setAddingSection] = useState(false);

  useEffect(() => {
    const init = async () => {
      const auth =
        localStorage.getItem("roc_admin") || localStorage.getItem("roc_token");
      if (!auth) {
        router.push("/admin");
        return;
      }

      if (!isNew) {
        getStory(params.slug)
          .then((data) => {
            if (data && data.slug) {
              if (typeof data.sections === "string") {
                try {
                  data.sections = JSON.parse(data.sections);
                } catch {
                  data.sections = [];
                }
              }
              if (!Array.isArray(data.sections)) data.sections = [];
              setStory(data);
            } else {
              const found = initialStories.find((s) => s.slug === params.slug);
              if (found) setStory(found);
            }
          })
          .catch(() => {
            const found = initialStories.find((s) => s.slug === params.slug);
            if (found) setStory(found);
          });
      }
    };
    init();
  }, [params.slug, isNew, router]);

  const handleField = (field, value) => {
    setStory((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSectionField = (index, field, value) => {
    setStory((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
    setSaved(false);
  };

  const handleImagePairField = (sectionIndex, imageIndex, field, value) => {
    setStory((prev) => {
      const sections = [...prev.sections];
      const images = [...sections[sectionIndex].images];
      images[imageIndex] = { ...images[imageIndex], [field]: value };
      sections[sectionIndex] = { ...sections[sectionIndex], images };
      return { ...prev, sections };
    });
    setSaved(false);
  };

  const addSection = (type) => {
    setStory((prev) => ({
      ...prev,
      sections: [...prev.sections, emptySection(type)],
    }));
    setAddingSection(false);
  };

  const removeSection = (index) => {
    setStory((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const moveSection = (index, dir) => {
    setStory((prev) => {
      const sections = [...prev.sections];
      const target = index + dir;
      if (target < 0 || target >= sections.length) return prev;
      [sections[index], sections[target]] = [sections[target], sections[index]];
      return { ...prev, sections };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) {
        await createStory(story);
      } else {
        await updateStory(params.slug, story);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const SaveButton = ({ small }) => (
    <button
      onClick={handleSave}
      disabled={saving}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: small ? "0.55rem 1.1rem" : "0.85rem 2rem",
        background: saved ? PETROL : INK,
        color: BG,
        border: "none",
        cursor: saving ? "wait" : "pointer",
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: small ? "0.75rem" : "0.8rem",
        fontWeight: 600,
        transition: "background 0.2s ease",
        opacity: saving ? 0.7 : 1,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!saved && !saving) e.currentTarget.style.background = CLAY;
      }}
      onMouseLeave={(e) => {
        if (!saving) e.currentTarget.style.background = saved ? PETROL : INK;
      }}
    >
      <Save size={small ? 13 : 14} />
      {saving ? "Saving…" : saved ? "Saved ✓" : "Save story"}
    </button>
  );

  return (
    <AdminShell
      title={isNew ? "New story" : "Edit story"}
      maxWidth="860px"
      action={<SaveButton small />}
    >
      <Link
        href="/admin/stories"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "0.74rem",
          color: FAINT,
          textDecoration: "none",
          marginBottom: "1.5rem",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = PETROL)}
        onMouseLeave={(e) => (e.currentTarget.style.color = FAINT)}
      >
        <ArrowLeft size={12} /> All stories
      </Link>

      {/* ── Story details ── */}
      <div style={{ marginBottom: "3rem" }}>
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            color: CLAY,
            fontWeight: 600,
            display: "block",
            marginBottom: "1.5rem",
          }}
        >
          Story details
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1rem",
          }}
          className="field-row-2"
        >
          <div>
            <label style={labelStyle}>Title</label>
            <input
              value={story.title}
              onChange={(e) => handleField("title", e.target.value)}
              placeholder="Story title"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>Slug</label>
            <input
              value={story.slug}
              onChange={(e) => handleField("slug", e.target.value)}
              placeholder="story-slug-here"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
            marginBottom: "1rem",
          }}
          className="field-row-3"
        >
          <div>
            <label style={labelStyle}>Place</label>
            <input
              value={story.place}
              onChange={(e) => handleField("place", e.target.value)}
              placeholder="Afghanistan"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input
              value={story.date}
              onChange={(e) => handleField("date", e.target.value)}
              placeholder="March 2024"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>Read time</label>
            <input
              value={story.read_time || ""}
              onChange={(e) => handleField("read_time", e.target.value)}
              placeholder="6 min read"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Excerpt</label>
          <textarea
            value={story.excerpt}
            onChange={(e) => handleField("excerpt", e.target.value)}
            placeholder="Short excerpt shown in story listings…"
            rows={2}
            style={{ ...inputStyle, resize: "vertical" }}
            {...focusHandlers}
          />
        </div>

        <div>
          <label style={labelStyle}>Opening paragraph</label>
          <textarea
            value={story.opening}
            onChange={(e) => handleField("opening", e.target.value)}
            placeholder="The opening paragraph shown before the story sections…"
            rows={4}
            style={{ ...inputStyle, resize: "vertical", fontStyle: "italic" }}
            {...focusHandlers}
          />
        </div>
      </div>

      {/* ── Sections ── */}
      <div>
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            color: CLAY,
            fontWeight: 600,
            display: "block",
            marginBottom: "1.5rem",
          }}
        >
          Story sections ({story.sections?.length || 0})
        </span>

        {(story.sections || []).map((section, i) => (
          <div
            key={i}
            style={{
              border: `1px solid ${RULE}`,
              background: SURFACE,
              marginBottom: "0.75rem",
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1rem",
                borderBottom: `1px solid ${RULE}`,
                background: BG,
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <SectionTag index={i} type={section.type} />

              <div
                style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}
              >
                <button
                  onClick={() => moveSection(i, -1)}
                  disabled={i === 0}
                  style={{
                    background: "none",
                    border: `1px solid ${RULE}`,
                    cursor: i === 0 ? "not-allowed" : "pointer",
                    color: FAINT,
                    width: "26px",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: i === 0 ? 0.3 : 1,
                    fontSize: "0.7rem",
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSection(i, 1)}
                  disabled={i === story.sections.length - 1}
                  style={{
                    background: "none",
                    border: `1px solid ${RULE}`,
                    cursor:
                      i === story.sections.length - 1
                        ? "not-allowed"
                        : "pointer",
                    color: FAINT,
                    width: "26px",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: i === story.sections.length - 1 ? 0.3 : 1,
                    fontSize: "0.7rem",
                  }}
                >
                  ↓
                </button>
                <button
                  onClick={() => removeSection(i)}
                  style={{
                    background: "none",
                    border: `1px solid ${RULE}`,
                    cursor: "pointer",
                    color: FAINT,
                    width: "26px",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
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
                  <Trash2 size={11} />
                </button>
              </div>
            </div>

            {/* Section body */}
            <div style={{ padding: "1.2rem" }}>
              {section.type === "text" && (
                <div>
                  <label style={labelStyle}>Content</label>
                  <textarea
                    value={section.content}
                    onChange={(e) =>
                      handleSectionField(i, "content", e.target.value)
                    }
                    placeholder="Write your paragraph here…"
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical" }}
                    {...focusHandlers}
                  />
                </div>
              )}

              {section.type === "quote" && (
                <div>
                  <label style={labelStyle}>Quote</label>
                  <textarea
                    value={section.content}
                    onChange={(e) =>
                      handleSectionField(i, "content", e.target.value)
                    }
                    placeholder="Enter the pull quote…"
                    rows={2}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      fontStyle: "italic",
                    }}
                    {...focusHandlers}
                  />
                </div>
              )}

              {section.type === "image" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                    }}
                    className="field-row-2"
                  >
                    <div>
                      <label style={labelStyle}>Orientation</label>
                      <select
                        value={section.orientation}
                        onChange={(e) =>
                          handleSectionField(i, "orientation", e.target.value)
                        }
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        <option value="landscape">Landscape (4:3)</option>
                        <option value="portrait">Portrait (3:4)</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Place</label>
                      <input
                        value={section.place}
                        onChange={(e) =>
                          handleSectionField(i, "place", e.target.value)
                        }
                        placeholder="Balkh Province"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Image URL</label>
                    <input
                      value={section.src || ""}
                      onChange={(e) =>
                        handleSectionField(i, "src", e.target.value)
                      }
                      placeholder="https://... or /images/photo.jpg"
                      style={inputStyle}
                      {...focusHandlers}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Caption</label>
                    <input
                      value={section.caption}
                      onChange={(e) =>
                        handleSectionField(i, "caption", e.target.value)
                      }
                      placeholder="Caption text shown below the image…"
                      style={inputStyle}
                      {...focusHandlers}
                    />
                  </div>
                </div>
              )}

              {section.type === "image-pair" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                  className="field-row-2"
                >
                  {section.images.map((img, j) => (
                    <div
                      key={j}
                      style={{
                        border: `1px solid ${RULE}`,
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        background: BG,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontSize: "0.64rem",
                          color: FAINT,
                          fontWeight: 500,
                        }}
                      >
                        Image {j + 1}
                      </span>
                      <div>
                        <label style={labelStyle}>Orientation</label>
                        <select
                          value={img.orientation}
                          onChange={(e) =>
                            handleImagePairField(
                              i,
                              j,
                              "orientation",
                              e.target.value,
                            )
                          }
                          style={{ ...inputStyle, cursor: "pointer" }}
                        >
                          <option value="landscape">Landscape</option>
                          <option value="portrait">Portrait</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Image URL</label>
                        <input
                          value={img.src || ""}
                          onChange={(e) =>
                            handleImagePairField(i, j, "src", e.target.value)
                          }
                          placeholder="https://..."
                          style={inputStyle}
                          {...focusHandlers}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Caption</label>
                        <input
                          value={img.caption}
                          onChange={(e) =>
                            handleImagePairField(
                              i,
                              j,
                              "caption",
                              e.target.value,
                            )
                          }
                          placeholder="Caption…"
                          style={inputStyle}
                          {...focusHandlers}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Place</label>
                        <input
                          value={img.place}
                          onChange={(e) =>
                            handleImagePairField(i, j, "place", e.target.value)
                          }
                          placeholder="Place…"
                          style={inputStyle}
                          {...focusHandlers}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add section */}
        {addingSection ? (
          <div
            style={{
              border: `1px solid ${RULE}`,
              padding: "1.5rem",
              background: SURFACE,
            }}
          >
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.68rem",
                color: FAINT,
                marginBottom: "1rem",
                fontWeight: 500,
              }}
            >
              Select a section type
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.5rem",
              }}
              className="section-type-grid"
            >
              {sectionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => addSection(type)}
                  style={{
                    padding: "0.85rem",
                    border: `1px solid ${RULE}`,
                    background: BG,
                    color: FAINT,
                    cursor: "pointer",
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.74rem",
                    fontWeight: 500,
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = PETROL;
                    e.currentTarget.style.color = PETROL;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = RULE;
                    e.currentTarget.style.color = FAINT;
                  }}
                >
                  {sectionLabel[type]}
                </button>
              ))}
            </div>
            <button
              onClick={() => setAddingSection(false)}
              style={{
                marginTop: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.74rem",
                color: FAINT,
                padding: 0,
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingSection(true)}
            style={{
              width: "100%",
              padding: "1rem",
              border: `1px dashed ${RULE}`,
              background: "transparent",
              color: FAINT,
              cursor: "pointer",
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = PETROL;
              e.currentTarget.style.color = PETROL;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = RULE;
              e.currentTarget.style.color = FAINT;
            }}
          >
            <Plus size={14} /> Add section
          </button>
        )}
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: `1px solid ${RULE}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Link
          href="/admin/stories"
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.78rem",
            color: FAINT,
            transition: "color 0.2s ease",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
          onMouseLeave={(e) => (e.currentTarget.style.color = FAINT)}
        >
          ← Back without saving
        </Link>
        <SaveButton />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .field-row-2, .field-row-3 { grid-template-columns: 1fr !important; }
          .section-type-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </AdminShell>
  );
}
