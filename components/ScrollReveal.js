"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 700,
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
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (visible) return "translate(0, 0)";
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.25,0.1,0.25,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.25,0.1,0.25,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
