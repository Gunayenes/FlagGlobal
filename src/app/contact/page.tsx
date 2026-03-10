"use client";

import ContactSection from "@/components/ContactSection";
import { useI18n } from "@/context/I18nContext";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {t.contact.sectionTitle}
          </h1>
          <p className="text-blue-100 text-lg mt-4 max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
