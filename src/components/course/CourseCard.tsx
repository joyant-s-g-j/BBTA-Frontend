"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/data";

interface CourseCardProps {
  course: Course;
  index?: number;
  className?: string;
  categorySlug?: string;
}

/**
 * CourseCard Component
 * 3D tiltable card with hover effects, badges, and gradient overlays
 */
export function CourseCard({ course, index = 0, className, categorySlug }: CourseCardProps) {
  const courseHref = categorySlug
    ? `/${categorySlug}/${course.slug}`
    : `/${course.slug}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      // whileHover={{ y: -10 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn("group h-full rounded-lg relative overflow-hidden", className)}
    >
      {/* Full Card Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col pt-10 px-8">
        {/* Top Header */}
        <p className="text-white/60 text-xs font-medium uppercase tracking-[0.25em] mb-4">
          FOR GROWING BARISTA
        </p>

        {/* Main Title */}
        <h3 className="font-sans text-3xl font-bold text-gradient-gold mb-6 leading-tight pb-1">
          {course.title}
        </h3>

        {/* Course Details Line */}
        <div className="flex items-center gap-2 text-white/90 text-xs mb-6">
          <span>Duration <span className="font-bold">{course.duration}</span></span>
          <span className="text-white/40 mx-1">|</span>
          <span>Course Fee{" "}
            {course.discountPercent && course.discountPercent > 0 ? (
              <>
                <span className="line-through opacity-60">{course.price}</span>{" "}
                <span className="font-bold text-bbta-red">
                  ৳{Math.round(Number(String(course.price).replace(/[^0-9]/g, '')) * (1 - course.discountPercent / 100)).toLocaleString()}
                </span>{" "}
                <span className="bg-bbta-red/20 text-bbta-red px-1.5 py-0.5 rounded-full text-[10px] font-bold">{course.discountPercent}% OFF</span>
              </>
            ) : (
              <span className="font-bold">{course.price}</span>
            )}
          </span>
        </div>

        {/* Description */}
        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-10 ">
          {course.description}
        </p>

        {/* Full Width Bottom Button */}
        <div className="mt-auto -mx-8">
          <Link href={courseHref}>
            <Button
              className="w-full flex items-center justify-center rounded-none h-8 bg-bbta-red hover:bg-bbta-green text-foreground font-bold text-lg transition-colors border-none"
            >
              Course Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

