"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const color = theme === "dark" ? "#e8e4de" : "#1a1a1a";
  const border =
    theme === "dark" ? "rgba(232,228,222,0.15)" : "rgba(26,26,26,0.15)";
  const bg = theme === "dark" ? "#0d0d0b" : "#fafaf8";

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 90,
        background: bg,
        border: `1px solid ${border}`,
        color,
        width: "42px",
        height: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 0.8 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition:
          "opacity 0.3s ease, transform 0.3s ease, border-color 0.2s ease",
        fontSize: "0.75rem",
        fontFamily: "Georgia, serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.8";
        e.currentTarget.style.borderColor = border;
      }}
    >
      ↑
    </button>
  );
}
