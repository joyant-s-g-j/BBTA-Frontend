import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as api from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await api.getSeoByPage("privacy_policy");

  return {
    title: seo?.metaTitle || "",
    description: seo?.metaDescription || "",
    ...(seo?.keywords
      ? {
          keywords: seo.keywords
            .split(",")
            .map((item: string) => item.trim())
            .filter(Boolean),
        }
      : {}),
    alternates: {
      canonical: "/privacy-policy",
    },
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || "",
      description: seo?.ogDescription || seo?.metaDescription || "",
      images: seo?.ogImage ? [seo.ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || seo?.metaTitle || "",
      description: seo?.ogDescription || seo?.metaDescription || "",
      images: seo?.ogImage ? [seo.ogImage] : [],
    },
  };
}

export default async function PrivacyPolicyPage() {
  const [heroSettings, legalPrivacy] = await Promise.all([
    api.getHeroByPage("privacy_policy"),
    api.getSettings("legal_privacy"),
  ]);

  const hero = {
    title: heroSettings?.title || legalPrivacy?.heroTitle || "",
    subtitle: heroSettings?.subtitle || legalPrivacy?.heroSubtitle || "",
    description: heroSettings?.description || legalPrivacy?.heroDescription || "",
    backgroundImage: heroSettings?.backgroundImage || "",
    ctaText: heroSettings?.ctaText || "",
    ctaHref: heroSettings?.ctaUrl || "",
    secondaryCtaText: heroSettings?.secondaryCtaText || "",
    secondaryCtaHref: heroSettings?.secondaryCtaUrl || "",
  };

  const content = legalPrivacy?.content || "";
  const lastUpdated = legalPrivacy?.lastUpdated || "";

  return (
    <>
      <HeroSection {...hero} size="medium" showScrollIndicator={false} />

      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <SectionHeader
                subtitle={legalPrivacy?.sectionSubtitle || ""}
                title={legalPrivacy?.sectionTitle || ""}
                description={legalPrivacy?.sectionDescription || ""}
                align="left"
                className="mb-0"
              />
              <Badge className="bg-primary/15 text-primary border border-primary/30 px-4 py-2 text-xs uppercase tracking-wide">
                Last Updated: {lastUpdated}
              </Badge>
            </div>

            <Card className="bg-card/60 border-border/50 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-5 text-muted-foreground leading-relaxed whitespace-pre-line">
                  {content}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
