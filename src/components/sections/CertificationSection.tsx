"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  GraduationCap, 
  Globe, 
  Award, 
  Medal, 
  CheckCircle2 
} from "lucide-react";
import { certifications } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
  Globe: <Globe className="h-8 w-8" />,
  Award: <Award className="h-8 w-8" />,
  Medal: <Medal className="h-8 w-8" />,
};

/**
 * CertificationSection
 * Displays various certifications and accreditations between Testimonials and FAQ
 */
export function CertificationSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Industry Recognition
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Our Certifications & <span className="text-gradient-gold">Accreditations</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We take pride in our international standards and local recognition. 
              Our graduates carry certifications that are respected globally in the coffee industry.
            </p>
          </motion.div>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  
                  {/* Icon Container - Floating over image */}
                  <div className="absolute bottom-4 left-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white shadow-xl group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                      {iconMap[cert.icon] || <CheckCircle2 className="h-7 w-7" />}
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 pt-6 relative flex-grow">
                  {/* Subtle highlight on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-primary/80 text-sm font-medium mb-4">
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
