interface DestinationCardProps {
  name: string;
  description: string;
  image: string;
  region: string;
  regionLabel: string;
  highlights: string[];
  icon: string;
}

const regionIcons: Record<string, string> = {
  aegean: "🏛️",
  mediterranean: "☀️",
  marmara: "🏛️",
  blacksea: "🌲",
  central: "☀️",
};

export default function DestinationCard({ name, description, image, region, regionLabel, highlights, icon }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
          style={{ backgroundImage: `url('${image}')` }}
        />
        {/* Region badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {regionLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>{icon || regionIcons[region] || "🏛️"}</span>
          {name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {highlights.map((tag, i) => (
              <span key={i} className="text-xs font-medium text-amber-600 hover:text-amber-700 cursor-default">
                {tag}
                {i < highlights.length - 1 && <span className="ml-2 text-gray-300">•</span>}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
