export default function ProductBanner() {
  return (
    <div className="w-full bg-black text-white text-[10px] sm:text-xs font-mono py-2.5 text-center tracking-widest uppercase flex items-center justify-center gap-3 z-50 relative">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      <span>Edge Network Active</span>
      <span className="hidden sm:inline text-gray-500">|</span>
      <span className="hidden sm:inline text-gray-300">
        Payload: 18 High-Res Images
      </span>
      <span className="hidden sm:inline text-gray-500">|</span>
      <span className="hidden sm:inline font-bold text-green-400">
        LCP: {"<"}400ms
      </span>
    </div>
  );
}
