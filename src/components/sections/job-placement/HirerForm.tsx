import type { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ConsentText } from "./ConsentText";
import { HirerContactFields } from "./HirerContactFields";
import { HirerRoleFields } from "./HirerRoleFields";
import { SubmitButton } from "./SubmitButton";
import type { HirerFormData } from "./types";

interface HirerFormProps {
  form: UseFormReturn<HirerFormData>;
  submitting: boolean;
  onSubmit: (data: HirerFormData) => Promise<void>;
}

export function HirerForm({ form, submitting, onSubmit }: HirerFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <HirerContactFields form={form} />
        <HirerRoleFields form={form} />
        <SubmitButton loading={submitting} idleText="Submit Hiring Request" />
        <ConsentText />
      </form>
    </Form>
  );
}
