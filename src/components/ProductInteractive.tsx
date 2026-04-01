"use client";

import { useState, useEffect } from "react";
import { trackLinkClick, pageview } from "@/lib/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import ProductBenefits from "./ProductBenefits";

const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN;
const VARIANT_ID = process.env.NEXT_PUBLIC_VARIANT_ID;
const STORE_DOMAIN = process.env.NEXT_PUBLIC_STORE_DOMAIN;

export default function ProductInteractive() {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const price = 45;
  const isDisabled = isAdding ? true : false;

  useEffect(() => {
    pageview(pathname + searchParams.toString());
  }, [pathname, searchParams]);

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setIsAdding(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "Daily Radiant Complex",
      });
    }
  }, []);

  const handleAddToCart = async () => {
    setIsAdding(true);
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "AddToCart", {
        value: price * quantity,
        currency: "USD",
        content_ids: [VARIANT_ID],
        content_type: "product",
      });
    }
    if (typeof window.gtag === "function") {
      trackLinkClick(
        pathname + searchParams.toString(),
        `Add to Cart — $${price * quantity}`,
      );
    }
    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { checkoutUrl }
          userErrors { field message }
        }
      }
    `;

    const variables = {
      input: { lines: [{ merchandiseId: VARIANT_ID, quantity: quantity }] },
    };

    try {
      const response = await fetch(
        `https://${STORE_DOMAIN}/api/2026-01/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN || "",
          },
          body: JSON.stringify({ query, variables }),
        },
      );

      const { data, errors } = await response.json();

      if (errors || data?.cartCreate?.userErrors?.length > 0) {
        setIsAdding(false);
        console.log(
          errors
            ? "API Error."
            : `Shopify Error: ${data.cartCreate.userErrors[0].message}`,
        );
        return;
      }

      const shopifyCheckoutUrl = data?.cartCreate?.cart?.checkoutUrl;
      if (shopifyCheckoutUrl) {
        const checkoutUrlObj = new URL(shopifyCheckoutUrl);
        const currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.forEach((value, key) => {
          checkoutUrlObj.searchParams.append(key, value);
        });

        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "InitiateCheckout", {
            content_ids: [VARIANT_ID],
            content_type: "product",
            value: price * quantity,
            currency: "USD",
          });
        }
        if (typeof window.gtag === "function") {
          trackLinkClick(
            checkoutUrlObj.toString(),
            `Add to Cart — $${price * quantity}`,
          );
        }
        window.location.href = checkoutUrlObj.toString();
      }
    } catch (error) {
      setIsAdding(false);
      console.log("Failed to connect to Shopify.", error);
    }
  };

  return (
    <>
      <div className="flex items-end gap-3 mb-8">
        <span className="text-5xl font-light tracking-tight">
          ${price * quantity}
        </span>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-32">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-2xl font-light text-gray-500 hover:text-black cursor-pointer"
          >
            −
          </button>
          <span className="font-bold text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-2xl font-light text-gray-500 hover:text-black cursor-pointer"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isDisabled}
          className="flex-1 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition-all shadow-xl active:scale-[0.98] flex justify-center items-center cursor-pointer"
        >
          {isAdding ? "Processing..." : `Add to Cart — $${price * quantity}`}
        </button>
      </div>

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

      {/* Mobile Sticky CTA (Rendered here because it needs the exact same state) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 pb-8 z-50 flex gap-4 items-center shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="flex-1 flex flex-col">
          <span className="text-xl font-black">${price * quantity}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isDisabled}
          className="flex-2 bg-black text-white py-4 px-6 rounded-xl font-bold hover:bg-gray-900 active:scale-95 transition-all text-lg"
        >
          {isAdding ? "Processing..." : "Add to Cart"}
        </button>
      </div>
    </>
  );
}
