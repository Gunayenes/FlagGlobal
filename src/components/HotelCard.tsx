interface HotelCardProps {
  name: string;
  city: string;
  stars: number;
  description: string;
  features: string[];
  image: string;
  starsLabel: string;
  viewDetailsLabel: string;
  onClick?: () => void;
}

export default function HotelCard({ name, city, stars, description, features, image, starsLabel, viewDetailsLabel, onClick }: HotelCardProps) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group card-shine hover-float"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
          style={{ backgroundImage: `url('${image}')` }}
        />
        {/* Stars badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 rounded-full text-xs font-bold text-white">
            {"★".repeat(stars)} {stars} {starsLabel}
          </span>
        </div>
        {/* City badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {city}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features.slice(0, 4).map((feat, i) => (
            <span key={i} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-800 rounded-full">
              {feat}
            </span>
          ))}
          {features.length > 4 && (
            <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">
              +{features.length - 4}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button className="w-full py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {viewDetailsLabel}
        </button>
      </div>
    </div>
  );
}
