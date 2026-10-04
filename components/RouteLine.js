"use client";

// Roads of Curiosity — the signature wayfinding device.
// Target: components/RouteLine.js
//
// A single hand-drawn line thread down the spine of a page, tracing
// itself as the reader scrolls, with named waypoints (not numbers) —
// a literal road, since the content is literally about roads.
// Desktop/tablet only; hidden on narrow viewports via CSS (see page files).

import { useEffect, useRef, useState } from "react";

const PETROL = "#294B4A";
const GOLD = "#C99A4E";
const RULE = "#D6CFC3";
const FAINT = "#7A7D7B";

export default function RouteLine({ waypoints = [] }) {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const [height, setHeight] = useState(1200);
  const [pathLength, setPathLength] = useState(1);
  const [progress, setProgress] = useState(0);

  // Measure the wrapper's rendered height (it spans the whole page section it's dropped into)
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current?.parentElement) {
        setHeight(wrapRef.current.parentElement.offsetHeight);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current?.parentElement)
      ro.observe(wrapRef.current.parentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, [height]);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const traveled = vh * 0.6 - rect.top;
      const p = Math.min(1, Math.max(0, traveled / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gentle, organic S-curve — never a straight ruled line.
  const h = height;
  const d = `M 22 0 C 4 ${h * 0.12}, 40 ${h * 0.22}, 20 ${h * 0.34}
             S 2 ${h * 0.5}, 24 ${h * 0.6}
             S 42 ${h * 0.76}, 18 ${h * 0.86}
             S 4 ${h * 0.95}, 22 ${h}`;

  return (
    <div
      ref={wrapRef}
      className="route-line"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "52px",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg
        width="52"
        height={h}
        viewBox={`0 0 52 ${h}`}
        style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
      >
        {/* Faint full-length guide */}
        <path d={d} fill="none" stroke={RULE} strokeWidth="1.5" />

        {/* The traced portion */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={PETROL}
          strokeWidth="1.5"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength * (1 - progress)}
        />

        {/* Waypoints */}
        {waypoints.map((wp, i) => {
          const frac = waypoints.length > 1 ? i / (waypoints.length - 1) : 0;
          const y = frac * h;
          const reached = progress >= frac - 0.015;
          return (
            <g key={i} transform={`translate(22, ${y})`}>
              <circle
                r={reached ? 4.5 : 3}
                fill={reached ? GOLD : "#F4EEE3"}
                stroke={PETROL}
                strokeWidth="1.4"
                style={{ transition: "r 0.4s ease, fill 0.4s ease" }}
              />
              <text
                x="16"
                y="4"
                className="route-line-label"
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: "0.68rem",
                  fill: reached ? PETROL : FAINT,
                  transition: "fill 0.4s ease",
                }}
              >
                {wp}
              </text>
            </g>
          );
        })}
      </svg>

      <style>{`
        @media (max-width: 1100px) {
          .route-line-label { display: none; }
        }
        @media (max-width: 860px) {
          .route-line { display: none !important; }
        }
      `}</style>
    </div>
  );
}
