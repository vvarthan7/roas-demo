import Link from "next/link";

export default function ProductHeader() {
  return (
    <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 py-5 px-6 md:px-12 flex justify-between items-center z-40 transition-all">
      <div className="flex gap-8 items-center">
        <Link href="/" className="font-extrabold tracking-tighter text-2xl">
          VV STUDIO LABS.
        </Link>
        <div className="hidden lg:flex gap-6 text-sm font-semibold text-gray-500">
          <a href="#" className="hover:text-black">
            Shop All
          </a>
          <a href="#" className="hover:text-black">
            The Science
          </a>
          <a href="#" className="hover:text-black">
            Journal
          </a>
        </div>
      </div>
      <div className="flex gap-6 items-center text-sm font-semibold">
        <span className="hidden md:block hover:text-gray-600 cursor-pointer">
          Account
        </span>
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors">
          Cart{" "}
          <span className="bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </button>
      </div>
    </nav>
  );
}
