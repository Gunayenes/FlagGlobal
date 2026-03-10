"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import tr from "@/locales/tr.json";
import en from "@/locales/en.json";

type Locale = "tr" | "en";

/* eslint-disable @typescript-eslint/no-explicit-any */
const translations: Record<Locale, any> = { tr, en };

interface I18nContextType {
  locale: Locale;
  t: any;
  switchLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const switchLocale = useCallback(() => {
    setLocale((prev) => (prev === "tr" ? "en" : "tr"));
  }, []);

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, t, switchLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
