"use client";

import { useEffect, useState, useRef } from "react";
import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setFlipping(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
              setTimeout(() => setFlipping(false), 300);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const digits = count.toLocaleString().split("");

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-white inline-flex items-baseline">
      {digits.map((char, i) => (
        <span
          key={`${i}-${char}`}
          className={char !== "," && char !== "." ? "counter-digit" : ""}
          style={char !== "," && char !== "." ? { animationDelay: `${i * 0.05}s` } : {}}
        >
          {char}
        </span>
      ))}
      {suffix && <span className={flipping ? "counter-digit" : ""}>{suffix}</span>}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useI18n();
  const anim = useScrollAnimation(0.2);

  const stats = t.stats?.items || [];

  return (
    <section className="py-20 section-glass-dark text-white">
      <div
        ref={anim.ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll ${anim.isVisible ? "visible" : ""}`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat: { value: number; suffix: string; label: string }, idx: number) => (
            <div key={idx} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-blue-200 mt-3 text-sm sm:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
