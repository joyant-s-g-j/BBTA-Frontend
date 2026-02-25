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
import * as api from "@/lib/api";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default async function CoursesPage() {
  const [faqs, heroSettings, sh] = await Promise.all([
    api.getFaqs(),
    api.getHeroByPage('courses'),
    api.getAllSectionHeaders()
  ]);

  const hero = {
    title: heroSettings?.title || "Explore Our Courses",
    subtitle: heroSettings?.subtitle || "Professional Training Programs",
    description: heroSettings?.description || "From beginner foundations to advanced professional certifications, find the perfect course to launch your coffee career.",
    backgroundImage: heroSettings?.backgroundImage || "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920"
  };

  return (
    <>
      <HeroSection
        {...hero}
        ctaText="View All Courses"
        ctaHref="#courses"
        size="medium"
        showScrollIndicator={false}
      />

      <div id="courses">
        <CourseGrid
          showFilters={true}
          showHeader={false}
        />
      </div>

      {faqs && faqs.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <SectionHeader
                  subtitle={sh['sh_courses_faq']?.subtitle}
                  title={sh['sh_courses_faq']?.title}
                  description={sh['sh_courses_faq']?.description}
                  align="left"
                  titleSize="text-3xl md:text-4xl"
                />

                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq: any, index: number) => (
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

              <div className="lg:sticky lg:top-24">
                <EnrollmentForm
                  title="Course Inquiry"
                  description="Interested in a course? Fill out the form below and our team will get back to you with details."
                  source="courses"
                />
              </div>
            </div>
          </div>
        </section>
      )}

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
