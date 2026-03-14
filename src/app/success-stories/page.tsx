import type { Metadata } from "next";
import Image from "next/image";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { generatePageMetadata } from "@/lib/seo";
import * as api from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata("success_stories");
}

interface SuccessStory {
    id: string;
    name: string;
    role: string;
    story: string;
    image?: string;
    courseName?: string;
    currentPosition?: string;
    company?: string;
    graduationYear?: string;
    isActive: boolean;
    order: number;
}

export default async function SuccessStoriesPage() {
    const [stories, heroSettings, sh, ctaSettings] = await Promise.all([
        api.getSuccessStories(),
        api.getHeroByPage("success_stories"),
        api.getAllSectionHeaders(),
        api.getSettings("cta_success_stories"),
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

    const activeStories = (stories as SuccessStory[])
        .filter((s) => s.isActive)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <>
            <HeroSection {...hero} size="medium" showScrollIndicator={false} />

            <section className="section-padding">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        subtitle={sh["sh_success_stories"]?.subtitle}
                        title={sh["sh_success_stories"]?.title}
                        description={sh["sh_success_stories"]?.description}
                        titleSize="text-3xl md:text-4xl"
                    />

                    {activeStories.length === 0 ? (
                        <p className="text-center text-muted-foreground py-16">
                            No success stories published yet. Check back soon!
                        </p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {activeStories.map((story) => (
                                <article
                                    key={story.id}
                                    className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden card-hover flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden bg-muted">
                                        {story.image ? (
                                            <Image
                                                src={story.image}
                                                alt={story.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-4xl font-bold text-muted-foreground/20">
                                                    {story.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />

                                        {/* Graduation year badge */}
                                        {story.graduationYear && (
                                            <span className="absolute top-4 right-4 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                                                Class of {story.graduationYear}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1 -mt-6 relative z-10">
                                        <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                                            {story.name}
                                        </h3>

                                        {/* Position & Company */}
                                        {(story.currentPosition || story.company) && (
                                            <p className="text-primary text-sm font-medium mt-1">
                                                {story.currentPosition}
                                                {story.currentPosition && story.company && " · "}
                                                {story.company}
                                            </p>
                                        )}

                                        {/* Course */}
                                        {story.courseName && (
                                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-primary/70 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                                                </svg>
                                                {story.courseName}
                                            </p>
                                        )}

                                        {/* Story */}
                                        <p className="text-muted-foreground text-sm mt-4 line-clamp-4 flex-1 leading-relaxed">
                                            &ldquo;{story.story}&rdquo;
                                        </p>

                                        {/* Role tag */}
                                        {story.role && (
                                            <span className="inline-block mt-4 text-xs text-muted-foreground bg-muted/50 border border-border/40 px-3 py-1 rounded-full w-fit">
                                                {story.role}
                                            </span>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {(ctaSettings?.title && ctaSettings?.ctaText && ctaSettings?.ctaUrl) ? (
                <CTABanner
                    title={ctaSettings.title}
                    description={ctaSettings.description || ""}
                    ctaText={ctaSettings.ctaText}
                    ctaHref={ctaSettings.ctaUrl}
                />
            ) : null}
        </>
    );
}
