import { z } from "zod";

const phoneSchema = z
  .string()
  .min(10, "Phone must be at least 10 digits")
  .regex(/^[+]?[\d\s-]+$/, "Invalid phone number");

export const hirerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: phoneSchema,
  companyName: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position title is required"),
  jobTypeNeeded: z.string().min(1, "Please select a job type"),
  requirementsDesc: z.string().min(10, "Please describe your requirements"),
  message: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: phoneSchema,
  experience: z.string().min(1, "Please select your experience level"),
  skills: z.string().min(5, "Please list your key skills"),
  preferredPosition: z.string().min(2, "Preferred position is required"),
  resumeUrl: z.string().optional(),
  message: z.string().optional(),
});

export const hirerDefaults = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  position: "",
  jobTypeNeeded: "",
  requirementsDesc: "",
  message: "",
};

export const seekerDefaults = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  skills: "",
  preferredPosition: "",
  resumeUrl: "",
  message: "",
};
