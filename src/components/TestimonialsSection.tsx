"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function TestimonialsSection() {
  const { t } = useI18n();
  const titleAnim = useScrollAnimation();
  const cardAnim = useScrollAnimation(0.1);
  const [current, setCurrent] = useState(0);

  const testimonials = t.testimonials?.items || [];
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, total]);

  if (total === 0) return null;

  const item = testimonials[current];

  return (
    <section className="py-24 section-glass">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleAnim.ref}
          className={`text-center mb-16 animate-on-scroll ${titleAnim.isVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.testimonials?.sectionTitle}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.testimonials?.subtitle}
          </p>
        </div>

        <div
          ref={cardAnim.ref}
          className={`relative animate-on-scroll ${cardAnim.isVisible ? "visible" : ""}`}
        >
          {/* Quote card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Decorative quote mark */}
            <div className="absolute top-4 left-6 text-8xl text-amber-500/10 font-serif leading-none select-none">
              &ldquo;
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed italic mb-8 relative z-10 transition-opacity duration-500">
              &ldquo;{item.text}&rdquo;
            </p>

            {/* Avatar + name */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-900 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                {item.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-600 flex items-center justify-center transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_: unknown, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === current ? "bg-amber-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-600 flex items-center justify-center transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
