import { Clock } from "lucide-react";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldItem } from "./FieldItem";

interface EmploymentTypeFieldProps {
  value?: string;
  onChange: (value: string) => void;
}

export function EmploymentTypeField({
  value,
  onChange,
}: EmploymentTypeFieldProps) {
  return (
    <FieldItem icon={Clock} label="Employment Type">
      <Select onValueChange={onChange} defaultValue={value}>
        <FormControl>
          <SelectTrigger className="bg-card/50 border-border">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Full-time">Full-time</SelectItem>
          <SelectItem value="Part-time">Part-time</SelectItem>
          <SelectItem value="Contract">Contract</SelectItem>
          <SelectItem value="Internship">Internship</SelectItem>
        </SelectContent>
      </Select>
    </FieldItem>
  );
}
