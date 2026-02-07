"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, DollarSign, ArrowRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className="group h-full rounded-2xl"
    >
      <div className="relative bg-card rounded-2xl overflow-hidden border border-border h-full flex flex-col transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          <Badge
            className={cn(
              "absolute top-4 right-4 border shadow-sm",
              levelColors[course.level]
            )}
          >
            {course.level}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {course.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>

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

          <div className="flex flex-wrap gap-2 mb-4">
            {course.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
              >
                {feature}
              </span>
            ))}
          </div>

          <Link href={`/${course.slug}`} className="mt-auto">
            <Button
              variant="default"
              className="w-full justify-between group/btn"
            >
              <span>View Details</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
