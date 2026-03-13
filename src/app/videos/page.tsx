import type { Metadata } from "next";
import { VideosPageClient } from "@/components/sections/VideosPageClient";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("videos");
}

export default function VideosPage() {
  return <VideosPageClient />;
}
