import type { Metadata } from "next";
import Image from "next/image";
import { motion } from "motion/react";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { teamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bangladesh Barista Training Academy - our mission, history, and the expert team behind Bangladesh's premier coffee training institution.",
  openGraph: {
    title: "About Us | BBTA - Bangladesh Barista Training Academy",
    description: "Learn about Bangladesh's premier coffee training institution.",
  },
};

/**
 * About Page
 * Mission, history, team, and certifications
 */
export default function AboutPage() {
  const timeline = [
    {
      year: "2018",
      title: "BBTA Founded",
      description:
        "Started with a vision to bring world-class barista training to Bangladesh.",
    },
    {
      year: "2019",
      title: "ISO Certification",
      description:
        "Became the first ISO-certified barista training academy in Bangladesh.",
    },
    {
      year: "2020",
      title: "1000th Graduate",
      description:
        "Celebrated our 1000th graduate milestone despite global challenges.",
    },
    {
      year: "2022",
      title: "Second Campus",
      description:
        "Opened our Dhanmondi branch to serve more aspiring baristas.",
    },
    {
      year: "2024",
      title: "International Recognition",
      description:
        "Partnered with international coffee organizations for global certifications.",
    },
    {
      year: "2026",
      title: "2000+ Graduates",
      description:
        "Reached 2000+ successful graduates placed in cafes across Bangladesh and beyond.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Our Story"
        subtitle="Brewing Excellence Since 2018"
        description="From a small training room to Bangladesh's leading barista academy, discover the journey of BBTA."
        ctaText="View Courses"
        ctaHref="/bbta-courses"
        backgroundImage="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
                Our Mission
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Transforming Coffee Culture in Bangladesh
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At Bangladesh Barista Training Academy, we believe that every
                  cup of coffee tells a story. Our mission is to empower the next
                  generation of coffee professionals with world-class skills,
                  knowledge, and certifications.
                </p>
                <p>
                  Founded in 2018, BBTA has grown from a single training room to
                  Bangladesh&apos;s most respected barista academy, with state-of-the-art
                  facilities in Baridhara and Dhanmondi.
                </p>
                <p>
                  We combine International standards with local expertise to
                  create training programs that prepare our graduates for success
                  in cafes, hotels, and coffee businesses worldwide.
                </p>
              </div>
            </div>
            <div className="relative h-100 lg:h-125 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
                alt="BBTA Training Session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* History Timeline */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Our Journey
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              History & Milestones
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                      }`}
                    >
                      <div className="bg-card rounded-xl p-6">
                        <span className="text-primary font-bold text-lg">
                          {item.year}
                        </span>
                        <h3 className="font-serif text-xl font-bold mt-1 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Meet the Experts
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Our Leadership Team
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group bg-card rounded-2xl border border-border overflow-hidden card-hover"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="p-6 -mt-8 relative">
                  <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">
              Industry Recognition
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Certifications & Accreditations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our training programs are recognized by leading international
              coffee organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "ISO 9001:2015", desc: "Quality Management" },
              { name: "SCA Member", desc: "Specialty Coffee Association" },
              { name: "BSTI Certified", desc: "Bangladesh Standards" },
              { name: "NSDA Approved", desc: "National Skills Development" },
            ].map((cert) => (
              <div
                key={cert.name}
                className="bg-card rounded-2xl p-6 text-center hover:bg-card/80 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary font-bold">
                    {cert.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-semibold text-sm">{cert.name}</h4>
                <p className="text-muted-foreground text-xs mt-1">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Ready to Join Our Community?"
        description="Become part of Bangladesh's growing coffee professional network."
        ctaText="Start Your Journey"
        ctaHref="/bbta-courses"
      />
    </>
  );
}
