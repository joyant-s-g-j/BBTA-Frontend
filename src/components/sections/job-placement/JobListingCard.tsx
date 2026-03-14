import { Clock, DollarSign, MapPin } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobListing } from "@/lib/data";

interface JobListingCardProps {
  job: JobListing;
  onClick: () => void;
}

export function JobListingCard({ job, onClick }: JobListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-2xl border border-border overflow-hidden card-hover"
    >
      {job.image && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={job.image}
            alt={job.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground text-xs">
              {job.jobType || "Full-time"}
            </Badge>
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {job.title}
        </h3>
        <p className="text-primary text-sm font-medium mb-3">{job.company}</p>

        <div className="space-y-2 mb-4">
          <MetaRow icon={MapPin} text={job.location} clamped />
          {job.salaryRange && <MetaRow icon={DollarSign} text={job.salaryRange} />}
          <MetaRow
            icon={Clock}
            text={`Posted ${new Date(job.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`}
          />
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{job.description}</p>
        <Button
          variant="outline"
          className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

function MetaRow({
  icon: Icon,
  text,
  clamped,
}: {
  icon: typeof Clock;
  text: string;
  clamped?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4 text-primary/70 shrink-0" />
      <span className={clamped ? "line-clamp-1" : undefined}>{text}</span>
    </div>
  );
}
