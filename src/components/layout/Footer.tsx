"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
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
import { toast } from "sonner";
import Image from "next/image";

/**
 * Footer Component
 * Multi-column footer with newsletter signup, social links, and quick navigation
 */
interface FooterSettings {
  footer?: { intro?: string; copyright?: string };
  contactInfo?: { address?: string; phone?: string; email?: string };
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: { facebook?: string; instagram?: string; twitter?: string; youtube?: string };
  logo?: string;
}

interface FooterCourse {
  slug: string;
  title: string;
}

export function Footer({ settings, courses }: { settings?: FooterSettings; courses?: FooterCourse[] }) {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const footerIntro = settings?.footer?.intro || "";
  const copyright = settings?.footer?.copyright || "";

  const address = settings?.contactInfo?.address || settings?.address || "";
  const phone = settings?.contactInfo?.phone || settings?.phone || "";
  const emailAddr = settings?.contactInfo?.email || settings?.email || "";

  const socialLinks = [
    { icon: Facebook, href: settings?.socialLinks?.facebook || "", label: "Facebook" },
    { icon: Instagram, href: settings?.socialLinks?.instagram || "", label: "Instagram" },
    { icon: Twitter, href: settings?.socialLinks?.twitter || "", label: "Twitter" },
    { icon: Youtube, href: settings?.socialLinks?.youtube || "", label: "YouTube" },
  ].filter((item) => item.href);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        toast.error("API URL is not configured.");
        return;
      }
      // Fetch existing subscribers
      const existingRes = await fetch(`${API_URL}/settings/blog_subscribers`);
      const existingData = await existingRes.json();
      const subscribers = existingData?.emails || [];

      if (subscribers.includes(email)) {
        toast.info("You're already subscribed!");
        setEmail("");
        setIsSubmitting(false);
        return;
      }

      // Add new subscriber
      await fetch(`${API_URL}/settings/blog_subscribers`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: [...subscribers, email] }),
      });
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background text-white border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 xl:gap-12">
          {/* About Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="rounded-xl p-1">
                {settings?.logo ? (
                  <Image src={settings.logo} alt="BBTA Logo" width={64} height={64} className="h-12 w-auto lg:h-16 lg:w-24 object-contain" />
                ) : null}
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {footerIntro}
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
            <h3 className="font-serif text-lg font-semibold mb-4 text-bbta-red">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/why-bbta", label: "Why BBTA" },
                { href: "/service-and-maintenance", label: "Service & Maintenance" },
                { href: "/success-stories", label: "Success Stories" },
                { href: "/catering", label: "Catering" },
                { href: "/consulting", label: "Consulting" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms-and-conditions", label: "Terms & Conditions" },
              ].map((link) => (
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
            <h3 className="font-serif text-lg font-semibold mb-4 text-bbta-red">Popular Courses</h3>
            <ul className="space-y-3">
              {(courses || []).slice(0, 6).map((course) => (
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
            <h3 className="font-serif text-lg font-semibold mb-4 text-bbta-red">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              {address ? (
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    {address}
                  </span>
                </li>
              ) : null}
              {phone ? (
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a
                    href={`tel:${phone}`}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {phone}
                  </a>
                </li>
              ) : null}
              {emailAddr ? (
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a
                    href={`mailto:${emailAddr}`}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {emailAddr}
                  </a>
                </li>
              ) : null}
            </ul>

            {/* Newsletter */}
            <h4 className="font-medium text-sm mb-3 text-bbta-red">Subscribe to Newsletter</h4>
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
                aria-label="Subscribe to newsletter"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex justify-between px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center sm:text-left">
              {copyright}
            </p>
          </div>
          <p className="text-white/50 text-sm text-center sm:text-left">
              Developed by{" "}
              <Link
                href="https://www.codethousand.net/"
                target="_blank"
              >
                Code Thousand
              </Link>
            </p>
        </div>
      </div>
    </footer>
  );
}
