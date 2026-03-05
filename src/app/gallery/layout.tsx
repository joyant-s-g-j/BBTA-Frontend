import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("gallery", {
    title: "Gallery",
    description: "Browse photos from BBTA training sessions, events, cafe setups, and student activities. See our world-class facilities in action.",
  });
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
