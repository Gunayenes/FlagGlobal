"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function FAQSection() {
  const { t } = useI18n();
  const titleAnim = useScrollAnimation();
  const contentAnim = useScrollAnimation(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = t.faq?.items || [];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 section-glass">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleAnim.ref}
          className={`text-center mb-16 animate-on-scroll ${titleAnim.isVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.faq?.sectionTitle}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.faq?.subtitle}
          </p>
        </div>

        <div
          ref={contentAnim.ref}
          className={`space-y-4 animate-on-scroll ${contentAnim.isVisible ? "visible" : ""}`}
        >
          {faqs.map((item: { question: string; answer: string }, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === idx}
              >
                <span className="text-gray-900 font-semibold pr-4">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-amber-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="px-6 text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
