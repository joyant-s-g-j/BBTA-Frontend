import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { Toaster } from "sonner";
import "./globals.css";

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
export const metadata: Metadata = {
  metadataBase: new URL("https://bbta.com.bd"),
  title: {
    default: "BBTA - Bangladesh Barista Training Academy | Professional Coffee Training",
    template: "%s | BBTA - Bangladesh Barista Training Academy",
  },
  description:
    "Bangladesh's premier barista training academy. ISO certified courses in espresso, latte art, roasting, and cafe management. Transform your passion for coffee into a professional career.",
  keywords: [
    "barista training",
    "coffee courses",
    "Bangladesh",
    "Dhaka",
    "latte art",
    "espresso training",
    "cafe management",
    "coffee roasting",
    "SCA certification",
    "BBTA",
  ],
  authors: [{ name: "Bangladesh Barista Training Academy" }],
  creator: "BBTA",
  publisher: "Bangladesh Barista Training Academy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bbta.com.bd",
    siteName: "BBTA - Bangladesh Barista Training Academy",
    title: "BBTA - Bangladesh Barista Training Academy",
    description:
      "Transform your passion for coffee into a professional career. ISO certified barista training courses in Dhaka.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BBTA - Bangladesh Barista Training Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BBTA - Bangladesh Barista Training Academy",
    description:
      "Transform your passion for coffee into a professional career. ISO certified barista training courses in Dhaka.",
    images: ["/og-image.jpg"],
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
};

import * as api from "@/lib/api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, courses] = await Promise.all([
    api.getSettings(),
    api.getCourses()
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {/* Main Layout */}
        <div className="relative min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar settings={settings} courses={courses} />

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer settings={settings} />

          {/* Back to Top Button */}
          <BackToTop />
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          theme="light"
        />
      </body>
    </html>
  );
}
