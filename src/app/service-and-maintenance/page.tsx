import type { Metadata } from "next";
import * as LucideIcons from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SectionHeader } from "@/components/ui/SectionHeader";
import * as api from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("services");
}

export default async function ServiceMaintenancePage() {
  const [allServices, pricingSettings, heroSettings, sh] = await Promise.all([
    api.getServices(),
    api.getSettings('maintenance_pricing'),
    api.getHeroByPage('maintenance'),
    api.getAllSectionHeaders()
  ]);

  const maintenanceServices = allServices?.filter((s: Record<string, string>) => s.category === 'Maintenance') || [];

  const hero = {
    title: heroSettings?.title || "",
    subtitle: heroSettings?.subtitle || "",
    description: heroSettings?.description || "",
    backgroundImage: heroSettings?.backgroundImage || "",
    ctaText: heroSettings?.ctaText || "",
    ctaHref: heroSettings?.ctaUrl || "",
    secondaryCtaText: heroSettings?.secondaryCtaText || "",
    secondaryCtaHref: heroSettings?.secondaryCtaUrl || ""
  };

  const pricingData = pricingSettings?.items || [];

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
            subtitle={sh['sh_maint_services']?.subtitle}
            title={sh['sh_maint_services']?.title}
            description={sh['sh_maint_services']?.description}
            titleSize="text-3xl md:text-4xl"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {maintenanceServices.map((service: Record<string, string | string[]>) => {
              const IconComponent =
                (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
                service.icon as string
                ] || LucideIcons.Wrench;

              return (
                <div
                  key={service.title as string}
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
                        {(service.features as string[]).map((feature: string) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <LucideIcons.CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
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

      {/* Pricing & Service Request */}
      <section className="section-padding bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Pricing Table */}
            <div className="lg:col-span-3">
              <SectionHeader
                subtitle={sh['sh_maint_rates']?.subtitle}
                title={sh['sh_maint_rates']?.title}
                description={sh['sh_maint_rates']?.description}
                align="left"
                titleSize="text-3xl md:text-4xl"
                className="mb-8 lg:mb-10"
              />

              {/* Mobile: Card layout */}
              <div className="space-y-3 md:hidden">
                {pricingData.map((item: Record<string, string>) => (
                  <div
                    key={item.service}
                    className="bg-card rounded-xl border border-border p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className="font-medium text-sm">{item.service}</h4>
                      <span className="text-primary font-semibold text-sm whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Desktop: Table layout */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-primary/20">
                      <TableHead>Service</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pricingData.map((item: Record<string, string>) => (
                      <TableRow key={item.service} className="border-border">
                        <TableCell className="font-medium">{item.service}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.description}
                        </TableCell>
                        <TableCell className="text-right text-primary font-semibold whitespace-nowrap">
                          {item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <p className="text-muted-foreground text-sm mt-6 text-center md:text-left">
                * Prices may vary based on equipment condition and parts required.
                Contact us for a detailed quote.
              </p>
            </div>

            {/* Service Request Form */}
            <div className="lg:col-span-2" id="service-form">
              <SectionHeader
                subtitle={sh['sh_maint_form']?.subtitle}
                title={sh['sh_maint_form']?.title}
                description={sh['sh_maint_form']?.description}
                align="left"
                titleSize="text-3xl md:text-4xl"
                className="mb-8 lg:mb-10"
              />
              <EnrollmentForm
                title="Service Request"
                description="Describe your equipment and issue. We'll respond within 24 hours."
                source="maintenance"
              />
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <CTABanner
        title="Keep Your Equipment Running Perfectly"
        description="Regular maintenance prevents costly breakdowns and ensures consistent quality."
        ctaText="Schedule Service"
        ctaHref="/contact"
        variant="dark"
      />
    </>
  );
}
