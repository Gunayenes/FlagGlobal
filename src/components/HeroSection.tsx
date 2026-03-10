"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

const heroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=1920&q=80",
];

export default function HeroSection() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const prevTitle = useRef("");

  const goTo = useCallback((idx: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const title = t.hero.title;
    if (prevTitle.current === title) return;
    prevTitle.current = title;
    setDisplayedTitle("");
    setTypewriterDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedTitle(title.slice(0, i));
      if (i >= title.length) {
        clearInterval(interval);
        setTypewriterDone(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [t.hero.title]);

  // Cursor glow
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (glowRef.current) {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        glowRef.current.style.left = `${e.clientX - rect.left}px`;
        glowRef.current.style.top = `${e.clientY - rect.top}px`;
      }
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background slides with parallax */}
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${img}')`,
            transform: `translateY(${parallaxY}px) scale(1.1)`,
          }}
        />
      ))}
      <div className={`absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-blue-900/80 transition-opacity duration-500 ${isTransitioning ? "opacity-90" : "opacity-100"}`} />

      {/* Cursor glow */}
      <div ref={glowRef} className="cursor-glow" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 8}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight gradient-text">
          {displayedTitle}
          {!typewriterDone && <span className="typewriter-cursor">&nbsp;</span>}
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          {t.hero.subtitle}
        </p>
        <Link
          href="/destinations"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:shadow-xl hover:-translate-y-0.5 glow-button"
        >
          {t.hero.cta}
        </Link>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? "bg-amber-500 w-10" : "bg-white/50 w-6 hover:bg-white/80"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
