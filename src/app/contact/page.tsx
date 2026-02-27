import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import { Badge } from "@/components/ui/badge";
import Address from "@/components/sections/Address";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Bangladesh Barista Training Academy. Visit our Dhaka training centers or reach us by phone and email.",
  openGraph: {
    title: "Contact Us | BBTA",
    description: "Get in touch with Bangladesh Barista Training Academy.",
  },
};

import * as api from "@/lib/api";

/**
 * Contact Page
 * Contact form, branch info, and enlarged map
 */
export default async function ContactPage() {
  const [heroSettings, sh, siteSettings, branches] = await Promise.all([
    api.getHeroByPage('contact'),
    api.getAllSectionHeaders(),
    api.getSettings('site'),
    api.getBranches()
  ]);

  const hero = {
    title: heroSettings?.title || "Get in Touch",
    subtitle: heroSettings?.subtitle || "We'd Love to Hear From You",
    description: heroSettings?.description || "Have questions about our courses or services? Reach out and our team will respond within 24 hours.",
    backgroundImage: heroSettings?.backgroundImage || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920"
  };
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        {...hero}
        ctaText="Send Message"
        ctaHref="#contact-form"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Contact Section */}
      <section id="contact-form" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <SectionHeader
                subtitle={sh['sh_contact_info']?.subtitle}
                title={sh['sh_contact_info']?.title}
                description={sh['sh_contact_info']?.description}
                align="left"
                titleSize="text-3xl"
              />

              {/* Hotline Badge */}
              <div className="mb-8">
                <Badge className="bg-primary text-primary-foreground px-4 py-2 text-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Hotline: {siteSettings?.phone || "+880 1745-045500"}
                </Badge>
              </div>

              {/* Branch Info */}
              <div className="space-y-6">
                <div className="text-muted-foreground mb-6 leading-relaxed">
                  {siteSettings?.address && (
                    <p className="mb-4">
                      <strong>Address:</strong> {siteSettings.address}
                    </p>
                  )}
                  {!siteSettings?.address && (
                    <>
                      <p className="mb-4">
                        Experience world-class coffee training at Bangladesh Barista Training Academy&apos;s two convenient Dhaka locations. Visit our flagship hub in the <strong>Baridhara Diplomatic Zone</strong> at House 45, Road 11, Dhaka 1212, or join us at our <strong>Dhanmondi</strong> campus located at House 12, Road 8, Dhaka 1205.
                      </p>
                      <p className="mb-4">
                        Both centers are fully equipped with professional espresso machines, grinders, brewing tools, and comfortable learning spaces designed for hands-on practice. Our curriculum covers a wide range of courses including <strong>Barista Foundation, Advanced Coffee Techniques, Latte Art, Hand Brewing, Roasting, and Mixology</strong>, ensuring that students at every skill level find programs tailored to their needs.
                      </p>
                      <p className="mb-4">
                        Both centers are open <strong>Saturday to Friday, 9:00 AM - 9:00 PM</strong>, making it convenient for working professionals and enthusiasts to join. We also offer flexible course schedules, weekend workshops, and private sessions upon request.
                      </p>
                    </>
                  )}
                  <p>
                    For more information, inquiries, or enrollment assistance, reach us at <a href={`tel:${siteSettings?.phone || "+8801745045500"}`} className="hover:text-primary transition-colors font-medium">{siteSettings?.phone || "+880 1745-045500"}</a>
                    {siteSettings?.whatsapp && (
                      <> or WhatsApp at <a href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}`} className="hover:text-primary transition-colors font-medium">{siteSettings.whatsapp}</a></>
                    )}. You can also visit our website for online course registration, upcoming events, and special promotions.
                  </p>
                </div>


                {/* Email */}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a
                    href={`mailto:${siteSettings?.email || "info@bbta.com.bd"}`}
                    className="hover:text-primary transition-colors"
                  >
                    {siteSettings?.email || "info@bbta.com.bd"}
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
                source="contact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section className="section-padding bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Address initialBranches={branches?.length > 0 ? branches : undefined} />
        </div>
      </section>
    </>
  );
}
