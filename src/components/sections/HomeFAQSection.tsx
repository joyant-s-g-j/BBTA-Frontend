"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * HomeFAQSection
 * Frequently Asked Questions section for the home page
 */
export function HomeFAQSection({ initialFaqs }: { initialFaqs?: any[] }) {
  const displayFaqs = initialFaqs || faqs;
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column — Header */}
          <SectionHeader
            subtitle="Common Questions"
            title="Frequently Asked Questions"
            align="left"
            description="Everything you need to know about our courses, certification, and career opportunities."
            titleSize="text-3xl md:text-4xl"
            className="lg:col-span-2 lg:sticky lg:top-28 mb-0"
          />

          {/* Right Column — Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <Accordion type="single" collapsible className="w-full space-y-2">
              {displayFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`home-faq-${index}`}
                  className="border border-border rounded-xl px-5 bg-background/50 data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium text-base hover:text-primary hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
