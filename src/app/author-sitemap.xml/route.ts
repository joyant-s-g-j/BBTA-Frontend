import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

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
  const authorXml = buildUrl(`${SITE_URL}/author/bbta`, new Date(), "monthly", 0.5);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${authorXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
