"use client";

import { useI18n } from "@/context/I18nContext";
import Link from "next/link";

const icons = [
  // Package tours
  <svg key="0" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Hotel
  <svg key="1" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  // Transfer
  <svg key="2" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  // Guide
  <svg key="3" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
];

const serviceImages = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
];

type ServiceItem = {
  title: string;
  description: string;
  longDesc: string;
  features: string[];
};

export default function ServicesPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {t.services.sectionTitle}
          </h1>
          <p className="text-blue-100 text-lg mt-4 max-w-xl mx-auto">
            {t.services.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {t.services.items.map((item: ServiceItem, idx: number) => (
            <div
              key={idx}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}
            >
              {/* Image */}
              <div className="lg:w-1/2 w-full">
                <div
                  className="h-72 sm:h-80 rounded-2xl bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: `url('${serviceImages[idx]}')` }}
                />
              </div>

              {/* Content */}
              <div className="lg:w-1/2 w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {item.title}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.longDesc}
                </p>
                {/* Features grid */}
                <div className="grid grid-cols-2 gap-3">
                  {item.features.map((feat: string, fi: number) => (
                    <div key={fi} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-blue-100 text-lg mb-8">{t.cta.subtitle}</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white rounded-full font-semibold transition-all"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
