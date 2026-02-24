"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import {
  TrendingUp,
  Globe,
  BadgeDollarSign,
  Briefcase,
  GraduationCap,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const careerBenefits = [
  {
    icon: TrendingUp,
    title: "High-Demand Skill",
    description:
      "The specialty coffee industry is booming worldwide. Trained baristas are in constant demand across cafes, hotels, and restaurants.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    description:
      "A barista certification is recognized internationally, opening doors to work in cafes across Europe, the Middle East, and beyond.",
  },
  {
    icon: BadgeDollarSign,
    title: "Strong Earning Potential",
    description:
      "Professional baristas earn significantly more than the average. Head baristas and cafe managers can earn up to 3× the starting salary.",
  },
  {
    icon: Briefcase,
    title: "Entrepreneurship Path",
    description:
      "Many of our graduates go on to open their own cafes. The training gives you both the technical skills and business knowledge to succeed.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Growth",
    description:
      "From barista to trainer, roaster, or cafe consultant — the coffee industry offers diverse career paths for continuous professional growth.",
  },
  {
    icon: Rocket,
    title: "Quick Career Start",
    description:
      "Unlike many professions requiring years of study, you can start a rewarding barista career in as little as 3 days of professional training.",
  },
];

/**
 * CareerGrowthSection
 * Showcases how barista training accelerates career growth
 */
export function CareerGrowthSection({ initialCareerBenefits }: { initialCareerBenefits?: any[] }) {
  const displayBenefits = initialCareerBenefits && initialCareerBenefits.length > 0 ? initialCareerBenefits : careerBenefits;

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
          subtitle="Build Your Future"
          title="How Barista Training Helps Grow Your Career"
          description="The coffee industry is one of the fastest-growing sectors in Bangladesh and globally. Here's why professional barista training is the smartest career move you can make."
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
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/15 mb-5 group-hover:bg-primary/25 transition-colors overflow-hidden border border-primary/10">
                {typeof benefit.icon === "string" && (benefit.icon.startsWith("http") || benefit.icon.startsWith("/")) ? (
                  <img src={benefit.icon} alt={benefit.title} className="h-full w-full object-cover" />
                ) : (
                  (() => {
                    const Icon = typeof benefit.icon === "string" ? (LucideIcons as any)[benefit.icon] || LucideIcons.HelpCircle : (benefit.icon || LucideIcons.TrendingUp);
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
