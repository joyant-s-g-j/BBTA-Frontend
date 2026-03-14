import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import { CourseGrid } from "@/components/course/CourseGrid";
import * as api from "@/lib/api";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlogPostContent, generateBlogPostMetadata } from "@/lib/blog-post-page";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for category listing pages
export async function generateStaticParams() {
  const [categories, posts] = await Promise.all([
    api.getCourseCategories(),
    api.getBlogPosts(),
  ]);
  const allSlugs = new Set<string>();
  (categories || []).forEach((cat: { slug: string }) => allSlugs.add(cat.slug));
  (posts || []).forEach((post: { slug: string }) => allSlugs.add(post.slug));
  return Array.from(allSlugs).map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if slug matches a category
  const categories = await api.getCourseCategories();
  const category = (categories || []).find((c: { slug: string }) => c.slug === slug);
  if (category) {
    return {
      title: `${category.name} | BBTA Courses`,
      description: category.description || `Browse ${category.name} courses at BBTA.`,
    };
  }

  // For direct course slugs, metadata before redirect
  const course = await api.getCourseBySlug(slug);
  if (course) {
    return {
      title: course.title,
      description: course.shortDescription,
    };
  }

  const blogMetadata = await generateBlogPostMetadata(slug);
  if (blogMetadata) {
    return blogMetadata;
  }

  return {
    title: "Not Found",
  };
}

/**
 * Dynamic page: handles category listings and redirects direct course slugs
 */
export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  // Check if slug matches a category
  const allCategories = await api.getCourseCategories();
  const matchedCategory = (allCategories || []).find((c: { slug: string }) => c.slug === slug);

  if (matchedCategory) {
    const [faqs, heroSettings, sh] = await Promise.all([
      api.getFaqs(),
      api.getHeroByPage('courses'),
      api.getAllSectionHeaders(),
    ]);
    const hero = {
    title: heroSettings?.title || "",
    subtitle: heroSettings?.subtitle || "",
    description: heroSettings?.description || "",
    backgroundImage: heroSettings?.backgroundImage || "",
    ctaText: heroSettings?.ctaText || "",
    ctaHref: heroSettings?.ctaUrl || "",
    secondaryCtaText: heroSettings?.secondaryCtaText || "",
    secondaryCtaHref: heroSettings?.secondaryCtaUrl || ""
  };
    return (
      <>
        <HeroSection {...hero} size="medium" showScrollIndicator={false} />
        <div id="courses">
          <CourseGrid showFilters={true} showHeader={false} initialCategorySlug={slug} />
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
                    {faqs.map((faq: Record<string, string>, index: number) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left font-medium hover:text-primary">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                <div className="lg:sticky lg:top-24">
                  <EnrollmentForm title="Course Inquiry" description="Interested in a course? Fill out the form below and our team will get back to you with details." source="courses" />
                </div>
              </div>
            </div>
          </section>
        )}
        <CTABanner title="Can't Decide Which Course?" description="Contact us for a free consultation and we'll help you choose the perfect program for your goals." ctaText="Get in Touch" ctaHref="/contact" variant="dark" />
      </>
    );
  }

  const blogPost = await api.getBlogPost(slug);
  if (blogPost) {
    return <BlogPostContent slug={slug} />;
  }

  // Direct course slug — redirect to /{category-slug}/{course-slug}
  const course = await api.getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Find the category for this course and redirect
  if (course.categoryId) {
    const cat = (allCategories || []).find((c: { id: string }) => c.id === course.categoryId);
    if (cat) {
      redirect(`/${cat.slug}/${course.slug}`);
    }
  }

  // If course has no category, redirect to bbta-courses
  redirect(`/bbta-courses`);
}
