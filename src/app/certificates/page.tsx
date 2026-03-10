"use client";

import CertificatesSection from "@/components/CertificatesSection";
import { useI18n } from "@/context/I18nContext";

export default function CertificatesPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {t.certificates.sectionTitle}
          </h1>
          <p className="text-blue-100 text-lg mt-4 max-w-xl mx-auto">
            {t.certificates.subtitle}
          </p>
        </div>
      </section>

      <CertificatesSection />
    </>
  );
}
