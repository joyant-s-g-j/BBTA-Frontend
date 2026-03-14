import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import * as api from "@/lib/api";

/**
 * Dynamic sitemap generation for SEO.
 * Automatically includes all static pages, blog posts, course categories,
 * and individual course detail pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [courses, categories, blogPosts, successStories] = await Promise.all([
        api.getCourses(),
        api.getCourseCategories(),
        api.getBlogPosts(),
        api.getSuccessStories(),
    ]);

    // Static pages with priority and change frequency
    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
        { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/bbta-courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
        { url: `${SITE_URL}/videos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
        { url: `${SITE_URL}/catering`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/consulting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/service-and-maintenance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/certificate-verification`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/why-bbta`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/job-placement`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${SITE_URL}/review`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/success-stories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
        { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
        { url: `${SITE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ];

    // Category listing pages
    const categoryPages: MetadataRoute.Sitemap = (categories || []).map(
        (cat: { slug: string; updatedAt?: string; createdAt?: string }) => ({
            url: `${SITE_URL}/${cat.slug}`,
            lastModified: new Date(cat.updatedAt || cat.createdAt || new Date()),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })
    );

    // Individual course detail pages
    const coursePages: MetadataRoute.Sitemap = (courses || [])
        .filter((course: { categoryId?: string }) => course.categoryId)
        .map((course: { slug: string; categoryId: string; updatedAt?: string; createdAt?: string }) => {
            const cat = (categories || []).find(
                (c: { id: string }) => c.id === course.categoryId
            );
            return cat
                ? {
                    url: `${SITE_URL}/${cat.slug}/${course.slug}`,
                    lastModified: new Date(course.updatedAt || course.createdAt || new Date()),
                    changeFrequency: "weekly" as const,
                    priority: 0.7,
                }
                : null;
        })
        .filter(Boolean) as MetadataRoute.Sitemap;

    // Blog post pages
    const blogPages: MetadataRoute.Sitemap = (blogPosts || []).map(
        (post: { slug: string; updatedAt?: string; date?: string; createdAt?: string }) => ({
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt || post.date || post.createdAt || new Date()),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })
    );

    // Success story pages (if they have individual pages)
    const storyPages: MetadataRoute.Sitemap = (successStories || []).map(
        (story: { slug?: string; id?: string; updatedAt?: string; createdAt?: string }) => ({
            url: `${SITE_URL}/success-stories`,
            lastModified: new Date(story.updatedAt || story.createdAt || new Date()),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })
    ).slice(0, 1); // Only one entry since it's a listing page

    return [...staticPages, ...categoryPages, ...coursePages, ...blogPages, ...storyPages];
}
