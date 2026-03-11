import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnrollmentForm } from "@/components/course/EnrollmentForm";
import { CourseCard } from "@/components/course/CourseCard";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import * as api from "@/lib/api";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { type Course } from "@/lib/data";

interface CourseDetailProps {
  params: Promise<{ slug: string; courseSlug: string }>;
}

// Generate static params for all category+course combinations
export async function generateStaticParams() {
  const [courses, categories] = await Promise.all([
    api.getCourses(),
    api.getCourseCategories(),
  ]);
  const params: { slug: string; courseSlug: string }[] = [];
  for (const course of courses) {
    if (course.categoryId) {
      const cat = (categories || []).find(
        (c: { id: string }) => c.id === course.categoryId
      );
      if (cat) {
        params.push({ slug: cat.slug, courseSlug: course.slug });
      }
    }
  }
  return params;
}

// Generate metadata
export async function generateMetadata({
  params,
}: CourseDetailProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await api.getCourseBySlug(courseSlug);

  if (!course) {
    return { title: "Course Not Found" };
  }

  return {
    title: course.title,
    description: course.shortDescription,
    openGraph: {
      title: `${course.title} | BBTA Courses`,
      description: course.shortDescription,
      images: [{ url: course.image, alt: course.title }],
    },
  };
}

// Level color mapping
const levelColors: Record<string, string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Expert: "bg-red-500/20 text-red-400 border-red-500/30",
  All: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { courseSlug } = await params;

  const [course, allCourses, categories, sh] = await Promise.all([
    api.getCourseBySlug(courseSlug),
    api.getCourses(),
    api.getCourseCategories(),
    api.getAllSectionHeaders(),
  ]);

  if (!course) {
    notFound();
  }

  // Get related courses (same category)
  const relatedCourses = allCourses
    .filter(
      (c: Course) =>
        c.slug !== course.slug && c.categoryId === course.categoryId
    )
    .slice(0, 3);

  // Helper to get category slug for a course
  const getCatSlug = (c: Course) => {
    if (!c.categoryId) return undefined;
    const cat = (categories || []).find(
      (ct: { id: string }) => ct.id === c.categoryId
    );
    return cat?.slug;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24">
        <div className="absolute inset-0 h-[60vh] z-0">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,transparent_35%),linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className={`border ${levelColors[course.level]}`}>
                {course.level}
              </Badge>
              <Badge
                variant="outline"
                className="border-foreground/30 text-foreground"
              >
                <Clock className="mr-1 h-3 w-3" />
                {course.duration}
              </Badge>
              {course.discountPercent && course.discountPercent > 0 ? (
                <>
                  <Badge
                    variant="outline"
                    className="border-foreground/30 text-foreground line-through opacity-60"
                  >
                    <DollarSign className="mr-1 h-3 w-3" />
                    {course.price}
                  </Badge>
                  <Badge className="bg-bbta-red text-white border-none">
                    <DollarSign className="mr-1 h-3 w-3" />৳
                    {Math.round(
                      Number(
                        String(course.price).replace(/[^0-9]/g, "")
                      ) *
                        (1 - course.discountPercent / 100)
                    ).toLocaleString()}
                  </Badge>
                  <Badge className="bg-bbta-red/10 text-bbta-red border-bbta-red/30">
                    {course.discountPercent}% OFF
                  </Badge>
                </>
              ) : (
                <Badge
                  variant="outline"
                  className="border-foreground/30 text-foreground"
                >
                  <DollarSign className="mr-1 h-3 w-3" />
                  {course.price}
                </Badge>
              )}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {course.title}
            </h1>

            <div className="flex flex-wrap gap-4">
              <Link href="#enroll">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-hover px-8"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Enroll Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground/30 text-foreground hover:bg-foreground/10 px-8"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding -mt-20 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold mb-6">
                  Course Description
                </h2>
                <div
                  className="text-base md:text-base mb-8 max-w-2xl prose prose-invert prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: course.fullDescription }}
                />
              </div>

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold mb-6">
                  What You&apos;ll Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.features.map((feature: string) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-3 rounded-lg bg-card/50"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold mb-6">
                  Course Curriculum
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {course.curriculum.map(
                    (
                      item: { day: string; topics: string[] },
                      index: number
                    ) => (
                      <AccordionItem key={index} value={`day-${index}`}>
                        <AccordionTrigger className="text-left font-medium hover:text-primary">
                          <span className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                              {index + 1}
                            </span>
                            {item.day}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11">
                          <ul className="space-y-2">
                            {item.topics.map(
                              (topic: string, topicIndex: number) => (
                                <li
                                  key={topicIndex}
                                  className="flex items-start gap-2 text-muted-foreground"
                                >
                                  <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                  {topic}
                                </li>
                              )
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div id="enroll" className="sticky top-24">
                <EnrollmentForm
                  selectedCourse={course.slug}
                  variant="full"
                  title={`Enroll in ${course.title}`}
                  description="Secure your spot today. Classes fill up quickly!"
                  source="courses"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsCarousel sectionHeader={sh["sh_home_testimonials"]} />

      {relatedCourses.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle={sh["sh_course_related"]?.subtitle}
              title={sh["sh_course_related"]?.title}
              description={sh["sh_course_related"]?.description}
              titleSize="text-3xl md:text-4xl"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map(
                (relatedCourse: Course, index: number) => (
                  <CourseCard
                    key={relatedCourse.slug}
                    course={relatedCourse}
                    index={index}
                    categorySlug={getCatSlug(relatedCourse)}
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
