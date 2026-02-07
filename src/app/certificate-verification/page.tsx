"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Shield, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Award,
  Calendar,
  User,
  GraduationCap
} from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
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

// Validation schema
const verificationSchema = z.object({
  certificateId: z
    .string()
    .min(6, "Certificate ID must be at least 6 characters")
    .regex(/^[A-Z0-9-]+$/i, "Invalid certificate ID format"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

interface CertificateResult {
  valid: boolean;
  data?: {
    name: string;
    course: string;
    completionDate: string;
    certificateId: string;
    grade: string;
  };
}

/**
 * Certificate Verification Page
 */
export default function CertificateVerificationPage() {
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock verification result (for demo purposes)
    const mockValidIds = ["BBTA-2025-001", "BBTA-2025-002", "BBTA-2024-100"];
    const isValid = mockValidIds.includes(data.certificateId.toUpperCase());

    if (isValid) {
      setResult({
        valid: true,
        data: {
          name: "John Doe",
          course: "Barista Professional",
          completionDate: "January 15, 2025",
          certificateId: data.certificateId.toUpperCase(),
          grade: "Distinction",
        },
      });
    } else {
      setResult({ valid: false });
    }

    setIsSearching(false);
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Verify Certificate"
        subtitle="Authenticate Your Credentials"
        description="Enter your certificate ID to verify its authenticity and view your achievement details."
        ctaText="Start Verification"
        ctaHref="#verify"
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920"
        size="medium"
        showScrollIndicator={false}
      />

      {/* Verification Section */}
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
                <div>
                  <h2 className="font-serif text-2xl font-bold">
                    Certificate Verification
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Enter the certificate ID found on your document
                  </p>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                              className="bg-muted/50 border-border pl-10 text-lg py-6"
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
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
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
                  <Card className="border-green-500/30 bg-green-500/5">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6 text-green-500">
                        <CheckCircle2 className="h-8 w-8" />
                        <span className="text-xl font-bold">
                          Certificate Verified!
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-semibold">{result.data.name}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Course</p>
                            <p className="font-semibold">{result.data.course}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Completion Date
                            </p>
                            <p className="font-semibold">
                              {result.data.completionDate}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Grade</p>
                            <p className="font-semibold">{result.data.grade}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-green-500/20">
                        <p className="text-sm text-muted-foreground">
                          Certificate ID:{" "}
                          <span className="font-mono font-semibold text-foreground">
                            {result.data.certificateId}
                          </span>
                        </p>
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
                        <a href="/contact" className="text-primary hover:underline">
                          contact us
                        </a>
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
                The certificate ID is located at the bottom of your certificate
                document.
              </p>
              <p className="mt-2">
                For demo purposes, try:{" "}
                <code className="bg-muted px-2 py-1 rounded text-xs">
                  BBTA-2025-001
                </code>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
