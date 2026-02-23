"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Coffee,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses, branches, navLinks } from "@/lib/data";
import { toast } from "sonner";
import Image from "next/image";

/**
 * Footer Component
 * Multi-column footer with newsletter signup, social links, and quick navigation
 */
export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/bbta", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/bbta", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/bbta", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/bbta", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#0F3D2E] text-white border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* About Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-xl p-1">
                <Image src="/bbtalogo.webp" alt="BBTA Logo" width={64} height={64} className="h-12 w-auto lg:h-16 lg:w-24 object-contain" />
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Bangladesh Barista Training Academy - Your gateway to a professional
              coffee career. ISO certified training with international standards.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/upcoming-batch"
                  className="text-white font-medium hover:text-primary transition-colors text-sm underline-animated flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Upcoming Batches
                </Link>
              </li>
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm underline-animated"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses Column */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Popular Courses</h4>
            <ul className="space-y-3">
              {courses.slice(0, 6).map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/${course.slug}`}
                    className="text-white/70 hover:text-primary transition-colors text-sm underline-animated"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  {branches[0].address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a
                  href={`tel:${branches[0].phone}`}
                  className="text-white/70 hover:text-primary transition-colors text-sm"
                >
                  {branches[0].phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="mailto:info@bbta.com.bd"
                  className="text-white/70 hover:text-primary transition-colors text-sm"
                >
                  info@bbta.com.bd
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <h5 className="font-medium text-sm mb-3 text-white">Subscribe to Newsletter</h5>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center sm:text-left">
              © 2026 Bangladesh Barista Training Academy. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/certificate-verification"
                className="text-white/70 hover:text-primary transition-colors text-sm"
              >
                Verify Certificate
              </Link>
              <Link
                href="/contact"
                className="text-white/70 hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
