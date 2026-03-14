"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course/CourseCard";
import { type Course } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface CourseGridProps {
  maxCourses?: number;
  mobileMaxCourses?: number;
  showFilters?: boolean;
  showHeader?: boolean;
  showViewMoreButton?: boolean;
  viewMoreHref?: string;
  viewMoreLabel?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  initialCourses?: Course[];
  initialCategorySlug?: string;
}

/**
 * CourseGrid Component
 * Responsive grid of course cards with filtering and search
 */
export function CourseGrid({
  maxCourses,
  mobileMaxCourses,
  showFilters = true,
  showHeader = true,
  showViewMoreButton,
  viewMoreHref = "/bbta-courses",
  viewMoreLabel = "View More",
  title = "Our Courses",
  subtitle = "Explore Our Programs",
  description,
  initialCourses,
  initialCategorySlug,
}: CourseGridProps) {
  const router = useRouter();
  const [displayCourses, setDisplayCourses] = React.useState<Course[]>(initialCourses || []);
  const [categories, setCategories] = React.useState<{ id: string; name: string; slug: string; order?: number }[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  React.useEffect(() => {
    import("@/lib/api").then(api => {
      if (!initialCourses) {
        api.getCourses().then(data => {
          setDisplayCourses(data);
        });
      }
      api.getCourseCategories().then(data => {
        const cats = (data || []).sort((a: { order?: number }, b: { order?: number }) => (a.order ?? 999) - (b.order ?? 999));
        setCategories(cats);
        // Pre-select category from URL slug
        if (initialCategorySlug) {
          const matched = cats.find((c: { slug: string }) => c.slug === initialCategorySlug);
          if (matched) setCategoryFilter(matched.id);
        }
      });
    });
  }, [initialCourses, initialCategorySlug]);

  // Sync URL when category filter changes
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    if (value === "all") {
      router.push("/bbta-courses", { scroll: false });
    } else {
      const cat = categories.find((c) => c.id === value);
      if (cat) {
        router.push(`/${cat.slug}`, { scroll: false });
      }
    }
  };

  // Filter courses based on search and category
  const filteredCourses = React.useMemo(() => {
    let result = displayCourses;

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(
        (course) => course.categoryId === categoryFilter
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query) ||
          (course.categoryName || "").toLowerCase().includes(query)
      );
    }

    // Sort by order field first
    result.sort((a: Course & { order?: number }, b: Course & { order?: number }) => (a.order ?? 999) - (b.order ?? 999));

    // Limit courses if maxCourses is set (after sorting)
    if (maxCourses) {
      result = result.slice(0, maxCourses);
    }

    return result;
  }, [displayCourses, searchQuery, categoryFilter, maxCourses]);

  // Get the category slug for a course
  const getCategorySlugForCourse = (course: Course) => {
    if (!course.categoryId) return undefined;
    const cat = categories.find((c) => c.id === course.categoryId);
    return cat?.slug;
  };

  return (
    <section className="section-padding bg-card relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {showHeader && (
          <SectionHeader
            subtitle={subtitle}
            title={title}
            description={description || "From beginner foundations to advanced professional training, find the perfect course for your coffee career."}
            titleSize="text-3xl md:text-4xl"
          />
        )}

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {/* Category Filter and Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:w-56 bg-card/50 border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:w-56 bg-card/50 border-border"
                />
              </div>
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course, index) => (
                  <CourseCard
                    key={course.slug}
                    course={course}
                    index={index}
                    categorySlug={getCategorySlugForCourse(course)}
                    className={
                      mobileMaxCourses && index >= mobileMaxCourses
                        ? "hidden md:block"
                        : ""
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No courses found matching your criteria.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("");
                    handleCategoryChange("all");
                  }}
                  className="text-primary"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Simple Grid without filters */}
        {!showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.slug}
                course={course}
                index={index}
                categorySlug={getCategorySlugForCourse(course)}
                className={
                  mobileMaxCourses && index >= mobileMaxCourses
                    ? "hidden md:block"
                    : ""
                }
              />
            ))}
          </div>
        )}

        {/* View More Button */}
        {(showViewMoreButton ?? !!maxCourses) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href={viewMoreHref}>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                {viewMoreLabel}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
