"use client";

import ProductReview from "@/components/ProductReview";
import ProductGallery from "@/components/ProductGallery";
import ProductDetail from "@/components/ProductDetail";
import ProductHeader from "@/components/ProductHeader";
import ProductFooter from "@/components/ProductFooter";
import ProductBanner from "@/components/ProductBanner";
import ProductList from "@/components/ProductList";
import { productImages, lifestyleImages, reviews } from "@/data/data.json";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function HeadlessDemo() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "ProductPage");
  }
  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 md:pb-0 selection:bg-black selection:text-white">
      <SpeedInsights />
      <Analytics />
      <ProductBanner />
      <ProductHeader />
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
        <ProductGallery productImages={productImages} />
        <ProductDetail />
      </main>
      <ProductList lifestyleImages={lifestyleImages} />
      <ProductReview reviews={reviews} />
      <ProductFooter />
    </div>
  );
}
