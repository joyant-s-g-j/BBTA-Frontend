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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { maintenanceServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Servicing & Maintenance",
  description:
    "Professional espresso machine repair, grinder calibration, and preventive maintenance services for cafes and businesses.",
  openGraph: {
    title: "Servicing & Maintenance | BBTA",
    description: "Professional coffee equipment maintenance services.",
  },
};

/**
 * Servicing & Maintenance Page
 */
export default function ServiceMaintenancePage() {
  const pricingData = [
    {
      service: "Basic Inspection",
      description: "Visual inspection and basic testing",
      price: "1,500 BDT",
    },
    {
      service: "Espresso Machine Cleaning",
      description: "Deep cleaning and descaling",
      price: "3,500 BDT",
    },
    {
      service: "Grinder Calibration",
      description: "Precision alignment and calibration",
      price: "2,500 BDT",
    },
    {
      service: "Minor Repairs",
      description: "Gasket, seal, and minor part replacement",
      price: "From 4,000 BDT",
    },
    {
      service: "Major Repairs",
      description: "Boiler, pump, and major component work",
      price: "From 12,000 BDT",
    },
    {
      service: "Monthly Maintenance Plan",
      description: "Regular scheduled maintenance visits",
      price: "8,000 BDT/month",
    },
    {
      service: "Annual Service Contract",
      description: "Comprehensive yearly coverage",
      price: "80,000 BDT/year",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Equipment Servicing"
        subtitle="Keep Your Machines Running Perfect"
        description="Expert maintenance and repair services for all major espresso machine and grinder brands."
        ctaText="Request Service"
        ctaHref="#service-form"
        backgroundImage="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Services Accordion */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
                Our Services
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Comprehensive Equipment Care
              </h2>
              <p className="text-muted-foreground mb-8">
                Our certified technicians specialize in maintaining and repairing
                all major coffee equipment brands to keep your cafe running
                smoothly.
              </p>

              <Accordion type="single" collapsible className="w-full">
                {maintenanceServices.map((service, index) => {
                  const IconComponent =
                    (LucideIcons as any)[
                      service.icon
                    ] || LucideIcons.Wrench;

                  return (
                    <AccordionItem key={service.title} value={`service-${index}`}>
                      <AccordionTrigger className="hover:text-primary">
                        <span className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          {service.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pl-8">
                        <p className="text-muted-foreground mb-3">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-sm"
                            >
                              <LucideIcons.CheckCircle2 className="h-4 w-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

            {/* Brands We Service */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-6">
                Brands We Service
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "La Marzocco",
                  "Nuova Simonelli",
                  "Victoria Arduino",
                  "Slayer",
                  "Synesso",
                  "Rocket",
                  "Breville",
                  "Rancilio",
                  "Mahlkönig",
                  "Mazzer",
                  "Eureka",
                  "Baratza",
                ].map((brand) => (
                  <div
                    key={brand}
                    className="bg-card rounded-lg border border-border p-4 text-center hover:border-primary/50 transition-colors"
                  >
                    <span className="text-sm font-medium">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Service Request */}
      <section className="section-padding bg-[#F8F8F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Pricing Table */}
            <div className="lg:col-span-3">
              <div className="text-center lg:text-left mb-8 lg:mb-10">
                <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
                  Pricing
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">
                  Service Rates
                </h2>
              </div>

              {/* Mobile: Card layout */}
              <div className="space-y-3 md:hidden">
                {pricingData.map((item) => (
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
                    {pricingData.map((item) => (
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
              <div className="text-center lg:text-left mb-8 lg:mb-10">
                <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
                  Get Started
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">
                  Request Service
                </h2>
              </div>
              <EnrollmentForm
                title="Service Request"
                description="Describe your equipment and issue. We'll respond within 24 hours."
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
