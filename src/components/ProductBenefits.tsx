"use client";

import { useState } from "react";

export default function ProductBenefits({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="group py-5 cursor-pointer"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex justify-between items-center font-bold text-base list-none">
        {title}
        <span className="group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <div className="pt-4 text-gray-500 leading-relaxed text-lg">
        {description}
      </div>
    </details>
  );
}
