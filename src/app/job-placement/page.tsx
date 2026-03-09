import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { generatePageMetadata } from "@/lib/seo";
import * as api from "@/lib/api";
import { JobPlacementClient } from "@/app/job-placement/JobPlacementClient";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("job_placement", {
    title: "Job Placement",
    description:
      "Find job opportunities or hire trained baristas through BBTA's job placement program. Connect with top coffee industry employers.",
  });
}

export default async function JobPlacementPage() {
  const [heroSettings, sh, jobListings, siteSettings] = await Promise.all([
    api.getHeroByPage("job_placement"),
    api.getAllSectionHeaders(),
    api.getJobListings(),
    api.getSettings("site"),
  ]);

  const hero = {
    title: heroSettings?.title || "",
    subtitle: heroSettings?.subtitle || "",
    description: heroSettings?.description || "",
    backgroundImage: heroSettings?.backgroundImage || "",
  };

  // Filter only active listings
  const activeListings = (jobListings || []).filter(
    (j: { isActive: boolean }) => j.isActive !== false
  );

  return (
    <>
      {/* Hero Section */}
      <HeroSection {...hero} size="medium" showScrollIndicator={false} />

      {/* Forms + Job Listings (Client Component) */}
      <JobPlacementClient
        sectionHeaders={sh}
        jobListings={activeListings}
        whatsappNumber={siteSettings?.whatsapp || siteSettings?.phone || ""}
      />

      {/* CTA Banner */}
      <CTABanner
        title="Invest in Your Coffee Career"
        description="Join BBTA's training programs and unlock job placement opportunities worldwide."
        ctaText="View Courses"
        ctaHref="/bbta-courses"
      />
    </>
  );
}
