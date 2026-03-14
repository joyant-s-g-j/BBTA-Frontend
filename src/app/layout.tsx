import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { PromoBanner } from "@/components/layout/PromoBanner";
import { Toaster } from "sonner";
import "./globals.css";

import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE } from "@/lib/constants";

// Configure Inter font for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Configure Playfair Display for headings
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const [seo, settings] = await Promise.all([
    import("@/lib/api").then(api => api.getSeoByPage("home")),
    import("@/lib/api").then(api => api.getSettings("site")),
  ]);

  const siteName = settings?.siteName || SITE_NAME || "";
  const title = seo?.metaTitle || "";
  const description = seo?.metaDescription || DEFAULT_DESCRIPTION;
  const keywords = seo?.keywords
    ? seo.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
    : DEFAULT_KEYWORDS;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const ogImage = seo?.ogImage || DEFAULT_OG_IMAGE;
  const metadataBase = SITE_URL ? new URL(SITE_URL) : undefined;

  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: {
      default: title,
      template: siteName ? `%s | ${siteName}` : "%s",
    },
    description,
    keywords,
    authors: siteName ? [{ name: siteName }] : [],
    creator: siteName,
    publisher: siteName,
    ...(SITE_URL
      ? {
        alternates: {
          canonical: SITE_URL,
        },
      }
      : {}),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName,
      title: ogTitle,
      description: ogDescription,
      images: ogImage
        ? [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: siteName,
          },
        ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    verification: {
      // These are populated dynamically from admin settings (globalSeo)
      // google: "your-google-verification-code",
      // other: { "facebook-domain-verification": "your-fb-verification-code" },
    },
  };
}

import * as api from "@/lib/api";
import parse from "html-react-parser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, courses, categories, promoBanner] = await Promise.all([
    api.getSettings(),
    api.getCourses(),
    api.getCourseCategories(),
    api.getPromoBanner(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Site Verification - dynamic */}
        {settings?.globalSeo?.googleVerification && (
          <meta name="google-site-verification" content={settings.globalSeo.googleVerification} />
        )}
        {/* Facebook Domain Verification - dynamic */}
        {settings?.globalSeo?.facebookVerification && (
          <meta name="facebook-domain-verification" content={settings.globalSeo.facebookVerification} />
        )}
        {/* Global Header Scripts (Google Analytics, Meta Pixel, etc.) */}
        {settings?.globalSeo?.headerScripts && parse(settings.globalSeo.headerScripts)}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {/* Main Layout */}
        <div className="relative min-h-screen flex flex-col overflow-x-hidden">
          {/* Navbar */}
          <Navbar settings={settings} categories={categories} />

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer settings={settings} courses={courses} />

          {/* Back to Top Button */}
          <BackToTop />

          {/* Promo Banner */}
          <PromoBanner data={promoBanner} />
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          theme="light"
        />

        {/* Global Footer Scripts */}
        {settings?.globalSeo?.footerScripts && parse(settings.globalSeo.footerScripts)}
      </body>
    </html>
  );
}
