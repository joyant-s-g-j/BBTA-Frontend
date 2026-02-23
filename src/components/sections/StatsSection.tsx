"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { GraduationCap, Users, BookOpen, MapPin } from "lucide-react";
import { stats } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

/**
 * Animated Counter Component
 * Counts up from 0 to target value when in view
 */
function AnimatedCounter({
  value,
  suffix = "",
  duration = 2
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/**
 * Individual Stat Item
 */
function StatItem({ icon: Icon, value, suffix = "+", label, delay = 0 }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors"
      >
        <Icon className="h-8 w-8 text-primary" />
      </motion.div>
      <div className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="text-muted-foreground text-sm uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

/**
 * StatsSection Component
 * Animated counters showing key statistics
 */
export function StatsSection() {
  const statItems = [
    { icon: Users, value: stats.students, suffix: "+", label: "Current Students" },
    { icon: GraduationCap, value: stats.graduates, suffix: "+", label: "Graduates" },
    { icon: BookOpen, value: stats.courses, suffix: "+", label: "Courses" },
    { icon: MapPin, value: stats.branches, label: "Branches" },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <SectionHeader
          subtitle="Our Impact"
          title="Transforming Coffee Careers"
          titleSize="text-3xl md:text-4xl"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {statItems.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
