"use client";

import Address from "./Address";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { type Branch } from "@/lib/data";

interface BranchesMapProps {
  compact?: boolean;
  sectionHeader?: { subtitle: string; title: string; description?: string };
}

/**
 * BranchesMap Component
 * Google Maps embed with branch info cards
 */
export function BranchesMap({ compact = false, initialBranches, sectionHeader }: BranchesMapProps & { initialBranches?: Branch[] }) {
  const sh = sectionHeader || { subtitle: 'Visit Us', title: 'Our Training Centers', description: 'State-of-the-art facilities equipped with professional-grade coffee equipment in prime Dhaka locations.' };

  return (
    <section className={`${compact ? "py-8" : "section-padding"} relative`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {!compact && (
          <SectionHeader
            subtitle={sh.subtitle}
            title={sh.title}
            description={sh.description}
            titleSize="text-3xl md:text-4xl"
          />
        )}

        <Address initialBranches={initialBranches} />
      </div>
    </section>
  );
}
