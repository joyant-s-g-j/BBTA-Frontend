"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  title?: string;
  subtitle?: string;
  description?: string;
  initialCourses?: Course[];
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
  title = "Our Courses",
  subtitle = "Explore Our Programs",
  description,
  initialCourses,
}: CourseGridProps) {
  const [displayCourses, setDisplayCourses] = React.useState<Course[]>(initialCourses || []);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [levelFilter, setLevelFilter] = React.useState("all");
  const [activeTab, setActiveTab] = React.useState("all");

  React.useEffect(() => {
    if (!initialCourses) {
      import("@/lib/api").then(api => {
        api.getCourses().then(data => {
          setDisplayCourses(data);
        });
      });
    }
  }, [initialCourses]);

  // Filter courses based on search, level, and tab
  const filteredCourses = React.useMemo(() => {
    let result = displayCourses;

    // Apply tab filter
    if (activeTab !== "all") {
      result = result.filter(
        (course) => course.level.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Apply level filter (for dropdown)
    if (levelFilter !== "all") {
      result = result.filter(
        (course) => course.level.toLowerCase() === levelFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      );
    }

    // Limit courses if maxCourses is set
    if (maxCourses) {
      result = result.slice(0, maxCourses);
    }

    return result;
  }, [displayCourses, searchQuery, levelFilter, activeTab, maxCourses]);

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

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
            {/* Tabs for Level Filter */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <TabsList className="bg-card/50 p-1">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    All Courses
                  </TabsTrigger>
                  {levels.map((level) => (
                    <TabsTrigger
                      key={level}
                      value={level.toLowerCase()}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hidden sm:inline-flex"
                    >
                      {level}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Search and Level Filter */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 sm:w-50 bg-card/50 border-border"
                    />
                  </div>

                  {/* Mobile Level Filter */}
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-32.5 sm:hidden bg-card/50 border-border">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level.toLowerCase()}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Course Grid */}
              <TabsContent value={activeTab} className="mt-0">
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((course, index) => (
                      <CourseCard
                        key={course.slug}
                        course={course}
                        index={index}
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
                        setLevelFilter("all");
                        setActiveTab("all");
                      }}
                      className="text-primary"
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        )}

        {/* Simple Grid without filters */}
        {!showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.slug}
                course={course}
                index={index}
                className={
                  mobileMaxCourses && index >= mobileMaxCourses
                    ? "hidden md:block"
                    : ""
                }
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {maxCourses && filteredCourses.length > maxCourses && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/bbta-courses">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View All Courses
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
