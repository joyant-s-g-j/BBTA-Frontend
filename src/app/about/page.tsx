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
  const [settings, teamMembers, stats] = await Promise.all([
    api.getSettings(),
    api.getTeamMembers(),
    api.getStats()
  ]);

  const missionText = settings?.aboutPage?.mission || "Bangladesh Barista Training Academy's mission is to empower the next generation of coffee professionals with world-class skills, knowledge, and certifications.";

  const timeline = [
    { year: "2018", title: "BBTA Founded", description: "Started with a vision to bring world-class barista training to Bangladesh." },
    { year: "2019", title: "ISO Certification", description: "Became the first ISO-certified barista training academy in Bangladesh." },
    { year: "2020", title: "1000th Graduate", description: "Celebrated our 1000th graduate milestone despite global challenges." },
    { year: "2024", title: "International Recognition", description: "Partnered with international coffee organizations for global certifications." },
  ];

  return (
    <>
      <HeroSection
        title="Our Story"
        subtitle="Brewing Excellence"
        description="From a small training room to Bangladesh's leading barista academy, discover the journey of BBTA."
        ctaText="View Courses"
        ctaHref="/bbta-courses"
        backgroundImage="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle="Our Mission"
                title="Empowering Coffee Professionals"
                align="left"
                titleSize="text-3xl md:text-4xl"
                className="mb-6"
              />
              <div className="space-y-4 text-muted-foreground whitespace-pre-line">
                <p>{missionText}</p>
              </div>
            </div>
            <div className="relative h-100 lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
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

      {stats && stats.length > 0 && <StatsSection stats={stats} />}

      {teamMembers && teamMembers.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="Meet the Experts"
              title="Our Professional Trainers"
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
