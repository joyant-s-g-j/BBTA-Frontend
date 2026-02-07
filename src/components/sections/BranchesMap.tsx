"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { branches } from "@/lib/data";

interface BranchesMapProps {
  showMap?: boolean;
  compact?: boolean;
}

/**
 * BranchesMap Component
 * Google Maps embed with branch info cards
 */
export function BranchesMap({ showMap = true, compact = false }: BranchesMapProps) {
  const [activeMapUrl, setActiveMapUrl] = React.useState(branches[0].mapUrl);

  return (
    <section className={`${compact ? "py-8" : "section-padding"} relative`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Visit Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Our Training Centers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art facilities equipped with professional-grade 
              coffee equipment in prime Dhaka locations.
            </p>
          </motion.div>
        )}

        <div className={`grid ${showMap ? "lg:grid-cols-5" : ""} gap-8`}>
          {/* Branch Cards */}
          <div className={`${showMap ? "lg:col-span-2" : "grid md:grid-cols-2"} space-y-4`}>
            {branches.map((branch, index) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:border-primary/50 ${
                    activeMapUrl === branch.mapUrl
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setActiveMapUrl(branch.mapUrl)}
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
          {showMap && (
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
      </div>
    </section>
  );
}
