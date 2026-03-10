"use client";

import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CertificatesSection() {
  const { t } = useI18n();
  const titleAnim = useScrollAnimation();
  const docsAnim = useScrollAnimation(0.1);
  const certsAnim = useScrollAnimation(0.1);
  const partnersAnim = useScrollAnimation(0.1);

  return (
    <section className="py-24 section-glass-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleAnim.ref}
          className={`text-center mb-16 animate-on-scroll ${titleAnim.isVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.certificates.sectionTitle}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.certificates.subtitle}
          </p>
        </div>

        {/* Company Documents */}
        <div
          ref={docsAnim.ref}
          className={`mb-16 animate-on-scroll ${docsAnim.isVisible ? "visible" : ""}`}
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            {t.certificates.companyDocs}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.certificates.companyDocsList.map((doc: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tourism Certificates */}
        <div
          ref={certsAnim.ref}
          className={`mb-16 animate-on-scroll ${certsAnim.isVisible ? "visible" : ""}`}
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            {t.certificates.tourismCerts}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.certificates.tourismCertsList.map((cert: string, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div
          ref={partnersAnim.ref}
          className={`animate-on-scroll ${partnersAnim.isVisible ? "visible" : ""}`}
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            {t.certificates.partners}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {["TÜRSAB", "IATA", "UNWTO", "TURSAB", "ISO"].map((partner, idx) => (
              <div
                key={idx}
                className="w-32 h-20 bg-white rounded-xl shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <span className="text-gray-400 font-bold text-lg">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
