import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ReviewTestimonialsGrid } from "@/components/sections/ReviewTestimonialsGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { generatePageMetadata } from "@/lib/seo";
import * as api from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("review");
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number | string;
  image?: string;
  createdAt?: string;
}

export default async function ReviewPage() {
  const [testimonials, heroSettings, reviewSectionHeader, ctaSettings] = await Promise.all([
    api.getTestimonials(),
    api.getHeroByPage("review"),
    api.getSectionHeader("sh_review_testimonials", { subtitle: "", title: "", description: "" }),
    api.getSettings("cta_review"),
  ]);

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

  const reviews = (testimonials as Testimonial[])
    .filter((item) => item?.name && item?.quote)
    .sort((a, b) => {
      if (!a.createdAt && !b.createdAt) return 0;
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <>
      <HeroSection {...hero} size="medium" showScrollIndicator={false} />

      <section className="section-padding bg-card/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle={reviewSectionHeader.subtitle}
            title={reviewSectionHeader.title}
            description={reviewSectionHeader.description}
            titleSize="text-3xl md:text-4xl"
          />

          {reviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              No reviews published yet. Please check again soon.
            </p>
          ) : (
            <ReviewTestimonialsGrid reviews={reviews} />
          )}
        </div>
      </section>

      {(ctaSettings?.title && ctaSettings?.ctaText && ctaSettings?.ctaUrl) ? (
        <CTABanner
          title={ctaSettings.title}
          description={ctaSettings.description || ""}
          ctaText={ctaSettings.ctaText}
          ctaHref={ctaSettings.ctaUrl}
        />
      ) : null}
    </>
  );
}
