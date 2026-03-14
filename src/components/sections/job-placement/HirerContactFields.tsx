import { Building2, Mail, Phone, User } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { HirerFormData } from "./types";

interface HirerContactFieldsProps {
  form: UseFormReturn<HirerFormData>;
}

export function HirerContactFields({ form }: HirerContactFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField form={form} name="name" icon={User} label="Contact Person" placeholder="Your name" />
        <InputField form={form} name="companyName" icon={Building2} label="Company / Cafe Name" placeholder="Your company name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField form={form} name="email" icon={Mail} label="Email" type="email" placeholder="company@email.com" />
        <InputField form={form} name="phone" icon={Phone} label="Phone" type="tel" placeholder="+880 1XXX-XXXXXX" />
      </div>
    </>
  );
}

function InputField({
  form,
  name,
  icon: Icon,
  label,
  placeholder,
  type = "text",
}: {
  form: UseFormReturn<HirerFormData>;
  name: "name" | "companyName" | "email" | "phone";
  icon: typeof User;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            {label}
          </FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} className="bg-card/50 border-border" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
