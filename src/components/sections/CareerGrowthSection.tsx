"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface CareerBenefit {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

/**
 * CareerGrowthSection
 * Showcases how barista training accelerates career growth
 */
export function CareerGrowthSection({ initialCareerBenefits, sectionHeader }: { initialCareerBenefits?: CareerBenefit[], sectionHeader?: { subtitle: string; title: string; description?: string } }) {
  if (!initialCareerBenefits || initialCareerBenefits.length === 0) return null;
  const displayBenefits = initialCareerBenefits;
  const sh = sectionHeader || { subtitle: 'Build Your Future', title: 'How Barista Training Helps Grow Your Career', description: 'The coffee industry is one of the fastest-growing sectors in Bangladesh and globally.' };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920"
          alt="Coffee background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          subtitle={sh.subtitle}
          title={sh.title}
          description={sh.description}
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 hover:border-primary/40 transition-all duration-300"
            >
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/15 mb-5 group-hover:bg-primary/25 transition-colors overflow-hidden border border-primary/10">
                {typeof benefit.icon === "string" && (benefit.icon.startsWith("http") || benefit.icon.startsWith("/")) ? (
                  <Image src={benefit.icon} alt={benefit.title} fill sizes="56px" className="object-cover" />
                ) : (
                  (() => {
                    const Icon = typeof benefit.icon === "string" ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[benefit.icon] || LucideIcons.HelpCircle : LucideIcons.TrendingUp;
                    return <Icon className="h-7 w-7 text-primary" />;
                  })()
                )}
              </div>

              {/* Title */}
              <h3 className="font-sans text-lg font-bold mb-2 text-gradient-gold transition-colors pb-1">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link href="/bbta-courses">
            <Button
              size="lg"
              className="px-10 py-6 text-lg font-semibold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              Start Your Career Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section >
  );
}
