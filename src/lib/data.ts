// BBTA Website Data - Interfaces and Fallbacks
// All components should use these interfaces for type safety.

export interface Course {
  slug: string;
  title: string;
  duration: string;
  price: string;
  discountPercent?: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "All";
  description: string;
  fullDescription: string;
  features: string[];
  curriculum: { day: string; topics: string[] }[];
  image: string;
}

export interface Testimonial {
  id: number | string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export interface Branch {
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl?: string;
  mapEmbedUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export interface GalleryItem {
  id: number | string;
  title: string;
  category: "Training" | "Events" | "Cafe" | "Students";
  image: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface UpcomingBatch {
  id: number | string;
  courseTitle: string;
  startDate: string;
  duration: string;
  timeSlot: string;
  branch: string;
  status: "Enrolling" | "Fast Filling" | "Closed";
  price: string | number;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Certification {
  id: number | string;
  title: string;
  issuer: string;
  description: string;
  icon: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ============ FALLBACK DATA ============
// This data is used as a fallback if the API is unavailable.
export const courses: Course[] = [];
export const testimonials: Testimonial[] = [];
export const branches: Branch[] = [];
export const teamMembers: TeamMember[] = [];
export const blogPosts: BlogPost[] = [];
export const galleryItems: GalleryItem[] = [];
export const features: Feature[] = [];
export const upcomingBatches: UpcomingBatch[] = [];
export const certifications: Certification[] = [];
export const stats = { students: 2500, graduates: 1800, courses: 12, branches: 3, yearsExperience: 5, successRate: 98 };
export const faqs: FAQ[] = [];

// Navigation links remain static
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bbta-courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/consulting", label: "Consulting" },
  { href: "/catering", label: "Catering" },
  { href: "/service-and-maintenance", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/certificate-verification", label: "Verify Certificate" }
];

// Service data remains static for now
export const consultingServices = [
  {
    title: "Menu Planning",
    description: "Create a compelling beverage menu that drives sales and customer satisfaction.",
    icon: "ClipboardList",
    features: ["Signature drink development", "Pricing strategy", "Seasonal menu planning", "Cost optimization"]
  },
  {
    title: "Staff Training",
    description: "Comprehensive training programs customized for your team's needs.",
    icon: "Users",
    features: ["On-site training", "Skill assessment", "Certification programs", "Ongoing support"]
  },
  {
    title: "Cafe Setup",
    description: "End-to-end support for launching your dream cafe.",
    icon: "Store",
    features: ["Equipment selection", "Layout optimization", "Supplier connections", "Launch support"]
  },
  {
    title: "Quality Audit",
    description: "Ensure your cafe maintains the highest standards of quality and service.",
    icon: "CheckCircle",
    features: ["Mystery shopping", "Quality assessment", "Improvement plans", "Follow-up audits"]
  }
];

export const cateringServices = [
  {
    title: "Wedding Events",
    description: "Make your special day memorable with our premium coffee bar service.",
    icon: "Heart",
    features: ["Mobile coffee bar", "Signature wedding drinks", "Professional baristas", "Custom branding"]
  }
];

export const maintenanceServices = [
  {
    title: "Espresso Machine Repair",
    description: "Expert repair services for all major espresso machine brands.",
    icon: "Wrench",
    features: ["Same-day service", "Genuine parts", "All brands", "Warranty support"]
  }
];
