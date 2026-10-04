"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({
  children,
  delay = 0,
  duration = 600,
  style = {},
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration}ms ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
