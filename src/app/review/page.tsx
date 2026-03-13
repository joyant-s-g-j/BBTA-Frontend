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
  const [testimonials, heroSettings] = await Promise.all([
    api.getTestimonials(),
    api.getHeroByPage("review"),
  ]);

  const hero = {
    title: heroSettings?.title || "Student Reviews",
    subtitle: heroSettings?.subtitle || "Real Voices, Real Results",
    description:
      heroSettings?.description ||
      "See what our students say about their learning journey, practical training, and career outcomes at BBTA.",
    backgroundImage: heroSettings?.backgroundImage || "",
  };

  const reviewSectionHeader = await api.getSectionHeader("sh_review_testimonials", {
    subtitle: "Student Testimonials",
    title: "What Our Students Say",
    description:
      "Every review comes directly from students managed in our admin panel testimonial section.",
  });

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

      <CTABanner
        title="Ready to Become Our Next Success Story?"
        description="Start your professional coffee journey with BBTA and build a career you are proud of."
        ctaText="Explore Courses"
        ctaHref="/bbta-courses"
      />
    </>
  );
}
