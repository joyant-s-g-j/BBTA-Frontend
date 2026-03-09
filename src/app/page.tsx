import { BannerSlider } from "@/components/sections/BannerSlider";
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
    bannerSlides,
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
    sh,
  ] = await Promise.all([
    api.getBannerSlides(),
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
    api.getAllSectionHeaders(),
  ]);

  return (
    <>
      <BannerSlider slides={bannerSlides} />

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
