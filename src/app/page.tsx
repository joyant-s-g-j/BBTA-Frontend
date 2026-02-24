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
    branches,
    careerBenefits
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
    api.getBranches(),
    api.getCareerBenefits()
  ]);

  return (
    <>
      {hero && (
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
          ctaText={hero.ctaText}
          ctaHref={hero.ctaUrl}
          secondaryCtaText={hero.secondaryCtaText}
          secondaryCtaHref={hero.secondaryCtaUrl}
          backgroundImage={hero.backgroundImage}
          size="full"
        />
      )}

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

      <CareerGrowthSection initialCareerBenefits={careerBenefits} />

      <TestimonialsCarousel initialTestimonials={testimonials} />

      <CertificationSection initialCertifications={certifications} />

      <HomeFAQSection initialFaqs={faqs} />

      <BranchesMap initialBranches={branches} />

      {cta && (
        <CTABanner
          title={cta.title}
          description={cta.description}
          ctaText={cta.buttonText}
          ctaHref={cta.buttonUrl}
        />
      )}
    </>
  );
}
