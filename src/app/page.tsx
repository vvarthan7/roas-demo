import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black flex flex-col">
        <SpeedInsights />
        <Analytics />
        <nav className="w-full flex justify-between items-center px-6 py-8 md:px-12 max-w-7xl mx-auto border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black text-[10px] font-black tracking-tighter">
                VV
              </span>
            </div>
            <div className="text-sm font-bold tracking-widest uppercase text-gray-200">
              VV Studio Labs{" "}
              <span className="text-gray-600 ml-2 hidden sm:inline">{`// Infrastructure`}</span>
            </div>
          </div>
          <a
            href="mailto:vishnu@vvstudiolabs.com"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors border border-gray-800 rounded-full px-4 py-1.5 hover:border-gray-500"
          >
            Contact
          </a>
        </nav>

        <main className="grow flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto w-full pt-20 pb-32">
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-px w-8 bg-green-500"></div>
            <span className="text-xs font-semibold tracking-[0.2em] text-green-400 uppercase">
              Specialized Frontend Infrastructure
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05] mb-8 text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
            Stop losing ad spend <br className="hidden md:block" />
            to slow mobile funnels.
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed mb-12 font-light">
            I rebuild bloated Shopify ad destinations into blazing-fast Next.js
            edge applications. Sub-400ms load times. Zero backend changes.
            Instant conversion bumps for scaling DTC brands.
          </p>

          {/* The Call to Actions */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/headless-demo"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center min-w-[200px]"
            >
              See the {"<"}400ms Demo
            </Link>
            <a
              href="mailto:vishnu@vvarthan7.dev?subject=Technical%20Audit%20Inquiry"
              className="px-8 py-4 bg-transparent text-white border border-white/20 font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-all flex items-center justify-center min-w-[200px]"
            >
              Request Technical Audit
            </a>
          </div>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center gap-8 text-sm text-gray-500">
            <p className="font-medium text-gray-400">
              Engineered with the modern edge stack:
            </p>
            <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
              <span>Next.js</span>
              <span>React</span>
              <span>Tailwind</span>
              <span>Storefront API</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
