import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flag Global | Turizm ve Seyahat",
  description:
    "Flag Global - Güvenilir ve profesyonel turizm hizmetleri. Antalya, Bodrum, Kapadokya, İstanbul ve daha fazlası.",
  keywords:
    "turizm, seyahat, tatil, Antalya, Bodrum, Kapadokya, İstanbul, Flag Global, tur, otel",
  openGraph: {
    title: "Flag Global | Turizm ve Seyahat",
    description:
      "Flag Global ile unutulmaz seyahat deneyimleri yaşayın.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
