"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Clock, DollarSign, Award, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/data";

interface CourseCardProps {
  course: Course;
  index?: number;
}

/**
 * CourseCard Component
 * 3D tiltable card with hover effects, badges, and gradient overlays
 */
export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Level color mapping
  const levelColors: Record<string, string> = {
    Beginner: "bg-primary text-white border-primary",
    Intermediate: "bg-primary text-white border-primary",
    Advanced: "bg-primary text-white border-primary",
    Expert: "bg-primary text-white border-primary",
    All: "bg-primary text-white border-primary",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group perspective-1000"
    >
      <div className="relative bg-card rounded-2xl overflow-hidden border border-border h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
          
          {/* Level Badge */}
          <Badge
            className={cn(
              "absolute top-4 right-4 border",
              levelColors[course.level]
            )}
          >
            {course.level}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-primary" />
              <span>{course.price}</span>
            </div>
          </div>

          {/* Features Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link href={`/${course.slug}`} className="mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary"
            >
              <span>Learn More</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" />
        </div>
      </div>
    </motion.div>
  );
}
