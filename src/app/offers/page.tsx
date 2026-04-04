import ProductReview from "@/components/ProductReview";
import ProductGallery from "@/components/ProductGallery";
import ProductInteractive from "@/components/ProductInteractive";
import ProductHeader from "@/components/ProductHeader";
import ProductFooter from "@/components/ProductFooter";
import ProductList from "@/components/ProductList";
import ProducDetail from "@/components/ProductDetail";
import ProductBenefits from "@/components/ProductBenefits";
import { productImages, lifestyleImages, reviews } from "@/data/data.json";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";

export default function Offers() {
  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 md:pb-0 selection:bg-black selection:text-white">
      <SpeedInsights />
      <Analytics />
      <ProductHeader />
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
        <ProductGallery productImages={productImages} />
        <div className="flex flex-col pt-4">
          <ProducDetail />
          <Suspense
            fallback={
              <div className="animate-pulse bg-gray-100 rounded-2xl h-40" />
            }
          >
            <ProductInteractive />
          </Suspense>
          <div className="border-t border-gray-200 divide-y divide-gray-200 text-sm font-medium">
            <ProductBenefits
              title="Clinical Benefits"
              description="Formulated with 500mg of highly bioavailable Phytoceramides and 200mg of Hyaluronic Acid. In a 12-week double-blind study, 89% of participants noted significant improvement in skin elasticity and moisture retention."
            />
            <ProductBenefits
              title="Full Ingredient List"
              description="Vitamin C (as Ascorbic Acid), Zinc (as Zinc Picolinate), Liposomal Ceramide Complex, Organic Ashwagandha Root Extract, Bamboo Silica. *Contains absolutely no proprietary blends.*"
            />
          </div>
        </div>
      </main>
      <ProductList lifestyleImages={lifestyleImages} />
      <ProductReview reviews={reviews} />
      <ProductFooter />
    </div>
  );
}
