import { Form } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { ConsentText } from "./ConsentText";
import { JobSeekerCareerFields } from "./JobSeekerCareerFields";
import { JobSeekerPrimaryFields } from "./JobSeekerPrimaryFields";
import { SubmitButton } from "./SubmitButton";
import type { JobSeekerFormData } from "./types";

interface JobSeekerFormProps {
  form: UseFormReturn<JobSeekerFormData>;
  submitting: boolean;
  onSubmit: (data: JobSeekerFormData) => Promise<void>;
}

export function JobSeekerForm({ form, submitting, onSubmit }: JobSeekerFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <JobSeekerPrimaryFields form={form} />
        <JobSeekerCareerFields form={form} />
        <SubmitButton loading={submitting} idleText="Submit Profile" />
        <ConsentText />
      </form>
    </Form>
  );
}
