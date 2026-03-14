import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JobListing } from "@/lib/data";
import { getWhatsappLink } from "./api";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface JobActionButtonsProps {
  job: JobListing;
  whatsappNumber: string;
}

export function JobActionButtons({ job, whatsappNumber }: JobActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <a
        href={getWhatsappLink(job, whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1"
      >
        <Button className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold">
          <WhatsAppIcon className="mr-2 h-5 w-5" />
          Contact via WhatsApp
        </Button>
      </a>

      {job.contactEmail && (
        <a
          href={`mailto:${job.contactEmail}?subject=Application for ${job.title}`}
          className="flex-1"
        >
          <Button variant="outline" className="w-full border-primary/30">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </a>
      )}
    </div>
  );
}
