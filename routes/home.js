const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM home_content WHERE id = 1");
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("GET /api/home error:", err);
    res.status(500).json({ error: "Could not load home content" });
  }
});

router.put("/", async (req, res) => {
  const {
    hero_title,
    hero_subtitle,
    hero_cta_label,
    hero_fallback_image,
    exhibition_caption,
    exhibition_fallback_image,
    about_quote,
    about_byline,
    about_image,
    newsletter_title,
    newsletter_body,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO home_content (
         id, hero_title, hero_subtitle, hero_cta_label, hero_fallback_image,
         exhibition_caption, exhibition_fallback_image,
         about_quote, about_byline, about_image,
         newsletter_title, newsletter_body, updated_at
       ) VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, now())
       ON CONFLICT (id) DO UPDATE SET
         hero_title = $1, hero_subtitle = $2, hero_cta_label = $3, hero_fallback_image = $4,
         exhibition_caption = $5, exhibition_fallback_image = $6,
         about_quote = $7, about_byline = $8, about_image = $9,
         newsletter_title = $10, newsletter_body = $11, updated_at = now()
       RETURNING *`,
      [
        hero_title,
        hero_subtitle,
        hero_cta_label,
        hero_fallback_image,
        exhibition_caption,
        exhibition_fallback_image,
        about_quote,
        about_byline,
        about_image,
        newsletter_title,
        newsletter_body,
      ],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/home error:", err);
    res.status(500).json({ error: "Could not save home content" });
  }
});

module.exports = router;
