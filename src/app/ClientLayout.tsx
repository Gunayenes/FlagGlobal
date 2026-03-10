"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { I18nProvider } from "@/context/I18nContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    setPageReady(false);
    // Scroll to top on route change
    window.scrollTo(0, 0);
    // Small delay for smooth fade-in
    const t = requestAnimationFrame(() => setPageReady(true));
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  return (
    <I18nProvider>
      <LoadingScreen />
      <ScrollProgressBar />
      <div className="fixed-bg" aria-hidden="true" />
      <Navbar />
      <main
        className={`transition-opacity duration-300 ease-out ${
          pageReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </I18nProvider>
  );
}
