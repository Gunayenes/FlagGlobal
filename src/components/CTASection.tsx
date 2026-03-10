"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CTASection() {
  const { t } = useI18n();
  const anim = useScrollAnimation(0.2);

  return (
    <section
      className="relative py-24 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-blue-900/80" />
      <div
        ref={anim.ref}
        className={`relative z-10 max-w-4xl mx-auto px-4 text-center text-white animate-on-scroll ${anim.isVisible ? "visible" : ""}`}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          {t.cta.title}
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          {t.cta.subtitle}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-10 py-4 rounded-full text-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
        >
          {t.cta.button}
        </Link>
      </div>
    </section>
  );
}
