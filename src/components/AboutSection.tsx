"use client";

import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const { t } = useI18n();
  const imgAnim = useScrollAnimation();
  const textAnim = useScrollAnimation();

  return (
    <section className="py-24 section-glass mesh-gradient noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            ref={imgAnim.ref}
            className={`relative animate-slide-left ${imgAnim.isVisible ? "visible" : ""}`}
          >
            <div
              className={`aspect-[4/3] rounded-2xl bg-cover bg-center shadow-2xl curtain-reveal ${imgAnim.isVisible ? "revealed" : ""}`}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80')",
              }}
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 rounded-2xl -z-10" />
          </div>

          {/* Text */}
          <div
            ref={textAnim.ref}
            className={`animate-slide-right ${textAnim.isVisible ? "visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {t.about.sectionTitle}
              <span className={`heading-line ${textAnim.isVisible ? "animate" : ""}`} />
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.about.shortDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
