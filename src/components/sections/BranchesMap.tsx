"use client";

import { motion } from "motion/react";
import Address from "./Address";

interface BranchesMapProps {
  compact?: boolean;
}

/**
 * BranchesMap Component
 * Google Maps embed with branch info cards
 */
export function BranchesMap({ compact = false }: BranchesMapProps) {

  return (
    <section className={`${compact ? "py-8" : "section-padding"} relative`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Visit Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Our Training Centers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art facilities equipped with professional-grade 
              coffee equipment in prime Dhaka locations.
            </p>
          </motion.div>
        )}

        <Address />
      </div>
    </section>
  );
}
