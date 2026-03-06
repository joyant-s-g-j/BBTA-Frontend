import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTABanner } from "@/components/sections/CTABanner";
import * as api from "@/lib/api";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await api.getBlogPost(slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: `${post.title} | BBTA Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.image ? [{ url: post.image }] : [],
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export async function generateStaticParams() {
    const posts = await api.getBlogPosts();
    return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const [post, allPosts] = await Promise.all([
        api.getBlogPost(slug),
        api.getBlogPosts(),
    ]);

    if (!post) notFound();

    // Related posts: same category, exclude current
    const relatedPosts = allPosts
        .filter((p: Record<string, string>) => p.slug !== slug && p.category === post.category)
        .slice(0, 3);

    return (
        <>
            {/* Article Header */}
            <article>
                {/* Hero / Featured Image */}
                {post.image && (
                    <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
                    </div>
                )}

                {/* Article Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Meta Section */}
                        <div className={post.image ? "-mt-32 relative z-10" : "pt-32"}>
                            <div className="mb-6">
                                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Blog
                                </Link>
                            </div>
                            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                                {post.category}
                            </Badge>
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                                <span className="flex items-center gap-1.5">
                                    <User className="h-4 w-4" />
                                    {post.author}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* Blog Content — rendered as HTML from the editor */}
                        <div
                            className="prose prose-lg prose-invert max-w-none
                                prose-headings:font-serif prose-headings:font-bold
                                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                                prose-p:leading-relaxed prose-p:text-muted-foreground
                                prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
                                prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto
                                prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-lg prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic
                                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-xl
                                prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:px-4 prose-th:py-2
                                prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2
                                prose-li:text-muted-foreground
                                prose-strong:text-foreground
                                prose-hr:border-border
                                mb-16 pt-8"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="section-padding bg-muted/30 border-t border-border">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-serif text-2xl font-bold mb-8 text-center">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {relatedPosts.map((rp: Record<string, string>) => (
                                <Link
                                    key={rp.slug}
                                    href={`/blog/${rp.slug}`}
                                    className="group bg-card rounded-2xl border border-border overflow-hidden card-hover"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={rp.image}
                                            alt={rp.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <Badge variant="secondary" className="mb-2 text-xs">{rp.category}</Badge>
                                        <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {rp.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2">
                                            {rp.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                                            Read More <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
