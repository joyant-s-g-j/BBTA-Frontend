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
