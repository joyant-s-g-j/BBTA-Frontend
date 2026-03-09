"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { type UpcomingBatch } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
                            <Link href="/upcoming-batch" className="flex items-center gap-2">
                                View Full Schedule <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedBatches.map((batch, index) => (
                        <motion.div
                            key={batch.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-background">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge
                                            variant={batch.status === "Closed" ? "destructive" : batch.status === "Fast Filling" ? "secondary" : "default"}
                                            className="font-medium"
                                        >
                                            {batch.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-bold leading-tight text-gradient-gold transition-colors">
                                        {batch.courseTitle}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pb-6">
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-semibold text-foreground">Starts {batch.startDate}</p>
                                            <p>{batch.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-semibold text-foreground">{batch.timeSlot}</p>
                                            <p>Class Time</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-semibold text-foreground">{batch.branch}</p>
                                            <p>Location</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 pb-6 pr-6 pl-6">
                                    <Button className="w-full" disabled={batch.status === "Closed"}>
                                        {batch.status === "Closed" ? "Batch Full" : "Enroll Now"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
