import type { Metadata } from "next";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { generatePageMetadata } from "@/lib/seo";
import * as api from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("review", {
    title: "Student Reviews",
    description:
      "Read authentic student testimonials and reviews from BBTA graduates who built successful coffee careers through our training.",
    keywords:
      "BBTA reviews, student testimonials, barista training reviews, coffee academy feedback",
  });
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
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-12">
              {reviews.map((review) => {
                const rating = Math.max(0, Math.min(5, Number(review.rating || 0)));

                return (
                  <article
                    key={review.id}
                    className="group relative rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm p-6 card-hover overflow-hidden"
                  >
                    <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 rounded-full overflow-hidden border border-primary/30 shrink-0 bg-muted">
                            {review.image ? (
                              <Image
                                src={review.image}
                                alt={review.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-lg font-bold text-primary">
                                {review.name.charAt(0)}
                              </div>
                            )}
                          </div>

                          <div>
                            <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                              {review.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{review.role}</p>
                          </div>
                        </div>

                        <Quote className="h-8 w-8 text-primary/30 shrink-0" />
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={`${review.id}-${index}`}
                            className={`h-4 w-4 ${index < rating ? "text-primary fill-primary" : "text-muted-foreground/40"}`}
                          />
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
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
