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

/**
 * HomeFAQSection
 * Frequently Asked Questions section for the home page
 */
export function HomeFAQSection() {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column — Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-3">
              Common Questions
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Everything you need to know about our courses, certification, and
              career opportunities. Can&apos;t find what you&apos;re looking for?{" "}
              <a
                href="/contact"
                className="text-primary underline-animated font-medium"
              >
                Contact us
              </a>
              .
            </p>
          </motion.div>

          {/* Right Column — Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
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
