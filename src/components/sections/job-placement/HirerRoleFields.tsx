import { Briefcase, FileText, MessageSquare } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmploymentTypeField } from "./EmploymentTypeField";
import { FieldItem } from "./FieldItem";
import type { HirerFormData } from "./types";

interface HirerRoleFieldsProps {
  form: UseFormReturn<HirerFormData>;
}

export function HirerRoleFields({ form }: HirerRoleFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FieldItem icon={Briefcase} label="Position to Fill">
              <Input
                placeholder="e.g. Head Barista, Cafe Manager"
                className="bg-card/50 border-border"
                {...field}
              />
            </FieldItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTypeNeeded"
          render={({ field }) => (
            <EmploymentTypeField value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="requirementsDesc"
        render={({ field }) => (
          <FieldItem icon={FileText} label="Requirements & Job Description">
            <Textarea
              placeholder="Describe the role, qualifications, salary range, and any other requirements..."
              className="bg-card/50 border-border min-h-30 resize-none"
              {...field}
            />
          </FieldItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FieldItem icon={MessageSquare} label="Additional Message (Optional)">
            <Textarea
              placeholder="Any additional information..."
              className="bg-card/50 border-border min-h-20 resize-none"
              {...field}
            />
          </FieldItem>
        )}
      />
    </>
  );
}
