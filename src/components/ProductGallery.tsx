"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  productImages: string[];
}

export default function ProductGallery({ productImages }: ProductGalleryProps) {
  const [mainImg, setMainImg] = useState(0);

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-28">
      <div className="relative aspect-square md:aspect-4/5 bg-gray-50 rounded-3xl overflow-hidden cursor-zoom-in group">
        <Image
          src={productImages[mainImg]}
          width="1200"
          height="1200"
          alt="Main Product"
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
          loading="eager"
        />
        {/* Overlay Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
            Bestseller
          </span>
          <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
            Award Winning
          </span>
        </div>
        {/* Carousel Controls */}
        <button
          onClick={() =>
            setMainImg((prev) =>
              prev === 0 ? productImages.length - 1 : prev - 1,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          ←
        </button>
        <button
          onClick={() =>
            setMainImg((prev) =>
              prev === productImages.length - 1 ? 0 : prev + 1,
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          →
        </button>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {productImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImg(idx)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImg === idx ? "border-black" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            <Image
              src={img}
              width="1200"
              height="1200"
              alt={`Thumb ${idx}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
