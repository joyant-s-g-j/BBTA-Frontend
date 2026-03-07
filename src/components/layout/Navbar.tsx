"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coffee,
  Menu,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navLinks, type Course } from "@/lib/data";
import Image from "next/image";

/**
 * Navbar Component
 * Sticky glassmorphism navigation with mega menu for courses
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Navbar({ settings, courses: initialCourses = [] }: { settings?: Record<string, string>, courses?: Course[] }) {
  const courses = initialCourses;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll behavior for navbar styling
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter main nav links (exclude courses for mega menu)
  const mainNavLinks = navLinks.filter(
    (link) => link.href !== "/bbta-courses" && link.href !== "/certificate-verification"
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "navbar-premium-gradient"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 transition-[height] duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-10">
            <div className="rounded-xl p-1 transition-colors">
              <Image
                src="/bbtalogo.webp"
                alt="BBTA Logo"
                width={64}
                height={64}
                className="h-12 w-auto lg:h-16 lg:w-24 object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-colors underline-animated",
                      pathname === "/"
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-primary hover:text-white"
                    )}
                  >
                    <Link href="/">
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Courses Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "px-4 py-2 text-sm font-medium bg-transparent rounded-md transition-colors underline-animated",
                      pathname.includes("/bbta-courses") || courses.some(c => pathname === `/${c.slug}`)
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-primary hover:text-white"
                    )}
                  >
                    Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-150 p-6 glass-strong">
                      <div className="grid grid-cols-2 gap-4">
                        {/* All Courses Link */}
                        <Link
                          href="/bbta-courses"
                          className="col-span-2 flex items-center gap-3 p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
                        >
                          <GraduationCap className="h-8 w-8 text-primary" />
                          <div>
                            <div className="font-semibold text-foreground group-hover:text-white transition-colors">
                              View All Courses
                            </div>
                            <p className="text-sm text-muted-foreground group-hover:text-white/80">
                              Explore our complete range of professional training
                            </p>
                          </div>
                        </Link>

                        {/* Course Categories */}
                        {courses.slice(0, 6).map((course) => (
                          <Link
                            key={course.slug}
                            href={`/${course.slug}`}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary transition-colors group"
                          >
                            <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20">
                              <Coffee className="h-4 w-4 text-primary group-hover:text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm text-foreground group-hover:text-white transition-colors">
                                {course.title}
                              </div>
                              <p className="text-xs text-muted-foreground group-hover:text-white/70 mt-0.5">
                                {course.duration} • {course.level}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other Nav Links */}
                {mainNavLinks.slice(2).map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-colors underline-animated",
                        pathname === link.href
                          ? "bg-primary text-white"
                          : "text-foreground hover:bg-primary hover:text-white"
                      )}
                    >
                      <Link href={link.href}>
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Book Now Button (Desktop) */}
            <Link href="/certificate-verification" className="hidden lg:block">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-hover font-semibold"
              >
                Certificate Verification
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-primary hover:text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass-strong py-4">
                <div className="flex flex-col h-full">

                  {/* Mobile Nav Links */}
                  <nav className="flex-1 space-y-1 overflow-y-auto">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center py-2 px-4 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:text-white hover:bg-primary"
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Mobile Book Now */}
                  <SheetClose asChild>
                    <Link href="/contact" className="mt-4">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold font-semibold py-5 text-base">
                        Book Now
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
