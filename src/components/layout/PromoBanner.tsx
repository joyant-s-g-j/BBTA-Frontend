"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface PromoBannerData {
  enabled: boolean;
  text: string;
  linkUrl: string;
  linkText: string;
  backgroundColor: string;
  image: string;
}

export function PromoBanner({ data }: { data: PromoBannerData | null }) {
  const [visible, setVisible] = useState(true);
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    // Show the close button after 3 seconds
    const timer = setTimeout(() => setShowClose(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!data?.enabled || !data?.text || !visible) return null;

  const content = (
    <div className="flex items-center gap-3 min-w-0 flex-1 justify-center">
      {data.image && (
        <div className="w-7 h-7 rounded overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <p className="text-white text-sm font-medium truncate">{data.text}</p>
      {data.linkText && (
        <span className="shrink-0 text-xs font-bold text-white bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full">
          {data.linkText}
        </span>
      )}
    </div>
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-4 sm:px-6"
      style={{
        backgroundColor: data.backgroundColor || "#EA1F3D",
        height: "56px",
      }}
    >
      {data.linkUrl ? (
        <Link href={data.linkUrl} className="flex-1 flex items-center">
          {content}
        </Link>
      ) : (
        <div className="flex-1 flex items-center">{content}</div>
      )}

      {/* Close button — appears after delay */}
      <button
        onClick={() => setVisible(false)}
        className={`shrink-0 ml-2 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 ${
          showClose
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
        aria-label="Close promo banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
