"use client";

import { useI18n } from "@/context/I18nContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import DestinationCard from "./DestinationCard";

const destinationImages = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800&q=80",
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
];

export default function DestinationsSection() {
  const { t } = useI18n();
  const titleAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation(0.1);

  return (
    <section className="py-24 section-glass-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleAnim.ref}
          className={`text-center mb-16 animate-on-scroll ${titleAnim.isVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.destinations.sectionTitle}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.destinations.subtitle}
          </p>
        </div>

        <div
          ref={cardsAnim.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.destinations.items.map(
            (item: { name: string; description: string }, idx: number) => (
              <div
                key={idx}
                className={`animate-scale delay-${idx + 1} ${cardsAnim.isVisible ? "visible" : ""}`}
              >
                <DestinationCard
                  name={item.name}
                  description={item.description}
                  image={destinationImages[idx]}
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
