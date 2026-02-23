import type { Metadata } from "next";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import { consultingServices } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Cafe Consulting",
  description:
    "Expert cafe consulting services from BBTA. Menu planning, staff training, cafe setup, and quality audits for coffee businesses.",
  openGraph: {
    title: "Cafe Consulting | BBTA",
    description: "Expert cafe consulting services for coffee businesses.",
  },
};

/**
 * Cafe Consulting Page
 */
export default function ConsultingPage() {
  const caseStudies = [
    {
      name: "Urban Coffee House",
      result: "40% increase in beverage sales",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
    },
    {
      name: "The Daily Grind",
      result: "Reduced waste by 35%",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
    },
    {
      name: "Artisan Brews",
      result: "Staff efficiency up 50%",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Expert Cafe Consulting"
        subtitle="Transform Your Coffee Business"
        description="From menu optimization to staff training, we help cafes reach their full potential."
        ctaText="Get a Consultation"
        ctaHref="#inquiry"
        backgroundImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Services"
            title="Comprehensive Consulting Solutions"
            titleSize="text-3xl md:text-4xl"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {consultingServices.map((service, index) => {
              const IconComponent =
                (LucideIcons as any)[
                service.icon
                ] || LucideIcons.Coffee;

              return (
                <div
                  key={service.title}
                  className="bg-card rounded-2xl border border-border p-8 card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <LucideIcons.CheckCircle2 className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Success Stories"
            title="Client Case Studies"
            titleSize="text-3xl md:text-4xl"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <div
                key={study.name}
                className="group relative h-64 rounded-2xl overflow-hidden"
              >
                <Image
                  src={study.image}
                  alt={study.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-lg font-bold text-white mb-1">
                    {study.name}
                  </h3>
                  <p className="text-primary text-sm font-medium">
                    {study.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeader
                subtitle="Get Started"
                title="Request a Consultation"
                align="left"
                titleSize="text-3xl md:text-4xl"
                className="mb-6"
              />
              <p className="text-muted-foreground mb-6">
                Tell us about your cafe and goals. Our team will review your
                requirements and get back to you within 24 hours with a
                customized proposal.
              </p>
              <ul className="space-y-4">
                {[
                  "Free initial consultation",
                  "Customized solutions for your business",
                  "Flexible engagement options",
                  "Ongoing support and training",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <LucideIcons.CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <EnrollmentForm
              title="Request Consultation"
              description="Fill out the form and we'll contact you shortly."
            />
          </div>
        </div>
      </section >

      {/* CTA */}
      < CTABanner
        title="Ready to Elevate Your Cafe?"
        description="Let our experts help you create an exceptional coffee experience."
        ctaText="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
