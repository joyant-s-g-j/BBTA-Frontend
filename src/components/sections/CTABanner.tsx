"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTABannerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  variant?: "default" | "dark";
}

/**
 * CTABanner Component
 * Full-width call-to-action banner
 */
export function CTABanner({
  title = "Ready to Start Your Coffee Journey?",
  description = "Join over 2,000 graduates who have transformed their passion for coffee into successful careers.",
  ctaText = "Enroll Now",
  ctaHref = "/bbta-courses",
  variant = "default",
}: CTABannerProps) {
  const variantStyles = {
    default: "bg-secondary text-foreground",
    dark: "bg-background text-foreground",
  };

  return (
    <section className={`py-16 md:py-24 relative overflow-hidden ${variantStyles[variant]}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Text Content */}
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="font-serif text-gradient-gold text-3xl md:text-4xl font-bold mb-4 pb-1">
              {title}
            </h2>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>

          {/* CTA Button */}
          <Link href={ctaHref}>
            <Button
              size="lg"
              className="group px-8 py-6 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
