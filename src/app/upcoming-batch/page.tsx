import * as React from "react";
import { UpcomingBatchesSection } from "@/components/sections/UpcomingBatchesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { HomeFAQSection } from "@/components/sections/HomeFAQSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import * as api from "@/lib/api";
import { AdvantagesGrid } from "@/components/sections/AdvantagesGrid";

/**
 * Upcoming Batch Page
 * Detailed view of all upcoming course batches
 */
export default async function UpcomingBatchPage() {
    const [heroSettings, sh, faqs, advantagesData] = await Promise.all([
        api.getHeroByPage('upcoming'),
        api.getAllSectionHeaders(),
        api.getFaqs(),
        api.getSettings('upcoming_advantages')
    ]);

    const advantages = advantagesData?.items || [];

    const hero = {
        title: heroSettings?.title || "",
        subtitle: heroSettings?.subtitle || "",
        description: heroSettings?.description || "",
        backgroundImage: heroSettings?.backgroundImage || ""
    };

    return (
        <>
            <HeroSection
                {...hero}
                ctaText="View Schedule"
                ctaHref="#schedule"
                size="small"
                showScrollIndicator={false}
            />

            <div id="schedule">
                <UpcomingBatchesSection sectionHeader={sh['sh_home_batches']} />
            </div>

            {/* Benefits of joining a batch */}
            <section className="section-padding bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        subtitle={sh['sh_upcoming_why']?.subtitle}
                        title={sh['sh_upcoming_why']?.title}
                        description={sh['sh_upcoming_why']?.description}
                        titleSize="text-3xl md:text-4xl"
                    />

                    <AdvantagesGrid initialAdvantages={advantages.length > 0 ? advantages : undefined} />
                </div>
            </section>

            <HomeFAQSection initialFaqs={faqs} sectionHeader={sh['sh_home_faq']} />

            <CTABanner
                title="Can't Find a Slot?"
                description="If our current schedule doesn't work for you, contact us for customized training schedules or one-on-one sessions."
                ctaText="Contact Support"
                ctaHref="/contact"
            />
        </>
    );
}
