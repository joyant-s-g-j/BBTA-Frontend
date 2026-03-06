"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  showScrollIndicator?: boolean;
  size?: "full" | "large" | "medium" | "small";
  overlay?: "dark" | "gradient" | "none";
}

import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * HeroSection Component
 * Full viewport hero with parallax background, animated text, and floating coffee beans
 */
export function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  showScrollIndicator = true,
  size = "full",
  overlay = "gradient",
}: HeroSectionProps) {
  const bgImage = backgroundImage || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920";
  const sizeClasses = {
    full: "min-h-screen",
    large: "min-h-[85vh]",
    medium: "min-h-[60vh]",
    small: "min-h-[40vh]",
  };

  const overlayClasses = {
    dark: "bg-gradient-to-b from-black/70 via-black/50 to-black/30",
    gradient: "bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,transparent_35%),linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.8)_100%)]",
    none: "",
  };


  return (
    <section className={`relative ${sizeClasses[size]} flex items-center justify-center overflow-hidden`}>
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={bgImage}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

      {/* Noise Texture */}
      <div className="absolute inset-0 noise" />

      {/* Floating Coffee Beans Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-primary/20"
            initial={{
              x: Math.random() * 100 + "%",
              y: "110%",
              rotate: 0,
            }}
            animate={{
              y: "-10%",
              rotate: 360,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
            style={{
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            as="h1"
            subtitle={subtitle}
            title={title}
            description={description}
            titleSize="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            descriptionClassName="text-white text-lg sm:text-xl font-bold mb-8 max-w-2xl mx-auto [text-shadow:1px_1px_0_#000,-1px_1px_0_#000,1px_-1px_0_#000,-1px_-1px_0_#000]"
            className="mb-8"
          />

          {/* CTAs - only show if provided from admin */}
          {ctaText && ctaHref && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href={ctaHref}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-hover px-8 py-6 text-lg font-semibold"
                >
                  {ctaText}
                </Button>
              </Link>
              {secondaryCtaText && secondaryCtaHref && (
                <Link href={secondaryCtaHref}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-foreground/30 text-foreground hover:bg-foreground/10 px-8 py-6 text-lg"
                  >
                    {secondaryCtaText}
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && size === "full" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
