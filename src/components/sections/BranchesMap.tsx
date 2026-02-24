"use client";

import { motion } from "motion/react";
import Address from "./Address";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface BranchesMapProps {
  compact?: boolean;
}

/**
 * BranchesMap Component
 * Google Maps embed with branch info cards
 */
export function BranchesMap({ compact = false, initialBranches }: BranchesMapProps & { initialBranches?: any[] }) {

  return (
    <section className={`${compact ? "py-8" : "section-padding"} relative`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {!compact && (
          <SectionHeader
            subtitle="Visit Us"
            title="Our Training Centers"
            description="State-of-the-art facilities equipped with professional-grade coffee equipment in prime Dhaka locations."
            titleSize="text-3xl md:text-4xl"
          />
        )}

        <Address initialBranches={initialBranches} />
      </div>
    </section>
  );
}
