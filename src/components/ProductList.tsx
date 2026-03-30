import Image from "next/image";

interface ProductListProps {
  lifestyleImages: string[];
}

export default function ProductList({ lifestyleImages }: ProductListProps) {
  return (
    <section className="bg-gray-50 py-24 border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
            Real Results. Zero Filters.
          </h2>
          <p className="text-gray-500 text-lg">
            Join 50,000+ women who have upgraded their daily ritual.
          </p>
        </div>

        {/* Heavy Masonry/Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {lifestyleImages.map((img, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden group ${i === 0 || i === 3 ? "md:col-span-2 aspect-video" : "aspect-square"}`}
            >
              <Image
                src={img}
                width="1200"
                height="1200"
                alt={`Lifestyle ${i}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              {/* Fake Instagram Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold tracking-widest uppercase">
                  Shop Look
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
