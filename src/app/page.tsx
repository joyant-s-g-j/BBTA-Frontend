import dynamic from "next/dynamic";
import { BannerSlider } from "@/components/sections/BannerSlider";
import { StatsSection } from "@/components/sections/StatsSection";
import { CourseGrid } from "@/components/course/CourseGrid";
import * as api from "@/lib/api";

// Lazy-load below-fold sections for reduced initial JS payload
const UpcomingBatchesSection = dynamic(() => import("@/components/sections/UpcomingBatchesSection").then(m => ({ default: m.UpcomingBatchesSection })));
const FeaturesGrid = dynamic(() => import("@/components/sections/FeaturesGrid").then(m => ({ default: m.FeaturesGrid })));
const CareerGrowthSection = dynamic(() => import("@/components/sections/CareerGrowthSection").then(m => ({ default: m.CareerGrowthSection })));
const MediaCoverageSection = dynamic(() => import("@/components/sections/MediaCoverageSection").then(m => ({ default: m.MediaCoverageSection })));
const TestimonialsCarousel = dynamic(() => import("@/components/sections/TestimonialsCarousel").then(m => ({ default: m.TestimonialsCarousel })));
const CertificationSection = dynamic(() => import("@/components/sections/CertificationSection").then(m => ({ default: m.CertificationSection })));
const HomeFAQSection = dynamic(() => import("@/components/sections/HomeFAQSection").then(m => ({ default: m.HomeFAQSection })));
const BranchesMap = dynamic(() => import("@/components/sections/BranchesMap").then(m => ({ default: m.BranchesMap })));
const CTABanner = dynamic(() => import("@/components/sections/CTABanner").then(m => ({ default: m.CTABanner })));

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

      <StatsSection stats={stats} sectionHeader={sh['sh_home_stats']} />

      <CourseGrid
        initialCourses={courses}
        maxCourses={8}
        mobileMaxCourses={4}
        showFilters={false}
        showViewMoreButton
        viewMoreHref="/bbta-courses"
        viewMoreLabel="View More"
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
