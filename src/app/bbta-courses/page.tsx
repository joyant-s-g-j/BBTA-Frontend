import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CourseGrid } from "@/components/course/CourseGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

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
      <section className="section-padding bg-[#F8F8F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Common Questions
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
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
