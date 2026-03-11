import { BannerSlider } from "@/components/sections/BannerSlider";
import { StatsSection } from "@/components/sections/StatsSection";
import { CourseGrid } from "@/components/course/CourseGrid";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { CareerGrowthSection } from "@/components/sections/CareerGrowthSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CertificationSection } from "@/components/sections/CertificationSection";
import { MediaCoverageSection } from "@/components/sections/MediaCoverageSection";
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
    bannerSlides,
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
    careerBenefits,
    mediaCoverage,
    sh,
  ] = await Promise.all([
    api.getBannerSlides(),
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
    api.getCareerBenefits(),
    api.getMediaCoverage(),
    api.getAllSectionHeaders(),
  ]);

  return (
    <>
      <BannerSlider
        slides={bannerSlides}
        ctaText={hero?.ctaText}
        ctaHref={hero?.ctaUrl}
        secondaryCtaText={hero?.secondaryCtaText}
        secondaryCtaHref={hero?.secondaryCtaUrl}
      />

      <StatsSection stats={stats} />

      <CourseGrid
        initialCourses={courses}
        maxCourses={8}
        mobileMaxCourses={4}
        showFilters={false}
        title={sh['sh_home_courses']?.title}
        subtitle={sh['sh_home_courses']?.subtitle}
        description={sh['sh_home_courses']?.description}
      />

      <UpcomingBatchesSection
        initialBatches={batches}
        limit={4}
        sectionHeader={sh['sh_home_batches']}
      />

      <FeaturesGrid
        initialFeatures={features}
        sectionHeader={sh['sh_home_features']}
      />

      <CareerGrowthSection
        initialCareerBenefits={careerBenefits}
        sectionHeader={sh['sh_home_career']}
      />

      <MediaCoverageSection
        initialItems={mediaCoverage}
        sectionHeader={sh['sh_home_media']}
      />

      <TestimonialsCarousel
        initialTestimonials={testimonials}
        sectionHeader={sh['sh_home_testimonials']}
      />

      <CertificationSection
        initialCertifications={certifications}
        sectionHeader={sh['sh_home_certs']}
      />

      <HomeFAQSection
        initialFaqs={faqs}
        sectionHeader={sh['sh_home_faq']}
      />

      <BranchesMap
        initialBranches={branches}
        sectionHeader={sh['sh_home_branches']}
      />

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
