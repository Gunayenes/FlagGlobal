"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const hovered = useRef(false);
  const raf = useRef<number>(0);

  const animate = useCallback(() => {
    // Smooth lag for the ring
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${hovered.current ? 1.8 : 1})`;
    }

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Only on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer, .group");
      hovered.current = !!isInteractive;

      if (dotRef.current) {
        dotRef.current.style.background = isInteractive
          ? "rgba(245,158,11,0.9)"
          : "rgba(255,255,255,0.9)";
      }
      if (ringRef.current) {
        ringRef.current.style.borderColor = isInteractive
          ? "rgba(245,158,11,0.5)"
          : "rgba(255,255,255,0.35)";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  return (
    <>
      {/* Small precise dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "background 0.3s, opacity 0.3s",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.35)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "border-color 0.3s, opacity 0.3s, transform 0.15s ease-out",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
