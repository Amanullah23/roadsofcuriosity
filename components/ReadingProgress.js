"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", update);
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const lineColor =
    theme === "dark" ? "rgba(232,228,222,0.7)" : "rgba(26,26,26,0.6)";

  return (
    <div
      style={{
        position: "fixed",
        top: "56px",
        left: 0,
        right: 0,
        height: "1px",
        zIndex: 99,
        background:
          theme === "dark" ? "rgba(232,228,222,0.08)" : "rgba(26,26,26,0.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: lineColor,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
