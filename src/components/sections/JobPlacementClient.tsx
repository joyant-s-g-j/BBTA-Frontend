"use client";

import * as React from "react";
import { AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  submitHirerApplication,
  submitSeekerApplication,
} from "./job-placement/api";
import { JobDetailsDialog } from "./job-placement/JobDetailsDialog";
import { JobFormsSection } from "./job-placement/JobFormsSection";
import { JobListingsSection } from "./job-placement/JobListingsSection";
import type {
  HirerFormData,
  JobPlacementClientProps,
  JobSeekerFormData,
} from "./job-placement/types";

export function JobPlacementClient({
  sectionHeaders,
  jobListings,
  whatsappNumber,
}: JobPlacementClientProps) {
  const [selectedJob, setSelectedJob] =
    React.useState<(typeof jobListings)[number] | null>(null);
  const [hirerSubmitting, setHirerSubmitting] = React.useState(false);
  const [seekerSubmitting, setSeekerSubmitting] = React.useState(false);

  const onHirerSubmit = async (data: HirerFormData) => {
    setHirerSubmitting(true);
    try {
      await submitHirerApplication(data);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setHirerSubmitting(false);
    }
  };

  const onSeekerSubmit = async (data: JobSeekerFormData) => {
    setSeekerSubmitting(true);
    try {
      await submitSeekerApplication(data);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSeekerSubmitting(false);
    }
  };

  return (
    <>
      <JobFormsSection
        sectionHeaders={sectionHeaders}
        onHirerSubmit={onHirerSubmit}
        onSeekerSubmit={onSeekerSubmit}
        hirerSubmitting={hirerSubmitting}
        seekerSubmitting={seekerSubmitting}
      />

      <JobListingsSection
        sectionHeaders={sectionHeaders}
        jobListings={jobListings}
        onSelectJob={setSelectedJob}
      />

      <AnimatePresence>
        <JobDetailsDialog
          job={selectedJob}
          whatsappNumber={whatsappNumber}
          onClose={() => setSelectedJob(null)}
        />
      </AnimatePresence>
    </>
  );
}
