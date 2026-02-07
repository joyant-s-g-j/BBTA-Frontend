"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, User, Mail, Phone, MessageSquare, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { courses } from "@/lib/data";

// Form validation schema
const enrollmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[\d\s-]+$/, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
  preferredDate: z.string().optional(),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

interface EnrollmentFormProps {
  selectedCourse?: string;
  variant?: "full" | "compact";
  title?: string;
  description?: string;
}

/**
 * EnrollmentForm Component
 * React Hook Form + Zod validated enrollment form
 */
export function EnrollmentForm({
  selectedCourse,
  variant = "full",
  title = "Enroll Now",
  description = "Fill out the form below and we'll get back to you within 24 hours.",
}: EnrollmentFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      course: selectedCourse || "",
      message: "",
      preferredDate: "",
    },
  });

  const onSubmit = async (data: EnrollmentFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", data);
      
      toast.success("Enrollment request submitted!", {
        description: "We'll contact you within 24 hours to confirm your enrollment.",
      });
      
      form.reset();
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-card rounded-2xl border border-border p-6 md:p-8 ${
        variant === "compact" ? "" : "shadow-xl"
      }`}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <FormField
            control={form.control}
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
                    className="bg-muted/50 border-border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
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
                      className="bg-muted/50 border-border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
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
                      className="bg-muted/50 border-border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full address"
                    className="bg-muted/50 border-border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Course Selection */}
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Select Course
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-muted/50 border-border">
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.slug} value={course.slug}>
                        {course.title} - {course.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field (only for full variant) */}
          {variant === "full" && (
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Message (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any questions or special requests..."
                      className="bg-muted/50 border-border min-h-25 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-hover font-semibold"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="mr-2"
                >
                  <Send className="h-5 w-5" />
                </motion.div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Enrollment
              </>
            )}
          </Button>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </Form>
    </motion.div>
  );
}
