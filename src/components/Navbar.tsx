"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { t, locale, switchLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/destinations", label: t.nav.destinations },
    { href: "/hotels", label: t.nav.hotels },
    { href: "/services", label: t.nav.services },
    { href: "/certificates", label: t.nav.certificates },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`text-2xl font-bold tracking-tight transition-colors ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              Flag<span className="text-amber-500">Global</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                  pathname === link.href
                    ? "text-amber-500"
                    : scrolled
                    ? "text-gray-700"
                    : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Lang switch */}
            <button
              onClick={switchLocale}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                scrolled
                  ? "border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-blue-900"
              }`}
            >
              {locale === "tr" ? "EN" : "TR"}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={switchLocale}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                scrolled
                  ? "border-blue-900 text-blue-900"
                  : "border-white text-white"
              }`}
            >
              {locale === "tr" ? "EN" : "TR"}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 bg-white shadow-lg" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-amber-50 text-amber-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
