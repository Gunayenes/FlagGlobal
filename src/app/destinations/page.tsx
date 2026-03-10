"use client";

import { useI18n } from "@/context/I18nContext";
import DestinationCard from "@/components/DestinationCard";

const destinationImages = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800&q=80",
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
];

export default function DestinationsPage() {
  const { t } = useI18n();

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

      {/* Destinations Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.destinations.items.map(
              (item: { name: string; description: string }, idx: number) => (
                <DestinationCard
                  key={idx}
                  name={item.name}
                  description={item.description}
                  image={destinationImages[idx]}
                />
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
