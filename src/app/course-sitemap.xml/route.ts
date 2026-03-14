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

type CourseEntry = {
  slug?: string;
  categoryId?: string | null;
  updatedAt?: string;
  createdAt?: string;
};

type CategoryEntry = {
  id?: string;
  slug?: string;
};

export async function GET() {
  const [courses, categories] = await Promise.all([
    api.getCourses(),
    api.getCourseCategories(),
  ]);

  const courseXml = (courses || [])
    .filter((course: CourseEntry) => Boolean(course.categoryId))
    .map((course: CourseEntry) => {
      const category = (categories || []).find(
        (item: CategoryEntry) =>
          item.id && course.categoryId && item.id === course.categoryId,
      );

      return category && category.slug && course.slug
        ? buildUrl(
            `${SITE_URL}/${category.slug}/${course.slug}`,
            new Date(course.updatedAt || course.createdAt || new Date()),
            "weekly",
            0.7,
          )
        : "";
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${courseXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
