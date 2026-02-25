import type { Metadata } from "next";
import Image from "next/image";
import { motion } from "motion/react";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { teamMembers } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bangladesh Barista Training Academy - our mission, history, and the expert team behind Bangladesh's premier coffee training institution.",
  openGraph: {
    title: "About Us | BBTA - Bangladesh Barista Training Academy",
    description: "Learn about Bangladesh's premier coffee training institution.",
  },
};

import * as api from "@/lib/api";

export default async function AboutPage() {
  const [aboutSettings, timelineSettings, teamMembers, stats, heroSettings, sh] = await Promise.all([
    api.getSettings('about'),
    api.getSettings('timeline'),
    api.getTeamMembers(),
    api.getStats(),
    api.getHeroByPage('about'),
    api.getAllSectionHeaders()
  ]);

  const missionText = aboutSettings?.mission || "Bangladesh Barista Training Academy's mission is to empower the next generation of coffee professionals with world-class skills, knowledge, and certifications.";
  const aboutImage = aboutSettings?.aboutImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800";

  const hero = {
    title: heroSettings?.title || "Our Story",
    subtitle: heroSettings?.subtitle || "Brewing Excellence",
    description: heroSettings?.description || "From a small training room to Bangladesh's leading barista academy, discover the journey of BBTA.",
    backgroundImage: heroSettings?.backgroundImage || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920"
  };

  const timeline = timelineSettings?.items || [
    { year: "2018", title: "BBTA Founded", description: "Started with a vision to bring world-class barista training to Bangladesh." },
    { year: "2019", title: "ISO Certification", description: "Became the first ISO-certified barista training academy in Bangladesh." },
    { year: "2020", title: "1000th Graduate", description: "Celebrated our 1000th graduate milestone despite global challenges." },
    { year: "2024", title: "International Recognition", description: "Partnered with international coffee organizations for global certifications." },
  ];

  return (
    <>
      <HeroSection
        {...hero}
        ctaText="View Courses"
        ctaHref="/bbta-courses"
        size="medium"
        showScrollIndicator={false}
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle={sh['sh_about_mission']?.subtitle}
                title={sh['sh_about_mission']?.title}
                description={sh['sh_about_mission']?.description}
                align="left"
                titleSize="text-3xl md:text-4xl"
                className="mb-6"
              />
              <div
                className="space-y-4 text-muted-foreground whitespace-pre-line prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: missionText }}
              />
            </div>
            <div className="relative h-100 lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={aboutImage}
                alt="BBTA Training Session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {timeline && timeline.length > 0 && (
        <section className="section-padding bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle={sh['sh_about_timeline']?.subtitle}
              title={sh['sh_about_timeline']?.title}
              description={sh['sh_about_timeline']?.description}
              titleSize="text-3xl md:text-4xl"
            />
            <div className="relative max-w-4xl mx-auto mt-12 py-8">
              {/* Central line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />

              <div className="space-y-12">
                {timeline.map((item: any, index: number) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={index} className={`relative flex flex-col md:flex-row w-full items-center group ${isEven ? 'md:flex-row-reverse' : ''}`}>

                      {/* Empty spacing for desktop layout */}
                      <div className="hidden md:block w-1/2" />

                      {/* Dot Indicator */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background transform -translate-x-1/2 z-10 group-hover:scale-150 transition-transform duration-300" />

                      {/* Item Content */}
                      <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                        <div className="bg-card p-6 rounded-2xl border border-border/60 hover:border-primary/50 shadow-sm transition-colors">
                          <span className="text-primary font-bold text-xl mb-2 block">{item.year}</span>
                          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {stats && stats.length > 0 && <StatsSection stats={stats} />}

      {teamMembers && teamMembers.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle={sh['sh_about_team']?.subtitle}
              title={sh['sh_about_team']?.title}
              description={sh['sh_about_team']?.description}
              titleSize="text-3xl md:text-4xl"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member: any) => (
                <div key={member.name} className="group bg-card rounded-2xl border border-border overflow-hidden card-hover">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  <div className="p-6 -mt-8 relative">
                    <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm line-clamp-3">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title="Ready to Start Your Career?"
        description="Join Bangladesh's most successful barista training program."
        ctaText="Enroll Now"
        ctaHref="/bbta-courses"
      />
    </>
  );
}
