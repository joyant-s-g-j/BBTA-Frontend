"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { type UpcomingBatch } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function UpcomingBatchesSection({ limit, initialBatches, sectionHeader }: { limit?: number, initialBatches?: UpcomingBatch[], sectionHeader?: { subtitle: string; title: string; description?: string } }) {
    const dataSource = initialBatches || [];
    const displayedBatches = limit ? dataSource.slice(0, limit) : dataSource;
    const sh = sectionHeader || { subtitle: '', title: '', description: '' };

    return (
        <section className="section-padding bg-muted/30 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <SectionHeader
                        subtitle={sh.subtitle}
                        title={sh.title}
                        description={sh.description}
                        align="left"
                        className="mb-0"
                        titleSize="text-3xl md:text-4xl lg:text-5xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Button asChild className="group">
                            <Link href="/bbta-courses" className="flex items-center gap-2">
                                View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {displayedBatches.map((batch, index) => (
                        <motion.div
                            key={batch.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="group relative rounded-2xl bg-background border border-border/50 p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                                {/* Info rows */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <Calendar className="h-4 w-4 text-primary shrink-0" />
                                        <span className="font-medium text-foreground">{batch.startDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                                        <span className="text-muted-foreground">{batch.branch}</span>
                                    </div>
                                </div>

                                {/* Status indicator */}
                                <div className="mt-4 pt-3 border-t border-border/40">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                        batch.status === "Closed"
                                            ? "text-destructive"
                                            : batch.status === "Fast Filling"
                                            ? "text-amber-500"
                                            : "text-emerald-600"
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            batch.status === "Closed"
                                                ? "bg-destructive"
                                                : batch.status === "Fast Filling"
                                                ? "bg-amber-500 animate-pulse"
                                                : "bg-emerald-600 animate-pulse"
                                        }`} />
                                        {batch.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
