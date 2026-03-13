import type { Metadata } from "next";
import { GalleryPageClient } from "@/components/sections/GalleryPageClient";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("gallery");
}

export default function GalleryPage() {
  return <GalleryPageClient />;
}
