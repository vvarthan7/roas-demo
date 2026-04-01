import Link from "next/link";

export default function ProductFooter() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 rounded-t-[3rem] mt-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 border-b border-white/20 pb-16 mb-12">
          {/* Newsletter Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <Link href="/">
              <h3 className="text-3xl font-extrabold tracking-tighter mb-6">
                VV STUDIO LABS.
              </h3>
            </Link>
            <p className="text-gray-400 mb-8 max-w-sm">
              Join our private list for early access to new formulas, clinical
              research, and exclusive pricing.
            </p>
            <div className="flex flex-col lg:flex-row gap-2">
              <input
                type="email"
                placeholder="Email address"
                defaultValue=""
                className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl flex-1 focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-gray-500">
              Shop
            </h4>
            <ul className="space-y-4 text-gray-300 font-medium text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  The Radiance Bundle
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Subscription Portal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-gray-500">
              About
            </h4>
            <ul className="space-y-4 text-gray-300 font-medium text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Clinical Trials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Ingredients Glossary
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-gray-500">
              Support
            </h4>
            <ul className="space-y-4 text-gray-300 font-medium text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Wholesale
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <p>© 2026 VV STUDIO LABS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
