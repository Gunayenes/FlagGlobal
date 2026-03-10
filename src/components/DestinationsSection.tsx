"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import DestinationCard from "./DestinationCard";

const destinationImages: Record<string, string> = {
  "Kuşadası": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
  "Bodrum": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "Muğla": "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80",
  "İzmir": "https://images.unsplash.com/photo-1563284223-333497472e88?w=800&q=80",
  "Antalya": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "Marmaris": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "Alanya": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
  "İstanbul": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
  "Istanbul": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
  "Çanakkale": "https://images.unsplash.com/photo-1568781269951-b50a89d02c68?w=800&q=80",
  "Bursa": "https://images.unsplash.com/photo-1564594326930-fd1072c5e01a?w=800&q=80",
  "Kapadokya": "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80",
  "Cappadocia": "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80",
  "Ankara": "https://images.unsplash.com/photo-1594817563715-8a4e1fa47e1e?w=800&q=80",
  "Trabzon": "https://images.unsplash.com/photo-1572953109213-3be62398eb95?w=800&q=80",
  "Rize": "https://images.unsplash.com/photo-1624367171718-14026220f3b1?w=800&q=80",
};

const regionIcons: Record<string, string> = {
  aegean: "🏛️",
  mediterranean: "☀️",
  marmara: "🏛️",
  blacksea: "🌲",
  central: "☀️",
};

type DestinationItem = {
  name: string;
  region: string;
  description: string;
  highlights: string[];
};

export default function DestinationsSection() {
  const { t } = useI18n();
  const [activeRegion, setActiveRegion] = useState("all");
  const titleAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation(0.05);

  const regions = Object.keys(t.destinations.regions) as string[];

  const filteredItems = activeRegion === "all"
    ? t.destinations.items
    : t.destinations.items.filter((item: DestinationItem) => item.region === activeRegion);

  return (
    <section className="py-24 section-glass-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleAnim.ref}
          className={`text-center mb-12 animate-on-scroll ${titleAnim.isVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.destinations.sectionTitle}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.destinations.subtitle}
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveRegion("all")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeRegion === "all"
                ? "bg-blue-900 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-900 hover:text-blue-900"
            }`}
          >
            {t.destinations.allRegions}
          </button>
          {regions.map((regionKey) => (
            <button
              key={regionKey}
              onClick={() => setActiveRegion(regionKey)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeRegion === regionKey
                  ? "bg-blue-900 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-900 hover:text-blue-900"
              }`}
            >
              {t.destinations.regions[regionKey]}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsAnim.ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredItems.map((item: DestinationItem, idx: number) => (
            <div
              key={item.name}
              className={`animate-on-scroll delay-${(idx % 4) + 1} ${cardsAnim.isVisible ? "visible" : ""}`}
            >
              <DestinationCard
                name={item.name}
                description={item.description}
                image={destinationImages[item.name] || "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80"}
                region={item.region}
                regionLabel={t.destinations.regions[item.region]}
                highlights={item.highlights}
                icon={regionIcons[item.region] || "🏛️"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
