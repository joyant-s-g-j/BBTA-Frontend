import { Building2, GraduationCap } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormCard } from "./FormCard";
import { HirerForm } from "./HirerForm";
import { JobSeekerForm } from "./JobSeekerForm";
import { hirerDefaults, hirerSchema, seekerDefaults, jobSeekerSchema } from "./schemas";
import type {
  HirerFormData,
  JobFormsSectionProps,
  JobSeekerFormData,
} from "./types";

export function JobFormsSection({
  sectionHeaders,
  onHirerSubmit,
  onSeekerSubmit,
  hirerSubmitting,
  seekerSubmitting,
}: JobFormsSectionProps) {
  const hirerForm = useForm<HirerFormData>({
    resolver: zodResolver(hirerSchema),
    defaultValues: hirerDefaults,
  });

  const seekerForm = useForm<JobSeekerFormData>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: seekerDefaults,
  });

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle={sectionHeaders["sh_job_forms"]?.subtitle || "Get Connected"}
          title={sectionHeaders["sh_job_forms"]?.title || "Hire or Get Hired"}
          description={sectionHeaders["sh_job_forms"]?.description}
          titleSize="text-3xl md:text-4xl"
        />

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="job_seeker" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 bg-card border border-border rounded-xl mb-8">
              <TabsTrigger
                value="job_seeker"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold text-sm transition-all"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                I&apos;m a Job Seeker
              </TabsTrigger>
              <TabsTrigger
                value="hirer"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold text-sm transition-all"
              >
                <Building2 className="h-4 w-4 mr-2" />
                I&apos;m Hiring
              </TabsTrigger>
            </TabsList>

            <TabsContent value="job_seeker">
              <FormCard
                title="Job Seeker Registration"
                description="Register your profile and we'll match you with the best opportunities in the coffee industry."
              >
                <JobSeekerForm
                  form={seekerForm}
                  submitting={seekerSubmitting}
                  onSubmit={onSeekerSubmit}
                />
              </FormCard>
            </TabsContent>

            <TabsContent value="hirer">
              <FormCard
                title="Hire Trained Baristas"
                description="Tell us about your staffing needs and we'll connect you with trained professionals from our academy."
              >
                <HirerForm
                  form={hirerForm}
                  submitting={hirerSubmitting}
                  onSubmit={onHirerSubmit}
                />
              </FormCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
