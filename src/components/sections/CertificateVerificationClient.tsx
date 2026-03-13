"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  User,
  GraduationCap,
  Download,
  Clock,
} from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { downloadCertificatePDF } from "@/lib/generate-certificate-pdf";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://bbta-backend.onrender.com/api";

// Validation schema
const verificationSchema = z.object({
  certificateId: z
    .string()
    .min(6, "Certificate ID must be at least 6 characters")
    .regex(/^[A-Z0-9-]+$/i, "Invalid certificate ID format"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

interface CertificateData {
  name: string;
  course: string;
  startDate: string;
  endDate: string;
  certificateId: string;
}

interface CertificateResult {
  valid: boolean;
  data?: CertificateData;
}

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
}

interface SectionHeaderData {
  subtitle: string;
  title: string;
  description?: string;
}

interface Props {
  hero: HeroData;
  sectionHeader: SectionHeaderData;
}

export default function CertificateVerificationClient({ hero, sectionHeader }: Props) {
  const [isSearching, setIsSearching] = React.useState(false);
  const [result, setResult] = React.useState<CertificateResult | null>(null);

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      certificateId: "",
    },
  });

  const onSubmit = async (data: VerificationFormData) => {
    setIsSearching(true);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/verify-certificate`);
      if (!res.ok) throw new Error("API error");
      const all = await res.json();
      const found = all.find(
        (c: { certificateId: string }) => c.certificateId === data.certificateId
      );

      if (found) {
        setResult({
          valid: true,
          data: {
            name: found.studentName,
            course: found.courseName,
            startDate: found.startDate,
            endDate: found.endDate,
            certificateId: found.certificateId,
          },
        });
      } else {
        setResult({ valid: false });
      }
    } catch (error) {
      console.error(error);
      setResult({ valid: false });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <HeroSection
        {...hero}
        size="medium"
        showScrollIndicator={false}
      />

      <section id="verify" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Verification Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <SectionHeader
                  subtitle={sectionHeader.subtitle}
                  title={sectionHeader.title}
                  align="left"
                  titleSize="text-2xl"
                  description={sectionHeader.description}
                  className="mb-0"
                />
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="certificateId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate ID</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g., BBTA-2025-001"
                              className="bg-card/50 border-border pl-10 text-lg py-6"
                              {...field}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSearching}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                  >
                    {isSearching ? (
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
                          <Search className="h-5 w-5" />
                        </motion.div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Verify Certificate
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Result Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {result.valid && result.data ? (
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6 text-primary">
                        <CheckCircle2 className="h-8 w-8" />
                        <span className="text-xl font-bold">
                          Certificate Verified!
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Name
                            </p>
                            <p className="font-semibold">
                              {result.data.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Course
                            </p>
                            <p className="font-semibold">
                              {result.data.course}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Start Date
                            </p>
                            <p className="font-semibold">
                              {result.data.startDate
                                ? new Date(
                                    result.data.startDate
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "—"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              End Date
                            </p>
                            <p className="font-semibold">
                              {result.data.endDate
                                ? new Date(
                                    result.data.endDate
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-primary/20 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Certificate ID:{" "}
                          <span className="font-mono font-semibold text-foreground">
                            {result.data.certificateId}
                          </span>
                        </p>
                        <Button
                          onClick={() => {
                            if (result.data) {
                              downloadCertificatePDF({
                                certificateId: result.data.certificateId,
                                studentName: result.data.name,
                                courseName: result.data.course,
                                startDate: result.data.startDate,
                                endDate: result.data.endDate,
                              });
                            }
                          }}
                          className="gap-2 bg-bbta-red-accent hover:bg-primary text-white"
                        >
                          <Download className="h-4 w-4" />
                          Download Certificate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-red-500/30 bg-red-500/5">
                    <CardContent className="p-8 text-center">
                      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-red-500 mb-2">
                        Certificate Not Found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        The certificate ID you entered could not be verified.
                        Please check the ID and try again.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        If you believe this is an error, please{" "}
                        <Link
                          href="/contact"
                          className="text-primary hover:underline"
                        >
                          contact us
                        </Link>
                        .
                      </p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Help Text */}
            <div className="mt-8 text-center text-muted-foreground text-sm">
              <p>
                The certificate ID is located on your certificate document.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
