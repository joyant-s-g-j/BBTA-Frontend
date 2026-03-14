import type { Metadata } from "next";
import { getSeoByPage } from "./api";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_DESCRIPTION } from "./constants";

interface SeoDefaults {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
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
    defaults: SeoDefaults = {},
    options?: { routePath?: string }
): Promise<Metadata> {
    const seo = await getSeoByPage(page);

    const title = seo?.metaTitle || defaults.title || "";
    const description = seo?.metaDescription || defaults.description || DEFAULT_DESCRIPTION;
    const keywords = seo?.keywords || defaults.keywords || "";
    const ogTitle = seo?.ogTitle || title;
    const ogDescription = seo?.ogDescription || description;
    const ogImage = seo?.ogImage || defaults.ogImage || DEFAULT_OG_IMAGE;

    const keywordsArray = keywords
        ? keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
        : [];

    const routePath = options?.routePath || `/${page === "home" ? "" : page}`;

    return {
        title,
        description,
        ...(keywordsArray.length > 0 && { keywords: keywordsArray }),
        alternates: {
            canonical: `${SITE_URL}${routePath}`,
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: `${SITE_URL}${routePath}`,
            siteName: SITE_NAME,
            title: `${ogTitle} | ${SITE_NAME}`,
            description: ogDescription,
            images: ogImage
                ? [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: ogTitle,
                    },
                ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: `${ogTitle} | ${SITE_NAME}`,
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
    };
}
