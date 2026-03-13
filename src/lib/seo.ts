import type { Metadata } from "next";
import { getSeoByPage } from "./api";

const SITE_NAME = "BBTA - Bangladesh Barista Training Academy";
const SITE_URL = "https://bbta-frontend.vercel.app";

interface SeoDefaults {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
}

function formatPageTitle(page: string): string {
    return page
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Generates dynamic page metadata by fetching SEO data from backend.
 * Falls back to provided defaults if no backend data exists.
 * 
 * Usage in page.tsx:
 * ```ts
 * export async function generateMetadata() {
 *   return generatePageMetadata("about", {
 *     title: "About Us",
 *     description: "Learn about BBTA...",
 *   });
 * }
 * ```
 */
export async function generatePageMetadata(
    page: string,
    defaults: SeoDefaults = {}
): Promise<Metadata> {
    const seo = await getSeoByPage(page);

    const fallbackTitle = defaults.title || formatPageTitle(page);
    const fallbackDescription =
        defaults.description ||
        "Bangladesh Barista Training Academy offers professional coffee education, barista training, and career-focused programs.";

    const title = seo?.metaTitle || fallbackTitle;
    const description = seo?.metaDescription || fallbackDescription;
    const keywords = seo?.keywords || defaults.keywords || "";
    const ogTitle = seo?.ogTitle || title;
    const ogDescription = seo?.ogDescription || description;
    const ogImage = seo?.ogImage || defaults.ogImage || `${SITE_URL}/og-image.jpg`;

    const keywordsArray = keywords
        ? keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
        : [];

    return {
        title,
        description,
        ...(keywordsArray.length > 0 && { keywords: keywordsArray }),
        openGraph: {
            type: "website",
            locale: "en_US",
            url: SITE_URL,
            siteName: SITE_NAME,
            title: `${ogTitle} | ${SITE_NAME}`,
            description: ogDescription,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: ogTitle,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${ogTitle} | ${SITE_NAME}`,
            description: ogDescription,
            images: [ogImage],
        },
    };
}
