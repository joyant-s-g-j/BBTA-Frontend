"use client";

import * as React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface MediaCoverageItem {
  id: string;
  name: string;
  logo: string;
  order: number;
}

/**
 * MediaCoverageSection
 * Infinite logo slider with pause-on-hover and edge shadow overlays.
 * Logos are duplicated in the DOM to create a seamless CSS-only infinite loop.
 */
export function MediaCoverageSection({
  initialItems,
  sectionHeader,
}: {
  initialItems?: MediaCoverageItem[];
  sectionHeader?: { subtitle: string; title: string; description?: string };
}) {
  if (!initialItems || initialItems.length === 0) return null;

  const sorted = [...initialItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const sh = sectionHeader || { subtitle: "Featured In", title: "Media Coverage" };

  // We render the list twice so the second copy seamlessly follows the first
  const renderLogos = (keyPrefix: string) =>
    sorted.map((item) => (
      <div
        key={`${keyPrefix}-${item.id}`}
        className="shrink-0 flex flex-col items-center justify-center gap-3 px-8 md:px-12"
      >
        <div className="h-16 w-28 md:h-20 md:w-36 relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
          <Image
            src={item.logo}
            alt={item.name}
            fill
            className="object-contain"
            sizes="144px"
          />
        </div>
        <span className="text-xs md:text-sm text-muted-foreground font-medium whitespace-nowrap">
          {item.name}
        </span>
      </div>
    ));

  // Animation duration scales with number of logos for consistent speed
  const duration = Math.max(sorted.length * 4, 20);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          subtitle={sh.subtitle}
          title={sh.title}
          description={sh.description}
        />
      </div>

      {/* Slider wrapper with edge shadows */}
      <div className="container mx-auto relative group">
        {/* Left shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling track — pauses on hover */}
        <div className="overflow-hidden">
          <div
            className="flex items-center w-max group-hover:paused"
            style={{ animation: `media-scroll ${duration}s linear infinite` }}
          >
            {renderLogos("a")}
            {renderLogos("b")}
          </div>
        </div>
      </div>
    </section>
  );
}
