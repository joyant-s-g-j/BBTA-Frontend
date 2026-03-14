import type { Metadata } from "next";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import * as api from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("consulting");
}

export default async function ConsultingPage() {
  const [allServices, caseStudiesSettings, heroSettings, sh] = await Promise.all([
    api.getServices(),
    api.getSettings('consulting_cases'),
    api.getHeroByPage('consulting'),
    api.getAllSectionHeaders()
  ]);

  const consultingServices = allServices?.filter((s: Record<string, string>) => s.category === 'Consulting') || [];

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

  const caseStudies = caseStudiesSettings?.items || [];

  return (
    <>
      <HeroSection
        {...hero}
        size="medium"
        showScrollIndicator={false}
      />

      {consultingServices.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle={sh['sh_consulting_svcs']?.subtitle}
              title={sh['sh_consulting_svcs']?.title}
              description={sh['sh_consulting_svcs']?.description}
              titleSize="text-3xl md:text-4xl"
            />

            <div className="grid md:grid-cols-2 gap-6">
              {consultingServices.map((service: Record<string, string | string[]>) => {
                const isUrl = typeof service.icon === "string" && ((service.icon as string).startsWith("http") || (service.icon as string).startsWith("/"));
                const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[service.icon as string] || LucideIcons.Coffee;

                return (
                  <div key={service.title as string} className="bg-card rounded-2xl border border-border p-8 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center overflow-hidden">
                        {isUrl ? (
                          <Image src={service.icon as string} alt={service.title as string} width={56} height={56} className="h-full w-full object-cover" />
                        ) : (
                          <IconComponent className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                        <ul className="space-y-2">
                          {(service.features as string[])?.map((feature: string) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
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
      )}

      {/* Case Studies */}
      <section className="section-padding bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle={sh['sh_consulting_cases']?.subtitle}
            title={sh['sh_consulting_cases']?.title}
            description={sh['sh_consulting_cases']?.description}
            titleSize="text-3xl md:text-4xl"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study: Record<string, string>) => (
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
                subtitle={sh['sh_consulting_form']?.subtitle}
                title={sh['sh_consulting_form']?.title}
                description={sh['sh_consulting_form']?.description}
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
              source="consulting"
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
