import type { JobListing } from "@/lib/data";
import { toast } from "sonner";
import type { HirerFormData, JobSeekerFormData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function postApplication(payload: Record<string, string>) {
  if (!API_URL) throw new Error("API URL not configured");

  const res = await fetch(`${API_URL}/job-applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Submission failed");
}

export async function submitHirerApplication(data: HirerFormData) {
  await postApplication({
    type: "hirer",
    name: data.name,
    email: data.email,
    phone: data.phone,
    company_name: data.companyName,
    position: data.position,
    job_type_needed: data.jobTypeNeeded,
    requirements_desc: data.requirementsDesc,
    message: data.message || "",
    status: "New",
  });

  toast.success("Application submitted!", {
    description:
      "We'll review your requirements and connect you with qualified candidates.",
  });
}

export async function submitSeekerApplication(data: JobSeekerFormData) {
  await postApplication({
    type: "job_seeker",
    name: data.name,
    email: data.email,
    phone: data.phone,
    experience: data.experience,
    skills: data.skills,
    preferred_position: data.preferredPosition,
    resume_url: data.resumeUrl || "",
    message: data.message || "",
    status: "New",
  });

  toast.success("Profile submitted!", {
    description:
      "We'll match you with suitable job opportunities and get back to you soon.",
  });
}

export function getWhatsappLink(job: JobListing, fallbackNumber: string) {
  const contactNum = job.contactWhatsapp || fallbackNumber;
  const num = contactNum.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    `Hi, I'm interested in the "${job.title}" position at ${job.company}. I found this listing on BBTA's Job Placement page.`
  );

  return `https://wa.me/${num}?text=${text}`;
}
