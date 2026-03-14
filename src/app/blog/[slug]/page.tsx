import { redirect } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  redirect(`/${slug}`);
}
