import type { Metadata } from "next";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import * as api from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("catering", {
    title: "Event Catering",
    description: "Premium mobile coffee bar and barista services for weddings, corporate events, and private parties in Bangladesh.",
  });
}

export default async function CateringPage() {
  const [allServices, pricingSettings, heroSettings, eventsSettings, sh] = await Promise.all([
    api.getServices(),
    api.getSettings('catering_pricing'),
    api.getHeroByPage('catering'),
    api.getSettings('catering_events'),
    api.getAllSectionHeaders()
  ]);

  const cateringServices = allServices?.filter((s: Record<string, string>) => s.category === 'Catering') || [];

  const hero = {
    title: heroSettings?.title || "",
    subtitle: heroSettings?.subtitle || "",
    description: heroSettings?.description || "",
    backgroundImage: heroSettings?.backgroundImage || ""
  };

  const pricingTiers = pricingSettings?.items || [];

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        {...hero}
        size="medium"
        showScrollIndicator={false}
      />筋

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle={sh['sh_catering_services']?.subtitle}
            title={sh['sh_catering_services']?.title}
            description={sh['sh_catering_services']?.description}
            titleSize="text-3xl md:text-4xl"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cateringServices.map((service: Record<string, string | string[]>) => {
              const IconComponent =
                (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
                service.icon as string
                ] || LucideIcons.Coffee;

              return (
                <div
                  key={service.title as string}
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
                    {(service.features as string[]).slice(0, 2).map((feature: string) => (
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
      <section className="section-padding bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle={sh['sh_catering_events']?.subtitle}
            title={sh['sh_catering_events']?.title}
            description={sh['sh_catering_events']?.description}
            titleSize="text-3xl md:text-4xl"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(eventsSettings?.items || []).map((image: string, index: number) => (
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
          <SectionHeader
            subtitle={sh['sh_catering_pricing']?.subtitle}
            title={sh['sh_catering_pricing']?.title}
            description={sh['sh_catering_pricing']?.description}
            titleSize="text-3xl md:text-4xl"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier: Record<string, string | boolean | string[]>) => (
              <div
                key={tier.name as string}
                className={`relative bg-card rounded-2xl border p-8 ${tier.popular
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
                  {(tier.features as string[]).map((feature: string) => (
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
