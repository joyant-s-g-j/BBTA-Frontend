import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CourseGrid } from "@/components/course/CourseGrid";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore BBTA's comprehensive range of barista training courses. From beginner foundations to advanced professional programs, find the perfect course for your coffee career.",
  openGraph: {
    title: "Courses | BBTA - Bangladesh Barista Training Academy",
    description:
      "Explore our comprehensive range of barista training courses.",
  },
};

/**
 * BBTA Courses Page
 * All courses with filtering, search, and FAQs
 */
export default function CoursesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Explore Our Courses"
        subtitle="Professional Training Programs"
        description="From beginner foundations to advanced professional certifications, find the perfect course to launch your coffee career."
        ctaText="View All Courses"
        ctaHref="#courses"
        backgroundImage="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Course Grid with Filters */}
      <div id="courses">
        <CourseGrid
          showFilters={true}
          showHeader={false}
        />
      </div>

      {/* FAQs Section */}
      <section className="section-padding bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: FAQs */}
            <div>
              <SectionHeader
                subtitle="Common Questions"
                title="Frequently Asked Questions"
                description="Everything you need to know about our courses and certification."
                align="left"
                titleSize="text-3xl md:text-4xl"
              />

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-medium hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right: Enrollment Form */}
            <div className="lg:sticky lg:top-24">
              <EnrollmentForm
                title="Course Inquiry"
                description="Interested in a course? Fill out the form below and our team will get back to you with details."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Can't Decide Which Course?"
        description="Contact us for a free consultation and we'll help you choose the perfect program for your goals."
        ctaText="Get in Touch"
        ctaHref="/contact"
        variant="dark"
      />
    </>
  );
}
