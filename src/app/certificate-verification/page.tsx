import type { Metadata } from "next";
import * as api from "@/lib/api";
import CertificateVerificationClient from "@/components/sections/CertificateVerificationClient";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("certificate");
}

export default async function CertificateVerificationPage() {
  const [heroSettings, sh] = await Promise.all([
    api.getHeroByPage("certificate"),
    api.getSectionHeader("sh_certificate_verify", {
      subtitle: "Verify Credentials",
      title: "Certificate Verification",
      description:
        "Instantly verify the authenticity of any BBTA certificate using the unique certificate ID.",
    }),
  ]);

  const hero = {
    title: heroSettings?.title || "",
    subtitle: heroSettings?.subtitle || "",
    description: heroSettings?.description || "",
    backgroundImage: heroSettings?.backgroundImage || "",
    ctaText: heroSettings?.ctaText || "",
    ctaHref: heroSettings?.ctaUrl || "",
    secondaryCtaText: heroSettings?.secondaryCtaText || "",
    secondaryCtaHref: heroSettings?.secondaryCtaUrl || ""
  };

  return <CertificateVerificationClient hero={hero} sectionHeader={sh} />;
}
