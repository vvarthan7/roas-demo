import Image from "next/image";

interface ProductReviewProps {
  reviews: {
    name: string;
    verified: boolean;
    text: string;
    rating: number;
    img: string;
  }[];
}

export default function ProductReview({ reviews }: ProductReviewProps) {
  return (
    <section className="py-24 max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-gray-100 pb-12">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tighter mb-4">
            The Verdict
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black">4.9</div>
            <div className="flex flex-col">
              <div className="text-black text-lg">★★★★★</div>
              <span className="text-sm font-semibold text-gray-500">
                Based on 2,841 verified reviews
              </span>
            </div>
          </div>
        </div>
        <button className="px-8 py-4 border-2 border-black rounded-xl font-bold hover:bg-black hover:text-white transition-colors">
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="bg-gray-50 p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="text-black text-sm mb-4">
                {"★".repeat(review.rating)}
              </div>
              <p className="text-gray-700 leading-relaxed font-medium mb-8">
                {`"review.text"`}
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
              <Image
                src={review.img}
                width="1200"
                height="1200"
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <div className="font-bold">{review.name}</div>
                {review.verified && (
                  <div className="text-[10px] uppercase tracking-wider font-bold text-green-600 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center">
                      ✓
                    </span>{" "}
                    Verified Buyer
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
