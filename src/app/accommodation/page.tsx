import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AccommodationClient } from "@/components/sections/AccommodationClient";
import { generatePageMetadata } from "@/lib/seo";
import * as api from "@/lib/api";
import type { Accommodation } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("accommodation");
}

export default async function AccommodationPage() {
  const [heroSettings, sectionHeader, accommodations] = await Promise.all([
    api.getHeroByPage("accommodation"),
    api.getSectionHeader("sh_accommodation", {
      subtitle: "",
      title: "",
      description: "",
    }),
    api.getAccommodations(),
  ]);

  const hero = {
    title: heroSettings?.title || "",
    subtitle: heroSettings?.subtitle || "",
    description: heroSettings?.description || "",
    backgroundImage: heroSettings?.backgroundImage || "",
    ctaText: heroSettings?.ctaText || "",
    ctaHref: heroSettings?.ctaUrl || "",
    secondaryCtaText: heroSettings?.secondaryCtaText || "",
    secondaryCtaHref: heroSettings?.secondaryCtaUrl || "",
  };

  const sortedItems = (accommodations as Accommodation[])
    .filter((item) => item?.title)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      <HeroSection {...hero} size="medium" showScrollIndicator={false} />
      <AccommodationClient items={sortedItems} sectionHeader={sectionHeader} />
    </>
  );
}
