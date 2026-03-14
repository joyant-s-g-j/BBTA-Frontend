import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FieldItemProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

export function FieldItem({ icon: Icon, label, children }: FieldItemProps) {
  return (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
}
