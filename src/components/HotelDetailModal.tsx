"use client";

import { useEffect, useState } from "react";

interface HotelDetailModalProps {
  hotel: {
    name: string;
    city: string;
    stars: number;
    description: string;
    features: string[];
    highlights: string[];
  };
  labels: {
    highlights: string;
    gallery: string;
    location: string;
    close: string;
    stars: string;
    features: string;
  };
  onClose: () => void;
}

const hotelCoordinates: Record<string, [number, number]> = {
  "Pine Bay Holiday Resort": [37.8530, 27.2620],
  "Korumar Hotel De Luxe": [37.8570, 27.2580],
  "DoubleTree by Hilton Kuşadası": [37.8590, 27.2640],
  "Voyage Torba": [37.0730, 27.4550],
  "Kempinski Hotel Barbaros Bay": [37.0380, 27.4370],
  "Mandarin Oriental Bodrum": [37.0340, 27.4320],
  "Casa De Maris SPA & Resort": [36.8490, 28.2700],
  "Titanic Deluxe Belek": [36.8600, 31.0540],
  "Rixos Premium Belek": [36.8560, 31.0640],
  "Alaiye Resort & SPA": [36.5440, 31.9900],
  "Swissotel The Bosphorus": [41.0460, 28.9950],
  "Museum Hotel": [38.6340, 34.8290],
  "Radisson Blu Hotel Trabzon": [41.0020, 39.7170],
  "Ayder Resort Hotel": [40.9520, 41.0960],
  "Çelik Palas Hotel": [40.1860, 29.0410],
  "Kolin Hotel": [40.1480, 26.4060],
  "JW Marriott Hotel Ankara": [39.9040, 32.8630],
};

const hotelGallery: Record<string, string[]> = {
  "Pine Bay Holiday Resort": [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  ],
  "Korumar Hotel De Luxe": [
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  ],
  "DoubleTree by Hilton Kuşadası": [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
  ],
  "Voyage Torba": [
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
  ],
  "Kempinski Hotel Barbaros Bay": [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  ],
  "Mandarin Oriental Bodrum": [
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
  ],
  "Casa De Maris SPA & Resort": [
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
  ],
  "Titanic Deluxe Belek": [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  ],
  "Rixos Premium Belek": [
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
  ],
  "Alaiye Resort & SPA": [
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  ],
  "Swissotel The Bosphorus": [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  ],
  "Museum Hotel": [
    "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  ],
  "Radisson Blu Hotel Trabzon": [
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  ],
  "Ayder Resort Hotel": [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  ],
  "Çelik Palas Hotel": [
    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  ],
  "Kolin Hotel": [
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  ],
  "JW Marriott Hotel Ankara": [
    "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  ],
};

export default function HotelDetailModal({ hotel, labels, onClose }: HotelDetailModalProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = hotelGallery[hotel.name] || [];
  const coords = hotelCoordinates[hotel.name];

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const mapUrl = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords[1] - 0.01}%2C${coords[0] - 0.01}%2C${coords[1] + 0.01}%2C${coords[0] + 0.01}&layer=mapnik&marker=${coords[0]}%2C${coords[1]}`
    : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label={labels.close}
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Photo Gallery */}
        <div className="relative">
          {/* Main Photo */}
          {photos.length > 0 && (
            <div className="relative h-72 sm:h-96 overflow-hidden rounded-t-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url('${photos[activePhoto]}')` }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-20" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  {labels.gallery} — {activePhoto + 1}/{photos.length}
                </span>
              </div>
            </div>
          )}

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="flex gap-2 px-6 -mt-8 relative z-10">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activePhoto === i ? "border-amber-500 shadow-lg scale-105" : "border-white/80 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${photo}')` }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{hotel.name}</h2>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 rounded-full text-xs font-bold text-white">
                {"★".repeat(hotel.stars)} {hotel.stars} {labels.stars}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {hotel.city}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{hotel.description}</p>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">{labels.features}</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.features.map((feat, i) => (
                <span key={i} className="text-sm px-3 py-1.5 bg-blue-50 text-blue-800 rounded-full">
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">{labels.highlights}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hotel.highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          {mapUrl && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">{labels.location}</h3>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src={mapUrl}
                  className="w-full h-64 sm:h-80"
                  style={{ border: 0 }}
                  loading="lazy"
                  title={`${hotel.name} - ${labels.location}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
