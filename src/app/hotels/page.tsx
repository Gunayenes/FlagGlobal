"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import HotelCard from "@/components/HotelCard";

const hotelImages: Record<string, string> = {
  "Pine Bay Holiday Resort": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "Korumar Hotel De Luxe": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  "DoubleTree by Hilton Kuşadası": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  "Voyage Torba": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  "Kempinski Hotel Barbaros Bay": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "Mandarin Oriental Bodrum": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
  "Casa De Maris SPA & Resort": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
  "Titanic Deluxe Belek": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "Rixos Premium Belek": "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
  "Alaiye Resort & SPA": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
  "Swissotel The Bosphorus": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  "Museum Hotel": "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80",
  "Radisson Blu Hotel Trabzon": "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
  "Ayder Resort Hotel": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  "Çelik Palas Hotel": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
  "Kolin Hotel": "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
  "JW Marriott Hotel Ankara": "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
};

type HotelItem = {
  name: string;
  city: string;
  region: string;
  stars: number;
  description: string;
  features: string[];
};

export default function HotelsPage() {
  const { t } = useI18n();
  const [activeCity, setActiveCity] = useState("all");

  const cities = [...new Set(t.hotels.items.map((item: HotelItem) => item.city))] as string[];

  const filteredItems = activeCity === "all"
    ? t.hotels.items
    : t.hotels.items.filter((item: HotelItem) => item.city === activeCity);

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {t.hotels.sectionTitle}
          </h1>
          <p className="text-blue-100 text-lg mt-4 max-w-2xl mx-auto">
            {t.hotels.pageSubtitle}
          </p>
        </div>
      </section>

      {/* City Filter + Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* City Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <button
              onClick={() => setActiveCity("all")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCity === "all"
                  ? "bg-blue-900 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-900 hover:text-blue-900"
              }`}
            >
              {t.hotels.allCities}
            </button>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCity === city
                    ? "bg-blue-900 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-900 hover:text-blue-900"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Hotel Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item: HotelItem) => (
              <HotelCard
                key={item.name}
                name={item.name}
                city={item.city}
                stars={item.stars}
                description={item.description}
                features={item.features}
                image={hotelImages[item.name] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"}
                starsLabel={t.hotels.stars}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
