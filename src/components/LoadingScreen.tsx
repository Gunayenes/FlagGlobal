"use client";

import { useState, useEffect } from "react";

const LOADED_KEY = "__fg_loaded";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem(LOADED_KEY);
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const fadeTimer = setTimeout(() => setFadeOut(true), 1000);
    const removeTimer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem(LOADED_KEY, "1");
    }, 1400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-blue-900 flex items-center justify-center transition-opacity duration-400 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="relative mb-8">
          <div className="text-5xl sm:text-6xl font-bold text-white animate-pulse">
            Flag<span className="text-amber-500">Global</span>
          </div>
          <div className="absolute -inset-8 border-2 border-white/10 rounded-full" />
          <div className="absolute -inset-8 border-2 border-transparent border-t-amber-500 rounded-full animate-spin" />
        </div>
        <div className="w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}
