import type { Metadata } from "next";
import * as api from "@/lib/api";
import CertificateVerificationClient from "@/components/sections/CertificateVerificationClient";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description:
    "Verify the authenticity of any BBTA certificate using the unique certificate ID.",
  openGraph: {
    title: "Certificate Verification | BBTA",
    description:
      "Instantly verify the authenticity of any BBTA certificate.",
  },
};

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
  };

  return <CertificateVerificationClient hero={hero} sectionHeader={sh} />;
}
