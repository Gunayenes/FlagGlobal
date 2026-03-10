"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import DestinationCard from "@/components/DestinationCard";

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
  "Çanakkale": "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
  "Bursa": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
  "Kapadokya": "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80",
  "Cappadocia": "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80",
  "Ankara": "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
  "Trabzon": "https://images.unsplash.com/photo-1572953109213-3be62398eb95?w=800&q=80",
  "Rize": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
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

export default function DestinationsPage() {
  const { t } = useI18n();
  const [activeRegion, setActiveRegion] = useState("all");

  const regions = Object.keys(t.destinations.regions) as string[];

  const filteredItems = activeRegion === "all"
    ? t.destinations.items
    : t.destinations.items.filter((item: DestinationItem) => item.region === activeRegion);

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {t.destinations.sectionTitle}
          </h1>
          <p className="text-blue-100 text-lg mt-4 max-w-xl mx-auto">
            {t.destinations.subtitle}
          </p>
        </div>
      </section>

      {/* Region Filter + Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Region Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item: DestinationItem) => (
              <DestinationCard
                key={item.name}
                name={item.name}
                description={item.description}
                image={destinationImages[item.name] || "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80"}
                region={item.region}
                regionLabel={t.destinations.regions[item.region]}
                highlights={item.highlights}
                icon={regionIcons[item.region] || "🏛️"}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
