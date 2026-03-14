import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JobActionButtons } from "./JobActionButtons";
import { JobDetailsMeta } from "./JobDetailsMeta";
import { JobRequirementsList } from "./JobRequirementsList";
import type { JobDetailsDialogProps } from "./types";

export function JobDetailsDialog({ job, whatsappNumber, onClose }: JobDetailsDialogProps) {
  if (!job) return null;

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{job.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary text-primary-foreground">
              {job.jobType || "Full-time"}
            </Badge>
            <span className="text-primary font-semibold">{job.company}</span>
          </div>

          {job.image && (
            <div className="relative h-56 rounded-xl overflow-hidden">
              <Image
                src={job.image}
                alt={job.title}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
            </div>
          )}

          <JobDetailsMeta job={job} />

          <div>
            <h4 className="font-semibold mb-2">Job Description</h4>
            <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
              {job.description}
            </p>
          </div>

          <JobRequirementsList requirements={job.requirements || []} />
          <JobActionButtons job={job} whatsappNumber={whatsappNumber} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
