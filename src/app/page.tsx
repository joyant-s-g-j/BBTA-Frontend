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

/**
 * Home Page
 * Main landing page with hero, stats, courses, features, career growth, testimonials, certification, FAQ, and CTA
 */
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Master the Art of Coffee"
        subtitle="Bangladesh's Premier Barista Academy"
        description="Transform your passion for coffee into a professional career with ISO-certified training from industry experts."
        ctaText="Explore Courses"
        ctaHref="/bbta-courses"
        secondaryCtaText="Contact Us"
        secondaryCtaHref="/contact"
        backgroundImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920"
        size="full"
      />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Courses */}
      <CourseGrid
        maxCourses={8}
        mobileMaxCourses={4}
        showFilters={false}
        title="Popular Courses"
        subtitle="Start Your Journey"
      />

      {/* Features Grid — Why Choose BBTA */}
      <FeaturesGrid />

      {/* How Barista Training Grows Your Career */}
      <CareerGrowthSection />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Certification Section */}
      <CertificationSection />

      {/* FAQ Section */}
      <HomeFAQSection />

      {/* Branches Map */}
      <BranchesMap />

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Start Your Coffee Journey?"
        description="Join over 2,000 graduates who have transformed their passion for coffee into successful careers."
        ctaText="Enroll Now"
        ctaHref="/bbta-courses"
      />
    </>
  );
}
