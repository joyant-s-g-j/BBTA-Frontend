import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  DollarSign,
  Award,
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
import { courses, type Course } from "@/lib/data";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all courses
export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

// Generate metadata for each course
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description: course.fullDescription,
    openGraph: {
      title: `${course.title} | BBTA Courses`,
      description: course.description,
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

/**
 * Individual Course Detail Page
 */
export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  // Get related courses (same level or adjacent)
  const relatedCourses = courses
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 h-[60vh] z-0">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className={`border ${levelColors[course.level]}`}>
                {course.level}
              </Badge>
              <Badge variant="outline" className="border-foreground/30 text-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {course.duration}
              </Badge>
              <Badge variant="outline" className="border-foreground/30 text-foreground">
                <DollarSign className="mr-1 h-3 w-3" />
                {course.price}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              {course.fullDescription}
            </p>

            {/* CTA Buttons */}
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
            {/* Left Column - Course Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Features Grid */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold mb-6">
                  What You&apos;ll Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.features.map((feature) => (
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

              {/* Curriculum Accordion */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold mb-6">
                  Course Curriculum
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {course.curriculum.map((item, index) => (
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
                          {item.topics.map((topic, topicIndex) => (
                            <li
                              key={topicIndex}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Course Includes */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold mb-6">
                  This Course Includes
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Hands-on training with professional equipment",
                    "Training materials and workbook",
                    "Practice ingredients provided",
                    "ISO-certified completion certificate",
                    "Job placement assistance",
                    "Access to alumni network",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Enrollment Form */}
            <div className="lg:col-span-1">
              <div id="enroll" className="sticky top-24">
                <EnrollmentForm
                  selectedCourse={course.slug}
                  variant="full"
                  title={`Enroll in ${course.title}`}
                  description="Secure your spot today. Classes fill up quickly!"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Related Courses */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Continue Learning
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Related Courses
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((relatedCourse, index) => (
              <CourseCard
                key={relatedCourse.slug}
                course={relatedCourse}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
