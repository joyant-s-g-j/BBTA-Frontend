import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Dynamic robots.txt generation.
 * Allows all crawlers to index the site and points to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
            },
            {
                userAgent: "Bingbot",
                allow: "/",
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
