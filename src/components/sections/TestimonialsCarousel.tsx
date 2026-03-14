"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * TestimonialsCarousel Component
 * Infinite scroll carousel with quote cards, avatars, and ratings
 */
export function TestimonialsCarousel({ initialTestimonials, sectionHeader }: { initialTestimonials?: Record<string, string>[], sectionHeader?: { subtitle: string; title: string; description?: string } }) {
  const displayTestimonials = initialTestimonials || [];
  const sh = sectionHeader || { subtitle: '', title: '', description: '' };
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  // Auto-play carousel
  React.useEffect(() => {
    if (displayTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  if (displayTestimonials.length === 0) return null;
  const currentTestimonial = displayTestimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-primary/10">
        <Quote className="h-32 w-32" />
      </div>
      <div className="absolute bottom-10 right-10 text-primary/10 rotate-180">
        <Quote className="h-32 w-32" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <SectionHeader
          subtitle={sh.subtitle}
          title={sh.title}
          description={sh.description}
          titleSize="text-3xl md:text-4xl"
        />

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-75">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="text-center">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-20 h-20 mx-auto mb-6"
                  >
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover rounded-full ring-4 ring-primary/20"
                      sizes="80px"
                    />
                  </motion.div>

                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Number(currentTestimonial.rating)
                          ? "text-primary fill-primary"
                          : "text-muted"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </blockquote>

                  {/* Name & Role */}
                  <div>
                    <p className="font-semibold text-foreground">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full border-border hover:border-primary hover:bg-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-primary/50 hover:bg-primary/70"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full border-border hover:border-primary hover:bg-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
