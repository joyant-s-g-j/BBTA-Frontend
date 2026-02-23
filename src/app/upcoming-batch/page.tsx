"use client";

import * as React from "react";
import { motion } from "motion/react";
import { UpcomingBatchesSection } from "@/components/sections/UpcomingBatchesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { HomeFAQSection } from "@/components/sections/HomeFAQSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Upcoming Batch Page
 * Detailed view of all upcoming course batches
 */
export default function UpcomingBatchPage() {
    return (
        <>
            <HeroSection
                title="Upcoming Training Batches"
                subtitle="Schedule Your Future"
                description="Book your seat in one of our upcoming professional training batches. We offer flexible timings across multiple branches in Dhaka."
                ctaText="View Schedule"
                ctaHref="#schedule"
                backgroundImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920"
                size="small"
            />

            <div id="schedule">
                <UpcomingBatchesSection />
            </div>

            {/* Benefits of joining a batch */}
            <section className="section-padding bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        subtitle="Our Advantages"
                        title="Why Join Our Upcoming Batches?"
                        description="Our training programs are designed to provide maximum hands-on experience and professional exposure."
                        titleSize="text-3xl md:text-4xl"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-muted/50 border border-border"
                        >
                            <h3 className="text-xl font-bold mb-4 italic">Small Batch Size</h3>
                            <p className="text-muted-foreground">We limit our batches to 6-8 students maximum to ensure personalized attention and ample machine time for everyone.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-muted/50 border border-border"
                        >
                            <h3 className="text-xl font-bold mb-4 italic">Expert Mentorship</h3>
                            <p className="text-muted-foreground">Learn from industry veterans who have worked in world-class cafes and won national barista championships.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-muted/50 border border-border"
                        >
                            <h3 className="text-xl font-bold mb-4 italic">Job Placement</h3>
                            <p className="text-muted-foreground">98% of our professional course graduates find placement in reputed cafes and hotels across the country.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <HomeFAQSection />

            <CTABanner
                title="Can't Find a Slot?"
                description="If our current schedule doesn't work for you, contact us for customized training schedules or one-on-one sessions."
                ctaText="Contact Support"
                ctaHref="/contact"
            />
        </>
    );
}
