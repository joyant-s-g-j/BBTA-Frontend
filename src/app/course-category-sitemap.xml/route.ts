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

type CategoryEntry = {
  slug?: string;
  updatedAt?: string;
  createdAt?: string;
};

export async function GET() {
  const categories = await api.getCourseCategories();

  const categoryXml = (categories || [])
    .map((category: CategoryEntry) =>
      category.slug
        ? buildUrl(
            `${SITE_URL}/${category.slug}`,
            new Date(category.updatedAt || category.createdAt || new Date()),
            "weekly",
            0.8,
          )
        : "",
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categoryXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
