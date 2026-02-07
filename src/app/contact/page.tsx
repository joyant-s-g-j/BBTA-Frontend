import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import { BranchesMap } from "@/components/sections/BranchesMap";
import { Badge } from "@/components/ui/badge";
import { branches } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Bangladesh Barista Training Academy. Visit our Dhaka training centers or reach us by phone and email.",
  openGraph: {
    title: "Contact Us | BBTA",
    description: "Get in touch with Bangladesh Barista Training Academy.",
  },
};

/**
 * Contact Page
 * Contact form, branch info, and enlarged map
 */
export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Get in Touch"
        subtitle="We'd Love to Hear From You"
        description="Have questions about our courses or services? Reach out and our team will respond within 24 hours."
        ctaText="Send Message"
        ctaHref="#contact-form"
        backgroundImage="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Contact Section */}
      <section id="contact-form" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl font-bold mb-6">
                Contact Information
              </h2>

              {/* Hotline Badge */}
              <div className="mb-8">
                <Badge className="bg-primary text-primary-foreground px-4 py-2 text-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Hotline: +880 1745-045500
                </Badge>
              </div>

              <p className="text-muted-foreground mb-8">
                Visit us at one of our training centers or reach out online.
                We&apos;re here to help you start your coffee journey.
              </p>

              {/* Branch Cards */}
              <div className="space-y-6">
                {branches.map((branch) => (
                  <div
                    key={branch.name}
                    className="bg-card rounded-xl border border-border p-6"
                  >
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
                  </div>
                ))}

                {/* Email */}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a
                    href="mailto:info@bbta.com.bd"
                    className="hover:text-primary transition-colors"
                  >
                    info@bbta.com.bd
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <EnrollmentForm
                title="Send Us a Message"
                description="Fill out the form below and we'll get back to you within 24 hours."
                variant="full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">
            Find Us
          </h2>
          <div className="h-125 rounded-2xl overflow-hidden border border-border">
            <iframe
              src={branches[0].mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BBTA Location Map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
