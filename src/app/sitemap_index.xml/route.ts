import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

function buildSitemapEntry(loc: string, lastmod: Date) {
  return `
  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastmod.toISOString()}</lastmod>
  </sitemap>`;
}

export async function GET() {
  const sitemaps = [
    { url: `${SITE_URL}/post-sitemap.xml`, lastmod: new Date() },
    { url: `${SITE_URL}/page-sitemap.xml`, lastmod: new Date() },
    { url: `${SITE_URL}/category-sitemap.xml`, lastmod: new Date() },
    { url: `${SITE_URL}/course-sitemap.xml`, lastmod: new Date() },
    { url: `${SITE_URL}/author-sitemap.xml`, lastmod: new Date() },
  ];

  const entries = sitemaps
    .map((s) => buildSitemapEntry(s.url, s.lastmod))
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
