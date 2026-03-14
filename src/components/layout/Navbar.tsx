"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coffee,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import Image from "next/image";
import { useState, useEffect } from "react"
import MobileNavbar from "./MobileNavbar";

interface CategoryNav {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
}

const useScrollPosition = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};

export function Navbar({ settings, categories: initialCategories = [] }: { settings?: Record<string, string>, categories?: CategoryNav[] }) {
  const categories = [...initialCategories].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  const pathname = usePathname();
  const isScrolled = useScrollPosition(50);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const mainNavLinks = navLinks.filter(
    (link) => link.href !== "/" && link.href !== "/about" && link.href !== "/bbta-courses" && link.href !== "/certificate-verification" && link.href !== "/consulting"
    && link.href !== "/catering" && link.href !== "/why-bbta" && link.href !== "/service-and-maintenance"
  );

  return (
    <div
      className={`flex justify-between items-center fixed top-0 left-0 right-0 py-3 px-4 sm:px-6 lg:px-8 xl:px-24 z-50 transition-all duration-300 ${isScrolled ? " backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="flex items-center gap-2 shrink-0">
        <Link href="/" onClick={handleLogoClick}>
          {typeof settings?.logo === "string" && settings.logo ? (
            <Image
              src={settings.logo}
              alt="BBTA Logo"
              width={64}
              height={64}
              className="h-12 w-auto lg:h-14 xl:h-16 lg:w-20 xl:w-24 object-contain"
              priority
            />
          ) : null}
          </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-1">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Home Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  "px-2.5 xl:px-4 py-2 text-xs xl:text-sm font-medium rounded-md transition-colors underline-animated",
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
                  "px-2.5 xl:px-4 py-2 text-xs xl:text-sm font-medium bg-transparent rounded-md transition-colors underline-animated",
                  pathname.includes("/bbta-courses") || categories.some(c => pathname.startsWith(`/${c.slug}`))
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-primary hover:text-white"
                )}
              >
                Courses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-125 xl:w-150 p-4 xl:p-6 glass-strong">
                  <div className="grid grid-cols-2 gap-3 xl:gap-4">
                    {/* All Courses Link */}
                    <Link
                      href="/bbta-courses"
                      className="col-span-2 flex items-center gap-3 p-3 xl:p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
                    >
                      <GraduationCap className="h-7 w-7 xl:h-8 xl:w-8 text-primary" />
                      <div>
                        <div className="font-semibold text-sm xl:text-base text-foreground group-hover:text-white transition-colors">
                          View All Courses
                        </div>
                        <p className="text-xs xl:text-sm text-muted-foreground group-hover:text-white/80">
                          Explore our complete range of professional training
                        </p>
                      </div>
                    </Link>

                    {/* Course Categories */}
                    {categories.slice(0, 6).map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/${cat.slug}`}
                        className="flex items-start gap-2 xl:gap-3 p-2.5 xl:p-3 rounded-lg hover:bg-primary transition-colors group"
                      >
                        <div className="p-1.5 xl:p-2 rounded-md bg-primary/10 group-hover:bg-primary/20">
                          <Coffee className="h-4 w-4 text-primary group-hover:text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-xs xl:text-sm text-foreground group-hover:text-white transition-colors">
                            {cat.name}
                          </div>
                          {cat.description && (
                            <p className="text-xs text-muted-foreground group-hover:text-white/70 mt-0.5 line-clamp-1">
                              {cat.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  "px-2.5 xl:px-4 py-2 text-xs xl:text-sm font-medium rounded-md transition-colors underline-animated",
                  pathname === "/about"
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-primary hover:text-white"
                )}
              >
                <Link href="/about">
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Other Nav Links */}
            {mainNavLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "px-2.5 xl:px-4 py-2 text-xs xl:text-sm font-medium rounded-md transition-colors underline-animated",
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
      <div className="flex items-center gap-2 lg:gap-3 shrink-0">
        <MobileNavbar />
        {/* Book Now Button (Desktop) */}
        <Link href="/certificate-verification" className="hidden lg:block">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-hover font-semibold text-xs xl:text-sm px-3 xl:px-4"
          >
            Certificate Verification
          </Button>
        </Link>
      </div>
    </div>
  );
}
