import type { JobListing } from "@/lib/data";
import type { z } from "zod";
import type { hirerSchema, jobSeekerSchema } from "./schemas";

export type SectionHeaders = Record<
  string,
  { subtitle: string; title: string; description?: string }
>;

export interface JobPlacementClientProps {
  sectionHeaders: SectionHeaders;
  jobListings: JobListing[];
  whatsappNumber: string;
}

export interface JobFormsSectionProps {
  sectionHeaders: SectionHeaders;
  onHirerSubmit: (data: HirerFormData) => Promise<void>;
  onSeekerSubmit: (data: JobSeekerFormData) => Promise<void>;
  hirerSubmitting: boolean;
  seekerSubmitting: boolean;
}

export interface JobListingsSectionProps {
  sectionHeaders: SectionHeaders;
  jobListings: JobListing[];
  onSelectJob: (job: JobListing) => void;
}

export interface JobDetailsDialogProps {
  job: JobListing | null;
  whatsappNumber: string;
  onClose: () => void;
}

export type HirerFormData = z.infer<typeof hirerSchema>;
export type JobSeekerFormData = z.infer<typeof jobSeekerSchema>;
