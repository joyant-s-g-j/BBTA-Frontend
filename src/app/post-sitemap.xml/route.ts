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

type BlogEntry = {
  slug?: string;
  updatedAt?: string;
  date?: string;
  createdAt?: string;
};

export async function GET() {
  const blogPosts = await api.getBlogPosts();

  const blogIndexXml = buildUrl(`${SITE_URL}/blog`, new Date(), "weekly", 0.8);

  const blogXml = (blogPosts || [])
    .map((post: BlogEntry) =>
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
  ${blogIndexXml}
  ${blogXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
