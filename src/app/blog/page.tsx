import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Coffee insights, barista tips, and industry news from BBTA experts. Learn about latte art, espresso techniques, and cafe business.",
  openGraph: {
    title: "Blog | BBTA",
    description: "Coffee insights and barista tips from BBTA experts.",
  },
};

/**
 * Blog Page
 * Post grid with category sidebar and featured post
 */
export default function BlogPage() {
  const categories = [...new Set(blogPosts.map((post) => post.category))];
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Insights & Tips"
        subtitle="The BBTA Blog"
        description="Expert advice, industry insights, and coffee knowledge from our team of professionals."
        ctaText="Read Articles"
        ctaHref="#posts"
        backgroundImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Blog Content */}
      <section id="posts" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Post */}
              {featuredPost ? (
                <div className="mb-12">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group block bg-card rounded-2xl border border-border overflow-hidden card-hover"
                  >
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 bg-primary/10 text-primary border-primary/20">
                          {featuredPost.category}
                        </Badge>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            {featuredPost.author}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {new Date(featuredPost.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border mb-12">
                  <p className="text-muted-foreground">No blog posts found at the moment.</p>
                </div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`#`}
                    className="group bg-card rounded-2xl border border-border overflow-hidden card-hover"
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <Badge
                        variant="secondary"
                        className="mb-3 text-xs"
                      >
                        {post.category}
                      </Badge>
                      <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-serif text-lg font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="w-full text-left px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-primary/10 rounded-2xl border border-primary/20 p-6">
                  <h3 className="font-serif text-lg font-bold mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get the latest coffee tips delivered to your inbox.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Subscribe
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
