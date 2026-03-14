import { Mail, Phone, User } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { JobSeekerFormData } from "./types";

interface JobSeekerPrimaryFieldsProps {
  form: UseFormReturn<JobSeekerFormData>;
}

export function JobSeekerPrimaryFields({ form }: JobSeekerPrimaryFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Full Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Your full name" className="bg-card/50 border-border" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" className="bg-card/50 border-border" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone
              </FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+880 1XXX-XXXXXX" className="bg-card/50 border-border" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
