import type { Metadata } from "next";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { generatePageMetadata } from "@/lib/seo";
import * as api from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("why_bbta");
}

export default async function WhyBbtaPage() {
  const [
    heroSettings,
    sh,
    whyBbtaPoints,
    stats,
    testimonials,
    whyBbtaContent,
  ] = await Promise.all([
    api.getHeroByPage("why_bbta"),
    api.getAllSectionHeaders(),
    api.getWhyBbtaPoints(),
    api.getStats(),
    api.getTestimonials(),
    api.getSettings("why_bbta_content"),
  ]);

  const hero = {
    title: heroSettings?.title || "",
    subtitle: heroSettings?.subtitle || "",
    description: heroSettings?.description || "",
    backgroundImage: heroSettings?.backgroundImage || "",
  };

  const introText =
    whyBbtaContent?.introText || "";
  const introImage =
    whyBbtaContent?.introImage || "";

  return (
    <>
      {/* Hero Section */}
      <HeroSection {...hero} size="medium" showScrollIndicator={false} />

      {/* Introduction Section */}
      {(introText || introImage) && (
        <section className="section-padding">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader
                  subtitle={sh["sh_why_bbta_points"]?.subtitle || "Our Strengths"}
                  title={sh["sh_why_bbta_points"]?.title || "Why Choose BBTA?"}
                  description={sh["sh_why_bbta_points"]?.description}
                  align="left"
                  titleSize="text-3xl md:text-4xl"
                  className="mb-6"
                />
                {introText && (
                  <div
                    className="space-y-4 text-muted-foreground whitespace-pre-line prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: introText }}
                  />
                )}
              </div>
              {introImage && (
                <div className="relative h-100 lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={introImage}
                    alt="Why BBTA"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Key Points / Advantages Grid */}
      {whyBbtaPoints && whyBbtaPoints.length > 0 && (
        <section className="section-padding bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {!(introText || introImage) && (
              <SectionHeader
                subtitle={sh["sh_why_bbta_points"]?.subtitle || "Our Strengths"}
                title={sh["sh_why_bbta_points"]?.title || "Why Choose BBTA?"}
                description={sh["sh_why_bbta_points"]?.description}
                titleSize="text-3xl md:text-4xl"
              />
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyBbtaPoints.map(
                (point: {
                  id: string;
                  title: string;
                  description: string;
                  icon: string;
                  image?: string;
                }) => {
                  const isUrl =
                    typeof point.icon === "string" &&
                    (point.icon.startsWith("http") ||
                      point.icon.startsWith("/"));
                  const IconComponent =
                    (
                      LucideIcons as unknown as Record<
                        string,
                        React.ComponentType<{ className?: string }>
                      >
                    )[point.icon] || LucideIcons.Star;

                  return (
                    <div
                      key={point.id}
                      className="group bg-card rounded-2xl border border-border p-8 card-hover relative overflow-hidden"
                    >
                      {/* Optional background image */}
                      {point.image && (
                        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Image
                            src={point.image}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="relative z-10">
                        <div className="p-3 rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                          {isUrl ? (
                            <Image
                              src={point.icon}
                              alt={point.title}
                              width={32}
                              height={32}
                              className="h-8 w-8 object-contain"
                            />
                          ) : (
                            <IconComponent className="h-7 w-7 text-primary" />
                          )}
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <StatsSection
          stats={stats}
          sectionHeader={sh["sh_why_bbta_impact"]}
        />
      )}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <TestimonialsCarousel
          initialTestimonials={testimonials}
          sectionHeader={{
            subtitle: "Success Stories",
            title: "What Our Graduates Say",
            description: "Hear from the professionals who launched their coffee careers with BBTA.",
          }}
        />
      )}

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Join Bangladesh's Best Barista Academy?"
        description="Take the first step toward a rewarding coffee career with BBTA."
        ctaText="Explore Courses"
        ctaHref="/bbta-courses"
      />
    </>
  );
}
