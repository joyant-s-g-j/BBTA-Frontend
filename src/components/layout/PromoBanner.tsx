"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface PromoBannerData {
  enabled: boolean;
  text: string;
  linkUrl: string;
  linkText: string;
  backgroundColor: string;
  textColor: string;
  image: string;
}

export function PromoBanner({ data }: { data: PromoBannerData | null }) {
  const [visible, setVisible] = useState(true);
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowClose(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!data?.enabled || !data?.text || !visible) return null;

  const hasImage = !!data.image;
  const textColor = data.textColor || "#FFFFFF";
  const isBrowser = typeof window !== "undefined";

  // Close button rendered via portal to document.body — completely outside banner DOM
  const closeButton =
    isBrowser && showClose
      ? createPortal(
          <button
            onClick={() => setVisible(false)}
            style={{
              position: "fixed",
              bottom: 76,
              right: 12,
              zIndex: 9999,
            }}
            className="p-1.5 rounded-full bg-gray-800 border-2 border-white/30 text-white/80 hover:text-white hover:bg-gray-700 shadow-lg"
            aria-label="Close promo banner"
          >
            <X className="h-4 w-4" />
          </button>,
          document.body
        )
      : null;

  return (
    <>
      {closeButton}

      <div
        className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden"
        style={{
          backgroundColor: !hasImage
            ? data.backgroundColor || "#EA1F3D"
            : undefined,
        }}
      >
        {/* Background image — full cover */}
        {hasImage && (
          <div className="absolute inset-0">
            <Image
              src={data.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        {/* Banner content */}
        <div className="relative z-10 flex items-center min-h-16 sm:min-h-20 px-4 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 justify-center flex-wrap sm:flex-nowrap py-2 sm:py-0">
            {data.linkUrl ? (
              <Link
                href={data.linkUrl}
                className="flex items-center gap-2 sm:gap-3 min-w-0 flex-wrap sm:flex-nowrap justify-center"
              >
                <p className="text-sm sm:text-base font-medium text-center sm:text-left leading-snug whitespace-normal" style={{ color: textColor }}>
                  {data.text}
                </p>
                {data.linkText && (
                  <span className="shrink-0 text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full" style={{ color: textColor }}>
                    {data.linkText}
                  </span>
                )}
              </Link>
            ) : (
              <>
                <p className="text-sm sm:text-base font-medium text-center sm:text-left leading-snug whitespace-normal" style={{ color: textColor }}>
                  {data.text}
                </p>
                {data.linkText && (
                  <span className="shrink-0 text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full" style={{ color: textColor }}>
                    {data.linkText}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}