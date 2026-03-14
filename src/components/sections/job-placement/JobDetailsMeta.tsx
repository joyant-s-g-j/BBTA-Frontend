import { Clock, DollarSign, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { JobListing } from "@/lib/data";

interface JobDetailsMetaProps {
  job: JobListing;
}

export function JobDetailsMeta({ job }: JobDetailsMetaProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DetailRow icon={MapPin} text={job.location} />
      {job.salaryRange && <DetailRow icon={DollarSign} text={job.salaryRange} />}
      <DetailRow
        icon={Clock}
        text={`Posted ${new Date(job.createdAt).toLocaleDateString()}`}
      />
      {job.contactEmail && (
        <DetailRow
          icon={Mail}
          text={job.contactEmail}
          href={`mailto:${job.contactEmail}`}
        />
      )}
    </div>
  );
}

function DetailRow({
  icon: Icon,
  text,
  href,
}: {
  icon: LucideIcon;
  text: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-4 w-4 text-primary" />
      {href ? (
        <a href={href} className="hover:text-primary transition-colors">
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
