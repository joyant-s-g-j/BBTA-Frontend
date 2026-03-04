"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * CertificationSection
 * Displays various certifications and accreditations between Testimonials and FAQ
 */
export function CertificationSection({ initialCertifications, sectionHeader }: { initialCertifications?: Record<string, string>[], sectionHeader?: { subtitle: string; title: string; description?: string } }) {
  if (!initialCertifications || initialCertifications.length === 0) return null;
  const displayCertifications = initialCertifications;
  const sh = sectionHeader || { subtitle: '', title: '', description: '' };
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          subtitle={sh.subtitle}
          title={sh.title}
          description={sh.description}
        />

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full rounded-2xl bg-card border border-border card-hover relative overflow-hidden flex flex-col">
                {/* Image Background for Card Top */}
                <div className="relative h-48 w-full overflow-hidden">
                  {cert.image && (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />

                  {/* Icon Container - Floating over image */}
                  <div className="absolute bottom-4 left-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white shadow-xl group-hover:bg-white group-hover:text-primary transition-colors duration-300 overflow-hidden">
                      {cert.icon && (cert.icon.startsWith("http") || cert.icon.startsWith("/")) ? (
                        <Image src={cert.icon} alt={cert.title} width={56} height={56} className="h-full w-full object-cover" />
                      ) : (
                        (() => {
                          const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cert.icon] || HelpCircle;
                          return <Icon className="h-7 w-7" />;
                        })()
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 pt-6 relative grow">
                  {/* Subtle highlight on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <h3 className="text-xl font-bold mb-2 text-gradient-gold transition-colors duration-300 pb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium mb-4">
                      {cert.issuer}
                    </p>
                    <p className="text-muted-foreground leading-relaxed italic">
                      &quot;{cert.description}&quot;
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-20 transition-opacity">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
