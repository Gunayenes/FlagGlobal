"use client";

import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function TeamSection() {
  const { t } = useI18n();
  const titleAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation(0.1);

  const team = t.team?.members || [];

  return (
    <section className="py-24 section-glass-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleAnim.ref}
          className={`text-center mb-16 animate-on-scroll ${titleAnim.isVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.team?.sectionTitle}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.team?.subtitle}
          </p>
        </div>

        <div
          ref={cardsAnim.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member: { name: string; role: string; initial: string }, idx: number) => (
            <div
              key={idx}
              className={`animate-on-scroll delay-${idx + 1} ${cardsAnim.isVisible ? "visible" : ""}`}
            >
              <div className="group text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-500">
                  {member.initial}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-amber-600 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
