"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  GraduationCap,
  FileText,
  Award,
  MessageSquare,
} from "lucide-react";
import type { JobListing } from "@/lib/data";
import { Button } from "@/components/ui/button";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { toast } from "sonner";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://bbta-backend.onrender.com/api";

// ─── Hirer Form Schema ───────────────────────────────────────────────
const hirerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[+]?[\d\s-]+$/, "Invalid phone number"),
  companyName: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position title is required"),
  jobTypeNeeded: z.string().min(1, "Please select a job type"),
  requirementsDesc: z.string().min(10, "Please describe your requirements"),
  message: z.string().optional(),
});

// ─── Job Seeker Form Schema ──────────────────────────────────────────
const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[+]?[\d\s-]+$/, "Invalid phone number"),
  experience: z.string().min(1, "Please select your experience level"),
  skills: z.string().min(5, "Please list your key skills"),
  preferredPosition: z.string().min(2, "Preferred position is required"),
  resumeUrl: z.string().optional(),
  message: z.string().optional(),
});

type HirerFormData = z.infer<typeof hirerSchema>;
type JobSeekerFormData = z.infer<typeof jobSeekerSchema>;

interface JobPlacementClientProps {
  sectionHeaders: Record<
    string,
    { subtitle: string; title: string; description?: string }
  >;
  jobListings: JobListing[];
  whatsappNumber: string;
}

export function JobPlacementClient({
  sectionHeaders: sh,
  jobListings,
  whatsappNumber,
}: JobPlacementClientProps) {
  const [selectedJob, setSelectedJob] = React.useState<JobListing | null>(null);
  const [hirerSubmitting, setHirerSubmitting] = React.useState(false);
  const [seekerSubmitting, setSeekerSubmitting] = React.useState(false);

  const hirerForm = useForm<HirerFormData>({
    resolver: zodResolver(hirerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      position: "",
      jobTypeNeeded: "",
      requirementsDesc: "",
      message: "",
    },
  });

  const seekerForm = useForm<JobSeekerFormData>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: "",
      skills: "",
      preferredPosition: "",
      resumeUrl: "",
      message: "",
    },
  });

  const onHirerSubmit = async (data: HirerFormData) => {
    setHirerSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/job-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "hirer",
          ...data,
          status: "New",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      toast.success("Application submitted!", {
        description:
          "We'll review your requirements and connect you with qualified candidates.",
      });
      hirerForm.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setHirerSubmitting(false);
    }
  };

  const onSeekerSubmit = async (data: JobSeekerFormData) => {
    setSeekerSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/job-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "job_seeker",
          ...data,
          status: "New",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      toast.success("Profile submitted!", {
        description:
          "We'll match you with suitable job opportunities and get back to you soon.",
      });
      seekerForm.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSeekerSubmitting(false);
    }
  };

  const getWhatsappLink = (job: JobListing) => {
    const contactNum = job.contactWhatsapp || whatsappNumber;
    const num = contactNum.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hi, I'm interested in the "${job.title}" position at ${job.company}. I found this listing on BBTA's Job Placement page.`
    );
    return `https://wa.me/${num}?text=${text}`;
  };

  return (
    <>
      {/* ─── Forms Section ──────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle={sh["sh_job_forms"]?.subtitle || "Get Connected"}
            title={sh["sh_job_forms"]?.title || "Hire or Get Hired"}
            description={sh["sh_job_forms"]?.description}
            titleSize="text-3xl md:text-4xl"
          />

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="job_seeker" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12 bg-card border border-border rounded-xl mb-8">
                <TabsTrigger
                  value="job_seeker"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold text-sm transition-all"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  I&apos;m a Job Seeker
                </TabsTrigger>
                <TabsTrigger
                  value="hirer"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold text-sm transition-all"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  I&apos;m Hiring
                </TabsTrigger>
              </TabsList>

              {/* ─── Job Seeker Form ─── */}
              <TabsContent value="job_seeker">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-xl"
                >
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl font-bold mb-2">
                      Job Seeker Registration
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Register your profile and we&apos;ll match you with the
                      best opportunities in the coffee industry.
                    </p>
                  </div>

                  <Form {...seekerForm}>
                    <form
                      onSubmit={seekerForm.handleSubmit(onSeekerSubmit)}
                      className="space-y-5"
                    >
                      <FormField
                        control={seekerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="h-4 w-4 text-primary" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                className="bg-card/50 border-border"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={seekerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  className="bg-card/50 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={seekerForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                Phone
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="+880 1XXX-XXXXXX"
                                  className="bg-card/50 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={seekerForm.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-primary" />
                                Experience Level
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-card/50 border-border">
                                    <SelectValue placeholder="Select experience" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="fresher">
                                    Fresher / BBTA Graduate
                                  </SelectItem>
                                  <SelectItem value="0-1">
                                    0-1 Years
                                  </SelectItem>
                                  <SelectItem value="1-3">
                                    1-3 Years
                                  </SelectItem>
                                  <SelectItem value="3-5">
                                    3-5 Years
                                  </SelectItem>
                                  <SelectItem value="5+">5+ Years</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={seekerForm.control}
                          name="preferredPosition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-primary" />
                                Preferred Position
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Barista, Cafe Manager"
                                  className="bg-card/50 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={seekerForm.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              Key Skills
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Latte Art, Espresso, Brewing, Customer Service"
                                className="bg-card/50 border-border"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={seekerForm.control}
                        name="resumeUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-primary" />
                              Resume / Portfolio Link (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://drive.google.com/... or LinkedIn URL"
                                className="bg-card/50 border-border"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={seekerForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-primary" />
                              Additional Message (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about yourself..."
                                className="bg-card/50 border-border min-h-25 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        disabled={seekerSubmitting}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-hover font-semibold"
                      >
                        {seekerSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                              }}
                              className="mr-2"
                            >
                              <Send className="h-5 w-5" />
                            </motion.div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Submit Profile
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting, you agree to our privacy policy and terms
                        of service.
                      </p>
                    </form>
                  </Form>
                </motion.div>
              </TabsContent>

              {/* ─── Hirer Form ─── */}
              <TabsContent value="hirer">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-xl"
                >
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl font-bold mb-2">
                      Hire Trained Baristas
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Tell us about your staffing needs and we&apos;ll connect
                      you with trained professionals from our academy.
                    </p>
                  </div>

                  <Form {...hirerForm}>
                    <form
                      onSubmit={hirerForm.handleSubmit(onHirerSubmit)}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={hirerForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                Contact Person
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  className="bg-card/50 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={hirerForm.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-primary" />
                                Company / Cafe Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your company name"
                                  className="bg-card/50 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={hirerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="company@email.com"
                                  className="bg-card/50 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={hirerForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                Phone
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="+880 1XXX-XXXXXX"
                                  className="bg-card/50 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={hirerForm.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-primary" />
                                Position to Fill
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Head Barista, Cafe Manager"
                                  className="bg-card/50 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={hirerForm.control}
                          name="jobTypeNeeded"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                Employment Type
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-card/50 border-border">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Full-time">
                                    Full-time
                                  </SelectItem>
                                  <SelectItem value="Part-time">
                                    Part-time
                                  </SelectItem>
                                  <SelectItem value="Contract">
                                    Contract
                                  </SelectItem>
                                  <SelectItem value="Internship">
                                    Internship
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={hirerForm.control}
                        name="requirementsDesc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              Requirements & Job Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the role, qualifications, salary range, and any other requirements..."
                                className="bg-card/50 border-border min-h-30 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={hirerForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-primary" />
                              Additional Message (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any additional information..."
                                className="bg-card/50 border-border min-h-20 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        disabled={hirerSubmitting}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-hover font-semibold"
                      >
                        {hirerSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                              }}
                              className="mr-2"
                            >
                              <Send className="h-5 w-5" />
                            </motion.div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Submit Hiring Request
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting, you agree to our privacy policy and terms
                        of service.
                      </p>
                    </form>
                  </Form>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* ─── Job Listings Section ──────────────────────────── */}
      {jobListings.length > 0 && (
        <section className="section-padding bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle={
                sh["sh_job_listings"]?.subtitle || "Latest Opportunities"
              }
              title={sh["sh_job_listings"]?.title || "Job Openings"}
              description={sh["sh_job_listings"]?.description}
              titleSize="text-3xl md:text-4xl"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobListings.map((job: JobListing) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedJob(job)}
                  className="group cursor-pointer bg-card rounded-2xl border border-border overflow-hidden card-hover"
                >
                  {/* Job Image */}
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

                  {/* Job Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-3">
                      {job.company}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary/70 shrink-0" />
                        <span className="line-clamp-1">{job.location}</span>
                      </div>
                      {job.salaryRange && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4 text-primary/70 shrink-0" />
                          <span>{job.salaryRange}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary/70 shrink-0" />
                        <span>
                          Posted{" "}
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {job.description}
                    </p>

                    <Button
                      variant="outline"
                      className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Job Detail Modal ──────────────────────────────── */}
      <AnimatePresence>
        {selectedJob && (
          <Dialog
            open={!!selectedJob}
            onOpenChange={() => setSelectedJob(null)}
          >
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {selectedJob.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-2">
                {/* Company & Meta */}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {selectedJob.jobType || "Full-time"}
                  </Badge>
                  <span className="text-primary font-semibold">
                    {selectedJob.company}
                  </span>
                </div>

                {/* Image */}
                {selectedJob.image && (
                  <div className="relative h-56 rounded-xl overflow-hidden">
                    <Image
                      src={selectedJob.image}
                      alt={selectedJob.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 672px) 100vw, 672px"
                    />
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{selectedJob.location}</span>
                  </div>
                  {selectedJob.salaryRange && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span>{selectedJob.salaryRange}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>
                      Posted{" "}
                      {new Date(selectedJob.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedJob.contactEmail && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <a
                        href={`mailto:${selectedJob.contactEmail}`}
                        className="hover:text-primary transition-colors"
                      >
                        {selectedJob.contactEmail}
                      </a>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">Job Description</h4>
                  <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Requirements */}
                {selectedJob.requirements &&
                  selectedJob.requirements.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Requirements</h4>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map(
                          (req: string, i: number) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {req}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={getWhatsappLink(selectedJob)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold">
                      <WhatsAppIcon className="mr-2 h-5 w-5" />
                      Contact via WhatsApp
                    </Button>
                  </a>
                  {selectedJob.contactEmail && (
                    <a
                      href={`mailto:${selectedJob.contactEmail}?subject=Application for ${selectedJob.title}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-primary/30"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
