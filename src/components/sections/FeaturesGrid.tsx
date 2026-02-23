"use client";

import * as React from "react";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { features } from "@/lib/data";

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Individual Feature Item
 */
function FeatureItem({ icon, title, description, index }: FeatureItemProps) {
  // Dynamically get icon from lucide-react
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 card-hover shadow-sm"
    >
      {/* Icon Container */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors"
      >
        <IconComponent className="h-8 w-8 text-primary" />
      </motion.div>

      {/* Title */}
      <h3 className="font-serif text-lg font-bold mb-2 text-gradient-gold transition-colors pb-1">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/**
 * FeaturesGrid Component
 * Responsive grid of feature cards with icons
 */
export function FeaturesGrid() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        {/* Section Header */}
        <SectionHeader
          subtitle="Why Choose Us"
          title="The BBTA Advantage"
          description="Experience world-class training with ISO-certified curriculum, expert instructors, and career-focused programs."
          titleSize="text-3xl md:text-4xl"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
