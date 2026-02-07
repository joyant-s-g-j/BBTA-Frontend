import type { Metadata } from "next";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import { Badge } from "@/components/ui/badge";
import { cateringServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Event Catering",
  description:
    "Premium mobile coffee bar and barista services for weddings, corporate events, and private parties in Bangladesh.",
  openGraph: {
    title: "Event Catering | BBTA",
    description: "Premium coffee catering services for events.",
  },
};

/**
 * Event Catering Page
 */
export default function CateringPage() {
  const pricingTiers = [
    {
      name: "Essential",
      description: "Perfect for small gatherings",
      price: "From 15,000 BDT",
      features: [
        "Up to 50 guests",
        "1 Professional barista",
        "3-hour service",
        "Classic espresso drinks",
        "Basic setup",
      ],
    },
    {
      name: "Premium",
      description: "Ideal for medium events",
      price: "From 35,000 BDT",
      popular: true,
      features: [
        "Up to 150 guests",
        "2 Professional baristas",
        "5-hour service",
        "Full beverage menu",
        "Premium cart setup",
        "Custom drink naming",
      ],
    },
    {
      name: "Luxury",
      description: "For grand celebrations",
      price: "Custom Quote",
      features: [
        "Unlimited guests",
        "Full barista team",
        "Full-day service",
        "Complete beverage program",
        "Bespoke bar design",
        "Event coordination",
        "Custom branding",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Premium Event Catering"
        subtitle="Mobile Coffee Bar Services"
        description="Bring the cafe experience to your event with our professional baristas and premium coffee bar setup."
        ctaText="Book Your Event"
        ctaHref="#booking"
        backgroundImage="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Our Services
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Events We Serve
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cateringServices.map((service, index) => {
              const IconComponent =
                (LucideIcons as any)[
                  service.icon
                ] || LucideIcons.Coffee;

              return (
                <div
                  key={service.title}
                  className="bg-card rounded-2xl border border-border p-6 text-center card-hover"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.features.slice(0, 2).map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="section-padding bg-[#F8F8F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Past Events
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Event Highlights
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
              "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400",
              "https://images.unsplash.com/photo-1554118811-1e0d58224f54?w=400",
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
            ].map((image, index) => (
              <div
                key={index}
                className="relative h-40 md:h-56 rounded-xl overflow-hidden group"
              >
                <Image
                  src={image}
                  alt={`Event ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Pricing
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Choose Your Package
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-card rounded-2xl border p-8 ${
                  tier.popular
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-serif text-xl font-bold">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {tier.description}
                  </p>
                  <p className="font-bold text-2xl mt-4 text-primary">
                    {tier.price}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <LucideIcons.CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Make Your Event Memorable"
        description="Premium coffee experiences that your guests will never forget."
        ctaText="Get Custom Quote"
        ctaHref="/contact"
      />
    </>
  );
}
