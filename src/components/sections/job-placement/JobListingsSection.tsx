import { SectionHeader } from "@/components/ui/SectionHeader";
import { JobListingCard } from "./JobListingCard";
import type { JobListingsSectionProps } from "./types";

export function JobListingsSection({
  sectionHeaders,
  jobListings,
  onSelectJob,
}: JobListingsSectionProps) {
  if (!jobListings.length) return null;

  return (
    <section className="section-padding bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle={sectionHeaders["sh_job_listings"]?.subtitle || "Latest Opportunities"}
          title={sectionHeaders["sh_job_listings"]?.title || "Job Openings"}
          description={sectionHeaders["sh_job_listings"]?.description}
          titleSize="text-3xl md:text-4xl"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobListings.map((job) => (
            <JobListingCard key={job.id} job={job} onClick={() => onSelectJob(job)} />
          ))}
        </div>
      </div>
    </section>
  );
}
