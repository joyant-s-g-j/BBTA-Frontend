import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight, Clock, Tag, Share2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTABanner } from "@/components/sections/CTABanner";
import * as api from "@/lib/api";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";

export async function generateBlogPostMetadata(slug: string): Promise<Metadata | null> {
  const post = await api.getBlogPost(slug);
  if (!post) return null;

  const url = `${SITE_URL}/${slug}`;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const ogTitle = post.ogTitle || title;
  const ogDescription = post.ogDescription || description;
  const ogImage = post.ogImage || post.image || DEFAULT_OG_IMAGE;
  const keywords = post.keywords
    ? post.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
    : [post.category, "BBTA", "barista", "coffee", "blog", post.author].filter(Boolean);

  return {
    title,
    description,
    keywords,
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: SITE_NAME,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author],
      section: post.category,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function BlogPostContent({ slug }: { slug: string }) {
  const [post, allPosts] = await Promise.all([
    api.getBlogPost(slug),
    api.getBlogPosts(),
  ]);

  if (!post) notFound();

  const readTime = estimateReadTime(post.content || "");
  const postUrl = `${SITE_URL}/${slug}`;
  const plainText = (post.content || "").replace(/<[^>]*>/g, "");
  const wordCount = plainText.trim().split(/\s+/).length;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image || undefined,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    wordCount,
    articleSection: post.category,
    inLanguage: "en-US",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  let relatedPosts = allPosts
    .filter((p: Record<string, string>) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);
  if (relatedPosts.length === 0) {
    relatedPosts = allPosts
      .filter((p: Record<string, string>) => p.slug !== slug)
      .slice(0, 3);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {post.image && (
        <div className="relative w-full h-[45vh] md:h-[55vh] lg:h-[65vh] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            unoptimized
            className="object-cover scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-background/10" />
          <div className="absolute inset-0 bg-linear-to-r from-background/20 to-transparent" />
        </div>
      )}

      <article>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className={post.image ? "-mt-40 relative z-10" : "pt-24"}>
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground/70 truncate max-w-50">{post.title}</span>
              </nav>

              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
                <Tag className="h-3 w-3 mr-1.5" />
                {post.category}
              </Badge>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold mb-4 leading-[1.15] tracking-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 pb-6 mb-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {post.author?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{post.author}</p>
                    <p className="text-xs text-muted-foreground">Author</p>
                  </div>
                </div>

                <div className="h-8 w-px bg-border hidden sm:block" />

                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {readTime} min read
                </span>
              </div>
            </div>

            <div
              className="
                prose prose-lg prose-invert max-w-none
                prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border/50
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
                prose-p:leading-[1.8] prose-p:text-muted-foreground prose-p:mb-6
                prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/40 hover:prose-a:decoration-primary
                prose-img:rounded-2xl prose-img:shadow-xl prose-img:mx-auto prose-img:my-10 prose-img:border prose-img:border-border/30
                prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-muted/40 prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-5 prose-blockquote:not-italic prose-blockquote:my-8 prose-blockquote:shadow-sm
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-muted/60 prose-pre:border prose-pre:border-border prose-pre:rounded-2xl prose-pre:shadow-inner prose-pre:my-8
                prose-table:border-collapse prose-table:my-8 prose-table:rounded-xl prose-table:overflow-hidden
                prose-th:border prose-th:border-border prose-th:bg-muted/60 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3
                prose-li:text-muted-foreground prose-li:leading-[1.8]
                prose-strong:text-foreground prose-strong:font-semibold
                prose-hr:border-border prose-hr:my-10
                prose-ul:my-6 prose-ol:my-6
                py-6
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="flex items-center justify-between py-8 mt-4 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to all articles
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share this article</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-20 lg:py-28 bg-muted/20 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">More to Read</Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Related Articles</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((rp: Record<string, string>) => (
                <Link
                  key={rp.slug}
                  href={`/${rp.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3 text-xs">{rp.category}</Badge>
                    <h3 className="font-serif text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {rp.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
                      {rp.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title="Want to Learn More?"
        description="Turn these tips into skills with our hands-on training courses."
        ctaText="View Courses"
        ctaHref="/bbta-courses"
        variant="dark"
      />
    </>
  );
}