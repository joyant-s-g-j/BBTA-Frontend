"use client"
import { motion } from 'motion/react'
import React from 'react'
import { branches } from "@/lib/data";
import { Card, CardContent } from '../ui/card';
import { Clock, MapPin, Phone } from 'lucide-react';

interface BranchesMapProps {
    showMap?: boolean;
}

const Address = ({ showMap = true, initialBranches }: BranchesMapProps & { initialBranches?: any[] }) => {
    const displayBranches = initialBranches || branches;
    const getMapUrl = (branch: any) => branch.mapUrl || branch.mapEmbedUrl || "";
    const [activeMapUrl, setActiveMapUrl] = React.useState(getMapUrl(displayBranches[0]) || "");

    return (
        <div className={`grid ${showMap ? "lg:grid-cols-5" : ""} gap-8`}>
            {/* Branch Cards */}
            <div className={`${showMap ? "lg:col-span-2" : "grid md:grid-cols-2"} space-y-4`}>
                {displayBranches.map((branch, index) => (
                    <motion.div
                        key={branch.name}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card
                            className={`cursor-pointer transition-all duration-300 hover:border-primary/50 ${activeMapUrl === getMapUrl(branch)
                                    ? "border-primary bg-primary/5"
                                    : ""
                                }`}
                            onClick={() => setActiveMapUrl(getMapUrl(branch))}
                        >
                            <CardContent className="p-6">
                                <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    {branch.name}
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3 text-muted-foreground">
                                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>{branch.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Phone className="h-5 w-5 text-primary shrink-0" />
                                        <a
                                            href={`tel:${branch.phone}`}
                                            className="hover:text-primary transition-colors"
                                        >
                                            {branch.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Clock className="h-5 w-5 text-primary shrink-0" />
                                        <span>{branch.hours}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Map */}
            {showMap && activeMapUrl && (
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-3 h-100 lg:h-auto rounded-2xl overflow-hidden border border-border"
                >
                    <iframe
                        src={activeMapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: "400px" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="BBTA Location Map"
                    />
                </motion.div>
            )}
        </div>
    )
}

export default Address