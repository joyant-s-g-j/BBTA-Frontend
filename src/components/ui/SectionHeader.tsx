"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    subtitle: string;
    title: string;
    description?: string;
    className?: string;
    align?: "left" | "center" | "right";
    titleSize?: string;
    as?: "h1" | "h2";
    descriptionClassName?: string;
}

/**
 * SectionHeader Component
 * A reusable component for section headers with a consistent aesthetic.
 * @param subtitle - The small text above the title (e.g., "Our Impact")
 * @param title - The main heading (e.g., "Transforming Coffee Careers")
 * @param description - Optional paragraph text below the title
 * @param className - Additional classes for the container
 * @param align - Text alignment (default: "center")
 * @param titleSize - Custom font size classes for the title (default: "text-3xl md:text-5xl")
 * @param as - Heading tag to use (default: "h2")
 * @param descriptionClassName - Custom classes for the description
 */
export function SectionHeader({
    subtitle,
    title,
    description,
    className,
    align = "center",
    titleSize = "text-3xl md:text-5xl",
    as: Tag = "h2",
    descriptionClassName,
}: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
                "mb-12",
                align === "center" && "text-center mx-auto",
                align === "left" && "text-left",
                align === "right" && "text-right ml-auto",
                "max-w-4xl", // Ensure title doesn't span too wide
                className
            )}
        >
            <p className="text-white font-medium text-sm tracking-wider uppercase mb-3">
                {subtitle}
            </p>
            <Tag className={cn(
                "font-serif font-bold text-gradient-gold mb-6 leading-tight pb-1",
                titleSize
            )}>
                {title}
            </Tag>
            {description && (
                <p
                    className={cn(
                        "text-muted-foreground text-lg leading-relaxed max-w-2xl",
                        align === "center" && "mx-auto",
                        align === "right" && "ml-auto",
                        descriptionClassName
                    )}
                >
                    {description}
                </p>
            )}
        </motion.div>
    );
}
