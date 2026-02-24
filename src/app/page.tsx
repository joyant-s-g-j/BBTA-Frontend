import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CourseGrid } from "@/components/course/CourseGrid";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { CareerGrowthSection } from "@/components/sections/CareerGrowthSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CertificationSection } from "@/components/sections/CertificationSection";
import { HomeFAQSection } from "@/components/sections/HomeFAQSection";
import { BranchesMap } from "@/components/sections/BranchesMap";
import { CTABanner } from "@/components/sections/CTABanner";
import { UpcomingBatchesSection } from "@/components/sections/UpcomingBatchesSection";
import * as api from "@/lib/api";

/**
 * Home Page
 * Main landing page with SSR data fetching for maximum performance.
 */
export default async function HomePage() {
  // Parallel fetching for SSR speed
  const [
    hero,
    stats,
    courses,
    batches,
    features,
    testimonials,
    certifications,
    faqs,
    cta,
    branches
  ] = await Promise.all([
    api.getHero(),
    api.getStats(),
    api.getCourses(),
    api.getBatches(),
    api.getFeatures(),
    api.getTestimonials(),
    api.getCertifications(),
    api.getFaqs(),
    api.getCtaBanner(),
    api.getBranches()
  ]);

  return (
    <>
      <HeroSection
        title={hero?.title || "Master the Art of Coffee"}
        subtitle={hero?.subtitle || "Bangladesh's Premier Barista Academy"}
        description={hero?.description || "Transform your passion for coffee into a professional career with ISO-certified training."}
        ctaText={hero?.ctaText || "Explore Courses"}
        ctaHref={hero?.ctaUrl || "/bbta-courses"}
        secondaryCtaText={hero?.secondaryCtaText || "Contact Us"}
        secondaryCtaHref={hero?.secondaryCtaUrl || "/contact"}
        backgroundImage={hero?.backgroundImage || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920"}
        size="full"
      />

      <StatsSection stats={stats} />

      <CourseGrid
        initialCourses={courses}
        maxCourses={8}
        mobileMaxCourses={4}
        showFilters={false}
        title="Popular Courses"
        subtitle="Start Your Journey"
      />

      <UpcomingBatchesSection initialBatches={batches} limit={4} />

      <FeaturesGrid initialFeatures={features} />

      <CareerGrowthSection />

      <TestimonialsCarousel initialTestimonials={testimonials} />

      <CertificationSection initialCertifications={certifications} />

      <HomeFAQSection initialFaqs={faqs} />

      <BranchesMap initialBranches={branches} />

      <CTABanner
        title={cta?.title || "Ready to Start Your Coffee Journey?"}
        description={cta?.description || "Join over 2,000 graduates who have transformed their passion."}
        ctaText={cta?.buttonText || "Enroll Now"}
        ctaHref={cta?.buttonUrl || "/bbta-courses"}
      />
    </>
  );
}
