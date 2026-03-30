import { useState } from "react";

const STOREFRONT_TOKEN = process.env.STOREFRONT_TOKEN;
const VARIANT_ID = process.env.NEXT_PUBLIC_VARIANT_ID;
const STORE_DOMAIN = process.env.NEXT_PUBLIC_STORE_DOMAIN;

export default function ProductDetail() {
  const [purchaseType, setPurchaseType] = useState<"subscribe" | "onetime">(
    "subscribe",
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const price = purchaseType === "subscribe" ? 45 : 55;

  const handleAddToCart = async () => {
    setIsAdding(true);

    // 1. Your Authentication & Product Data
    // TODO: Paste your actual token and Global Variant ID here

    // 2. The GraphQL Mutation Payload
    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // We pass the quantity from your existing React state!
    const variables = {
      input: {
        lines: [
          {
            merchandiseId: VARIANT_ID,
            quantity: quantity,
          },
        ],
      },
    };

    try {
      // 3. Fire the request to Shopify's Edge Network
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
      console.log("data", data);
      console.log("errors", errors);

      // Catch GraphQL syntax errors
      if (errors) {
        console.error("GraphQL Syntax Error:", errors);
        setIsAdding(false);
        alert("API Error. Check your console.");
        return;
      }

      // Catch Shopify logic errors (e.g., out of stock, invalid ID format)
      if (data?.cartCreate?.userErrors?.length > 0) {
        console.error("Shopify Cart Error:", data.cartCreate.userErrors);
        setIsAdding(false);
        alert(`Shopify Error: ${data.cartCreate.userErrors[0].message}`);
        return;
      }

      // 4. The Handoff! Extract the URL and redirect the browser
      const checkoutUrl = data.cartCreate.cart.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Network Error:", error);
      setIsAdding(false);
      alert("Failed to connect to Shopify.");
    }
  };
  return (
    <div className="flex flex-col pt-4">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-6">
        <div className="flex text-black text-sm">★★★★★</div>
        <span className="text-sm font-semibold text-gray-500">
          4.9/5 (2,841 Reviews)
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 leading-[1.05]">
        Daily Radiant Complex
      </h1>
      <p className="text-lg text-gray-500 mb-8 leading-relaxed font-medium">
        A comprehensive liposomal matrix engineered to boost cellular hydration,
        optimize collagen synthesis, and repair the skin barrier from the inside
        out.
      </p>

      <div className="flex items-end gap-3 mb-8">
        <span className="text-5xl font-light tracking-tight">
          ${price * quantity}
        </span>
        {purchaseType === "subscribe" && (
          <span className="text-lg text-gray-400 line-through mb-1">
            ${55 * quantity}
          </span>
        )}
      </div>

      {/* Complex Purchase Type Toggle */}
      <div className="space-y-4 mb-8">
        {/* Subscribe Option */}
        <label
          className={`flex flex-col p-5 border-2 rounded-2xl cursor-pointer transition-all ${purchaseType === "subscribe" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          <input
            type="radio"
            name="purchaseType"
            value="subscribe"
            checked={purchaseType === "subscribe"}
            onChange={() => setPurchaseType("subscribe")}
            className="sr-only"
          />
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === "subscribe" ? "border-black" : "border-gray-300"}`}
              >
                {purchaseType === "subscribe" && (
                  <div className="w-2.5 h-2.5 bg-black rounded-full" />
                )}
              </div>
              <span className="font-bold text-lg">Subscribe & Save 18%</span>
            </div>
            <span className="font-bold">$45 / month</span>
          </div>
          <div className="pl-8 text-sm text-gray-500 font-medium">
            <ul className="space-y-1">
              <li>✓ Free priority shipping included</li>
              <li>✓ Cancel or pause anytime via SMS</li>
              <li>✓ Price locked in forever</li>
            </ul>
          </div>
        </label>

        {/* One Time Option */}
        <label
          className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${purchaseType === "onetime" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          <input
            type="radio"
            name="purchaseType"
            value="onetime"
            checked={purchaseType === "onetime"}
            onChange={() => setPurchaseType("onetime")}
            className="sr-only"
          />
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === "onetime" ? "border-black" : "border-gray-300"}`}
            >
              {purchaseType === "onetime" && (
                <div className="w-2.5 h-2.5 bg-black rounded-full" />
              )}
            </div>
            <span className="font-bold text-lg">One-time Purchase</span>
          </div>
          <span className="font-bold text-gray-500">$55</span>
        </label>
      </div>

      {/* Quantity & Add to Cart Row */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-32">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-2xl font-light text-gray-500 hover:text-black"
          >
            −
          </button>
          <span className="font-bold text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-2xl font-light text-gray-500 hover:text-black"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition-all shadow-xl active:scale-[0.98] flex justify-center items-center"
        >
          {isAdding
            ? "Securing Inventory..."
            : `Add to Cart — $${price * quantity}`}
        </button>
      </div>

      {/* Accordion Details (Simulating heavy text content) */}
      <div className="border-t border-gray-200 divide-y divide-gray-200 text-sm font-medium">
        <details className="group py-5 cursor-pointer" open>
          <summary className="flex justify-between items-center font-bold text-base list-none">
            Clinical Benefits{" "}
            <span className="group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="pt-4 text-gray-500 leading-relaxed">
            Formulated with 500mg of highly bioavailable Phytoceramides and
            200mg of Hyaluronic Acid. In a 12-week double-blind study, 89% of
            participants noted significant improvement in skin elasticity and
            moisture retention.
          </div>
        </details>
        <details className="group py-5 cursor-pointer">
          <summary className="flex justify-between items-center font-bold text-base list-none">
            Full Ingredient List{" "}
            <span className="group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="pt-4 text-gray-500 leading-relaxed">
            Vitamin C (as Ascorbic Acid), Zinc (as Zinc Picolinate), Liposomal
            Ceramide Complex, Organic Ashwagandha Root Extract, Bamboo Silica.
            *Contains absolutely no proprietary blends.*
          </div>
        </details>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 pb-8 z-50 flex gap-4 items-center shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="flex-1 flex flex-col">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {purchaseType === "subscribe" ? "Subscription" : "One-Time"}
          </span>
          <span className="text-xl font-black">${price * quantity}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-2 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-900 active:scale-95 transition-all text-lg"
        >
          {isAdding ? "Processing..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
