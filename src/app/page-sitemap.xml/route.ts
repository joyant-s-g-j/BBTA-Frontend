import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";
import * as api from "@/lib/api";

function toXmlDate(date: Date) {
  return date.toISOString();
}

function buildUrl(
  loc: string,
  lastmod: Date,
  changefreq: string,
  priority: number,
) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${toXmlDate(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const [courses, categories, blogPosts] = await Promise.all([
    api.getCourses(),
    api.getCourseCategories(),
    api.getBlogPosts(),
  ]);

  const staticEntries = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/accommodation`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/bbta-courses`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${SITE_URL}/catering`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/certificate-verification`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/consulting`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/job-placement`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/review`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/service-and-maintenance`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/success-stories`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/videos`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/why-bbta`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const staticXml = staticEntries
    .map((p) => buildUrl(p.url, new Date(), p.changeFrequency, p.priority))
    .join("");

  const categoryXml = (categories || [])
    .map((cat: { slug?: string; updatedAt?: string; createdAt?: string }) =>
      cat.slug
        ? buildUrl(
            `${SITE_URL}/${cat.slug}`,
            new Date(cat.updatedAt || cat.createdAt || new Date()),
            "weekly",
            0.8,
          )
        : "",
    )
    .join("");

  const courseXml = (courses || [])
    .filter((course: { categoryId?: string | null }) => Boolean(course.categoryId))
    .map(
      (course: {
        slug?: string;
        categoryId?: string | null;
        updatedAt?: string;
        createdAt?: string;
      }) => {
        const cat = (categories || []).find(
          (category: { id?: string }) =>
            category.id && course.categoryId && category.id === course.categoryId,
        );
        return cat && cat.slug && course.slug
          ? buildUrl(
              `${SITE_URL}/${cat.slug}/${course.slug}`,
              new Date(course.updatedAt || course.createdAt || new Date()),
              "weekly",
              0.7,
            )
          : "";
      },
    )
    .join("");

  const blogXml = (blogPosts || [])
    .map((post: { slug?: string; updatedAt?: string; date?: string; createdAt?: string }) =>
      post.slug
        ? buildUrl(
            `${SITE_URL}/${post.slug}`,
            new Date(post.updatedAt || post.date || post.createdAt || new Date()),
            "monthly",
            0.6,
          )
        : "",
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticXml}
  ${categoryXml}
  ${courseXml}
  ${blogXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
