import { Award, Briefcase, ExternalLink, FileText, MessageSquare } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { JobSeekerFormData } from "./types";

interface JobSeekerCareerFieldsProps {
  form: UseFormReturn<JobSeekerFormData>;
}

export function JobSeekerCareerFields({ form }: JobSeekerCareerFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="experience" render={({ field }) => <ExperienceField value={field.value} onChange={field.onChange} />} />
        <FormField
          control={form.control}
          name="preferredPosition"
          render={({ field }) => (
            <FormItem><FormLabel className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />Preferred Position</FormLabel><FormControl><Input placeholder="e.g. Barista, Cafe Manager" className="bg-card/50 border-border" {...field} /></FormControl><FormMessage /></FormItem>
          )}
        />
      </div>

      <TextField form={form} name="skills" icon={FileText} label="Key Skills" placeholder="e.g. Latte Art, Espresso, Brewing, Customer Service" />
      <TextField form={form} name="resumeUrl" icon={ExternalLink} label="Resume / Portfolio Link (Optional)" placeholder="https://drive.google.com/... or LinkedIn URL" />
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem><FormLabel className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" />Additional Message (Optional)</FormLabel><FormControl><Textarea placeholder="Tell us more about yourself..." className="bg-card/50 border-border min-h-25 resize-none" {...field} /></FormControl><FormMessage /></FormItem>
        )}
      />
    </>
  );
}

function ExperienceField({ value, onChange }: { value?: string; onChange: (value: string) => void }) {
  return (
    <FormItem><FormLabel className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" />Experience Level</FormLabel><Select onValueChange={onChange} defaultValue={value}><FormControl><SelectTrigger className="bg-card/50 border-border"><SelectValue placeholder="Select experience" /></SelectTrigger></FormControl><SelectContent><SelectItem value="fresher">Fresher / BBTA Graduate</SelectItem><SelectItem value="0-1">0-1 Years</SelectItem><SelectItem value="1-3">1-3 Years</SelectItem><SelectItem value="3-5">3-5 Years</SelectItem><SelectItem value="5+">5+ Years</SelectItem></SelectContent></Select><FormMessage /></FormItem>
  );
}

function TextField({ form, name, icon: Icon, label, placeholder }: { form: UseFormReturn<JobSeekerFormData>; name: "skills" | "resumeUrl"; icon: typeof FileText; label: string; placeholder: string }) {
  return (
    <FormField control={form.control} name={name} render={({ field }) => (<FormItem><FormLabel className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" />{label}</FormLabel><FormControl><Input placeholder={placeholder} className="bg-card/50 border-border" {...field} /></FormControl><FormMessage /></FormItem>)} />
  );
}
