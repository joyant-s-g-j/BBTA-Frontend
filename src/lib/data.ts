// BBTA Website Data - All hardcoded content
// This file contains all static data for the website

export interface Course {
  slug: string;
  title: string;
  duration: string;
  price: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "All";
  description: string;
  fullDescription: string;
  features: string[];
  curriculum: { day: string; topics: string[] }[];
  image: string;
}

export interface Testimonial {
  id: number;
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
  mapUrl: string;
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
  id: number;
  title: string;
  category: "Training" | "Events" | "Cafe" | "Students";
  image: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

// ============ COURSES DATA ============
export const courses: Course[] = [
  {
    slug: "barista-foundation",
    title: "Barista Foundation",
    duration: "3 Days",
    price: "5,990 BDT",
    level: "Beginner",
    description: "Basics of espresso making, grinding, and tamping. Hands-on practice.",
    fullDescription: "Start your barista journey with our comprehensive foundation course. Learn the fundamentals of espresso preparation, from understanding coffee beans to perfecting your grinding and tamping techniques. This hands-on course provides the essential skills every aspiring barista needs.",
    features: ["Espresso basics", "Machine handling", "Grinding techniques", "Tamping mastery", "Certification included"],
    curriculum: [
      { day: "Day 1", topics: ["Introduction to coffee", "Coffee bean varieties", "Grinder setup and calibration"] },
      { day: "Day 2", topics: ["Espresso machine operation", "Shot extraction", "Tamping techniques"] },
      { day: "Day 3", topics: ["Practice sessions", "Quality assessment", "Certification exam"] }
    ],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
  },
  {
    slug: "barista-intermediate",
    title: "Barista Intermediate",
    duration: "7 Days",
    price: "11,990 BDT",
    level: "Intermediate",
    description: "Milk steaming, latte art intro, maintenance routines.",
    fullDescription: "Elevate your barista skills with advanced milk techniques and latte art fundamentals. Master the art of steaming milk to silky perfection and create beautiful designs that will impress any coffee lover. Learn essential maintenance routines to keep your equipment in top condition.",
    features: ["Milk steaming techniques", "Latte art basics", "Machine maintenance", "Temperature control", "Texture perfection"],
    curriculum: [
      { day: "Day 1-2", topics: ["Milk science", "Steaming techniques", "Microfoam creation"] },
      { day: "Day 3-4", topics: ["Heart and rosetta patterns", "Tulip basics", "Free pour techniques"] },
      { day: "Day 5-6", topics: ["Machine cleaning", "Preventive maintenance", "Troubleshooting"] },
      { day: "Day 7", topics: ["Practical exam", "Portfolio creation", "Certification"] }
    ],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
  },
  {
    slug: "barista-professional",
    title: "Barista Professional",
    duration: "12 Days",
    price: "20,990 BDT",
    level: "Advanced",
    description: "Advanced espresso, sensory evaluation, job readiness.",
    fullDescription: "Become a professional-grade barista with our intensive 12-day program. Develop sophisticated sensory evaluation skills, master advanced espresso techniques, and prepare for a successful career in the specialty coffee industry. This course is designed for those serious about coffee excellence.",
    features: ["Sensory skills", "Advanced extraction", "Job readiness", "Customer service", "Menu development"],
    curriculum: [
      { day: "Day 1-3", topics: ["Advanced extraction theory", "Dose and yield optimization", "Grind adjustments"] },
      { day: "Day 4-6", topics: ["Sensory training", "Cupping sessions", "Flavor profiling"] },
      { day: "Day 7-9", topics: ["Advanced latte art", "Signature drinks", "Menu creation"] },
      { day: "Day 10-12", topics: ["Customer service excellence", "Workflow optimization", "Final certification"] }
    ],
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800"
  },
  {
    slug: "barista-advance-professional",
    title: "Barista Advance Professional",
    duration: "18 Days",
    price: "39,990 BDT",
    level: "Expert",
    description: "Brewing methods, baking integration, flair bartending.",
    fullDescription: "Our flagship program for those aspiring to reach the pinnacle of barista excellence. This comprehensive course covers everything from advanced brewing methods to baking integration and flair bartending techniques. Graduate ready to work in world-class establishments or open your own specialty cafe.",
    features: ["Flair techniques", "Baking integration", "International standards", "Competition prep", "Business fundamentals"],
    curriculum: [
      { day: "Day 1-4", topics: ["Alternative brewing methods", "Siphon and pour-over mastery", "Cold brew techniques"] },
      { day: "Day 5-8", topics: ["Cafe baking fundamentals", "Coffee-pastry pairing", "Menu integration"] },
      { day: "Day 9-12", topics: ["Flair bartending basics", "Show techniques", "Customer engagement"] },
      { day: "Day 13-16", topics: ["Competition preparation", "Presentation skills", "Judging criteria"] },
      { day: "Day 17-18", topics: ["Business planning", "Final showcase", "Graduation ceremony"] }
    ],
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800"
  },
  {
    slug: "hand-brewing-method",
    title: "Hand Brewing Methods",
    duration: "2 Days",
    price: "6,990 BDT",
    level: "Beginner",
    description: "Pour-over, Aeropress, French Press techniques.",
    fullDescription: "Discover the art of manual coffee brewing with our intensive hands-on workshop. Master various brewing methods including pour-over, Aeropress, and French Press. Learn to extract the best flavors from specialty beans using traditional techniques that highlight coffee's unique characteristics.",
    features: ["Manual brewing", "Taste profiling", "Equipment setup", "Recipe development", "Water chemistry basics"],
    curriculum: [
      { day: "Day 1", topics: ["Pour-over fundamentals", "V60 and Chemex techniques", "Water temperature and ratios"] },
      { day: "Day 2", topics: ["Aeropress methods", "French Press mastery", "Comparative tasting"] }
    ],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
  },
  {
    slug: "ice-crashed-drinks",
    title: "Ice-Crushed Drinks",
    duration: "2 Days",
    price: "6,990 BDT",
    level: "Beginner",
    description: "Blended drinks, smoothies, iced lattes.",
    fullDescription: "Perfect for those hot summer days! Learn to create refreshing ice-crushed beverages, smoothies, and iced coffee drinks that will keep your customers coming back. Master blending techniques, flavor combinations, and stunning presentation skills.",
    features: ["Blending techniques", "Flavor balancing", "Presentation", "Seasonal menus", "Ingredient sourcing"],
    curriculum: [
      { day: "Day 1", topics: ["Blending equipment", "Ice types and preparation", "Base recipes"] },
      { day: "Day 2", topics: ["Flavor combinations", "Garnishing techniques", "Menu development"] }
    ],
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800"
  },
  {
    slug: "baking-pastry",
    title: "Baking & Pastry",
    duration: "3 Days",
    price: "6,990 BDT",
    level: "Beginner",
    description: "Basic baking for cafe items like croissants, cakes.",
    fullDescription: "Complement your coffee skills with essential baking techniques. Learn to create delicious cafe staples including croissants, muffins, cookies, and simple cakes that pair perfectly with coffee. Perfect for aspiring cafe owners or baristas looking to expand their skill set.",
    features: ["Dough handling", "Oven techniques", "Coffee pairing", "Presentation", "Storage and freshness"],
    curriculum: [
      { day: "Day 1", topics: ["Baking fundamentals", "Ingredient science", "Dough preparation"] },
      { day: "Day 2", topics: ["Croissants and pastries", "Oven management", "Timing and texture"] },
      { day: "Day 3", topics: ["Cakes and muffins", "Coffee pairing", "Display techniques"] }
    ],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"
  },
  {
    slug: "mixology",
    title: "Mixology",
    duration: "3 Days",
    price: "9,990 BDT",
    level: "Intermediate",
    description: "Mocktails, infused drinks, cafe beverage innovation.",
    fullDescription: "Expand your beverage repertoire with creative mixology skills. Learn to craft stunning mocktails, infused drinks, and innovative cafe beverages that will set your menu apart. Perfect for cafes looking to offer unique, Instagram-worthy drinks.",
    features: ["Ingredient mixing", "Garnishing", "Menu integration", "Signature drinks", "Cost management"],
    curriculum: [
      { day: "Day 1", topics: ["Mixology fundamentals", "Tools and techniques", "Flavor profiles"] },
      { day: "Day 2", topics: ["Classic mocktails", "Coffee-based cocktails", "Infusion techniques"] },
      { day: "Day 3", topics: ["Signature creation", "Presentation mastery", "Menu costing"] }
    ],
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800"
  },
  {
    slug: "drinks-presentation",
    title: "Drinks Presentation",
    duration: "1 Day",
    price: "4,990 BDT",
    level: "All",
    description: "Latte art, plating, visual appeal mastery.",
    fullDescription: "Master the visual art of beverage presentation. Learn advanced latte art techniques, plating aesthetics, and presentation skills that will elevate your drinks from ordinary to extraordinary. A must for any barista focused on customer experience.",
    features: ["Visual appeal", "Customer service", "Photography tips", "Social media ready", "Consistency training"],
    curriculum: [
      { day: "Day 1", topics: ["Advanced latte art", "Plating techniques", "Color and contrast", "Photography basics", "Practical assessment"] }
    ],
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800"
  },
  {
    slug: "roasting-course",
    title: "Roasting Course",
    duration: "5 Days",
    price: "15,990 BDT",
    level: "Advanced",
    description: "Bean roasting, quality control, profile development.",
    fullDescription: "Dive deep into the world of coffee roasting. Learn to transform green beans into perfectly roasted coffee with our comprehensive roasting program. Understand roast profiles, quality control, and develop your own signature roasts that will define your coffee brand.",
    features: ["Roast profiles", "Equipment mastery", "Quality control", "Cupping", "Business applications"],
    curriculum: [
      { day: "Day 1", topics: ["Green coffee selection", "Bean characteristics", "Roasting theory"] },
      { day: "Day 2-3", topics: ["Roaster operation", "Profile development", "First and second crack"] },
      { day: "Day 4", topics: ["Quality control", "Cupping protocols", "Defect identification"] },
      { day: "Day 5", topics: ["Business applications", "Packaging", "Final roasting project"] }
    ],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800"
  },
  {
    slug: "latte-art-workshop",
    title: "Latte Art Workshop",
    duration: "2 Days",
    price: "7,990 BDT",
    level: "Intermediate",
    description: "Advanced patterns, free-pouring, competition tips.",
    fullDescription: "Take your latte art to the next level with our intensive workshop. Learn advanced free-pour patterns, etching techniques, and competition-level presentations. Perfect for baristas looking to compete or simply impress their customers with stunning coffee art.",
    features: ["Heart and rosetta", "Tulip mastery", "Etching techniques", "Competition prep", "Speed and consistency"],
    curriculum: [
      { day: "Day 1", topics: ["Milk science deep dive", "Advanced free-pour patterns", "Speed techniques"] },
      { day: "Day 2", topics: ["Etching and 3D art", "Competition standards", "Portfolio development"] }
    ],
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800"
  }
];

// ============ STATS DATA ============
export const stats = {
  students: 500,
  graduates: 2000,
  courses: 11,
  branches: 2,
  yearsExperience: 8,
  successRate: 98
};

// ============ TESTIMONIALS DATA ============
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Ahmed",
    role: "Head Barista at Artisan Coffee",
    quote: "BBTA transformed my passion into a profession. The hands-on training and expert guidance gave me the skills to become a head barista at one of Dhaka's finest cafes. Forever grateful!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
  },
  {
    id: 2,
    name: "Fatima Rahman",
    role: "Cafe Owner",
    quote: "After completing the Professional course, I opened my own cafe. The business fundamentals and coffee expertise I gained at BBTA were invaluable. Best investment I ever made!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
  },
  {
    id: 3,
    name: "Mohammad Hassan",
    role: "Competition Barista",
    quote: "The latte art workshop prepared me for national competitions. The techniques and mentorship from BBTA instructors helped me win my first championship!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
  },
  {
    id: 4,
    name: "Nadia Sultana",
    role: "Coffee Trainer",
    quote: "I came to BBTA as a beginner and left as a certified trainer. The comprehensive curriculum and supportive environment made all the difference in my career journey.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
  },
  {
    id: 5,
    name: "Karim Islam",
    role: "Hotel Beverage Manager",
    quote: "BBTA's professional course opened doors I never imagined. Now I manage the entire beverage program at a 5-star hotel. The training is world-class!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
  }
];

// ============ BRANCHES DATA ============
export const branches: Branch[] = [
  {
    name: "Baridhara Branch",
    address: "House 45, Road 11, Baridhara Diplomatic Zone, Dhaka 1212",
    phone: "+880 1745-045500",
    hours: "Saturday - Friday: 9:00 AM - 9:00 PM",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5!2d90.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzAwLjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
  },
  {
    name: "Dhanmondi Branch",
    address: "House 12, Road 8, Dhanmondi, Dhaka 1205",
    phone: "+880 1745-045501",
    hours: "Saturday - Friday: 9:00 AM - 9:00 PM",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d90.3!3d23.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQyJzAwLjAiTiA5MMKwMTgnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
  }
];

// ============ TEAM MEMBERS DATA ============
export const teamMembers: TeamMember[] = [
  {
    name: "Chef Amir Khan",
    role: "Founder & Head Trainer",
    bio: "With over 15 years of international experience, Chef Amir founded BBTA to bring world-class barista training to Bangladesh.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
  },
  {
    name: "Sarah Ahmed",
    role: "Senior Barista Instructor",
    bio: "A certified SCA trainer with expertise in sensory analysis and competition coaching.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
  },
  {
    name: "Rafiq Hassan",
    role: "Roasting Specialist",
    bio: "Master roaster with 10+ years of experience in specialty coffee roasting and quality control.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400"
  },
  {
    name: "Mira Chowdhury",
    role: "Latte Art Champion",
    bio: "National latte art champion and lead instructor for all artistry-focused courses.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
  }
];

// ============ BLOG POSTS DATA ============
export const blogPosts: BlogPost[] = [
  {
    slug: "top-latte-art-tips",
    title: "Top 10 Latte Art Tips for Beginners",
    excerpt: "Master the basics of latte art with these essential tips from our expert trainers. Learn the secrets to creating beautiful patterns.",
    date: "2026-01-28",
    category: "Latte Art",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800",
    author: "Mira Chowdhury"
  },
  {
    slug: "espresso-extraction-guide",
    title: "The Perfect Espresso Extraction Guide",
    excerpt: "Understand the science behind espresso extraction and learn how to pull the perfect shot every time.",
    date: "2026-01-20",
    category: "Espresso",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800",
    author: "Chef Amir Khan"
  },
  {
    slug: "coffee-roasting-basics",
    title: "Coffee Roasting: From Green to Gold",
    excerpt: "Explore the fascinating journey of coffee beans from green to perfectly roasted. A beginner's guide to roasting.",
    date: "2026-01-15",
    category: "Roasting",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
    author: "Rafiq Hassan"
  },
  {
    slug: "starting-your-cafe",
    title: "Essential Steps to Starting Your Own Cafe",
    excerpt: "Planning to open a cafe? Here's everything you need to know from location selection to menu planning.",
    date: "2026-01-10",
    category: "Business",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
    author: "Sarah Ahmed"
  },
  {
    slug: "milk-steaming-techniques",
    title: "Mastering Milk Steaming Techniques",
    excerpt: "Learn the art of creating silky microfoam for your lattes and cappuccinos with these professional techniques.",
    date: "2026-01-05",
    category: "Techniques",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800",
    author: "Mira Chowdhury"
  }
];

// ============ GALLERY ITEMS DATA ============
export const galleryItems: GalleryItem[] = [
  { id: 1, title: "Latte Art Class", category: "Training", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800" },
  { id: 2, title: "Coffee Cupping Session", category: "Training", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800" },
  { id: 3, title: "Graduation Ceremony", category: "Events", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800" },
  { id: 4, title: "Barista Competition", category: "Events", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800" },
  { id: 5, title: "Our Training Cafe", category: "Cafe", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800" },
  { id: 6, title: "Espresso Training", category: "Training", image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800" },
  { id: 7, title: "Student Practice", category: "Students", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800" },
  { id: 8, title: "Corporate Event", category: "Events", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800" },
  { id: 9, title: "Roasting Workshop", category: "Training", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800" },
  { id: 10, title: "Happy Graduates", category: "Students", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800" },
  { id: 11, title: "Our Coffee Bar", category: "Cafe", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800" },
  { id: 12, title: "Team Building Event", category: "Events", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800" },
  { id: 13, title: "Brewing Techniques", category: "Training", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800" },
  { id: 14, title: "Certificate Ceremony", category: "Students", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800" },
  { id: 15, title: "Mixology Class", category: "Training", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800" },
  { id: 16, title: "Wedding Catering", category: "Events", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800" },
  { id: 17, title: "Pastry Class", category: "Training", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800" },
  { id: 18, title: "Student Showcase", category: "Students", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800" },
  { id: 19, title: "Cafe Interior", category: "Cafe", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800" },
  { id: 20, title: "Award Ceremony", category: "Events", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800" }
];

// ============ FEATURES DATA ============
export const features: Feature[] = [
  {
    icon: "Coffee",
    title: "Hands-On Training",
    description: "Learn by doing with our practical, immersive training sessions using professional equipment."
  },
  {
    icon: "Award",
    title: "ISO Certified",
    description: "Internationally recognized certifications that open doors to global career opportunities."
  },
  {
    icon: "Briefcase",
    title: "Job Placement",
    description: "98% placement rate with our network of partner cafes and hospitality establishments."
  },
  {
    icon: "Users",
    title: "Expert Instructors",
    description: "Learn from industry veterans with years of international experience and competition wins."
  },
  {
    icon: "Clock",
    title: "Flexible Schedule",
    description: "Morning, evening, and weekend batches to fit your busy lifestyle."
  },
  {
    icon: "Star",
    title: "Premium Equipment",
    description: "Train on the same equipment used in world-class cafes and competitions."
  }
];

// ============ CONSULTING SERVICES DATA ============
export const consultingServices: Service[] = [
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

// ============ CATERING SERVICES DATA ============
export const cateringServices: Service[] = [
  {
    title: "Wedding Events",
    description: "Make your special day memorable with our premium coffee bar service.",
    icon: "Heart",
    features: ["Mobile coffee bar", "Signature wedding drinks", "Professional baristas", "Custom branding"]
  },
  {
    title: "Corporate Events",
    description: "Impress clients and energize your team with exceptional coffee service.",
    icon: "Building",
    features: ["Conference service", "Office parties", "Product launches", "Team building events"]
  },
  {
    title: "Private Parties",
    description: "Elevate your private gatherings with artisanal coffee experiences.",
    icon: "PartyPopper",
    features: ["Home events", "Birthday parties", "Anniversary celebrations", "Customized menus"]
  },
  {
    title: "Exhibition & Trade Shows",
    description: "Stand out at exhibitions with our professional coffee service.",
    icon: "Presentation",
    features: ["Booth service", "Brand integration", "High-volume capability", "Trained baristas"]
  }
];

// ============ MAINTENANCE SERVICES DATA ============
export const maintenanceServices: Service[] = [
  {
    title: "Espresso Machine Repair",
    description: "Expert repair services for all major espresso machine brands.",
    icon: "Wrench",
    features: ["Same-day service", "Genuine parts", "All brands", "Warranty support"]
  },
  {
    title: "Grinder Calibration",
    description: "Precision calibration for consistent, perfect grinds every time.",
    icon: "Settings",
    features: ["Burr replacement", "Alignment service", "Performance testing", "Maintenance training"]
  },
  {
    title: "Preventive Maintenance",
    description: "Regular maintenance plans to keep your equipment running smoothly.",
    icon: "Shield",
    features: ["Monthly plans", "Annual contracts", "Priority service", "Discounted parts"]
  },
  {
    title: "Equipment Installation",
    description: "Professional installation and setup of new equipment.",
    icon: "Package",
    features: ["Delivery included", "Setup & testing", "Staff training", "Warranty activation"]
  }
];

// ============ NAVIGATION LINKS ============
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

// ============ FAQ DATA ============
export const faqs = [
  {
    question: "What is included in the course fee?",
    answer: "All course fees include training materials, practice ingredients, certification, and access to our professional equipment during training hours."
  },
  {
    question: "Do I need prior experience?",
    answer: "No! Our Beginner and Foundation courses are designed for complete beginners. We'll teach you everything from scratch."
  },
  {
    question: "What certification do I receive?",
    answer: "Upon successful completion, you'll receive an ISO-certified Bangladesh Barista Training Academy certificate recognized nationally and internationally."
  },
  {
    question: "Can I get job placement assistance?",
    answer: "Yes! We have partnerships with over 50 cafes and hotels. Our placement rate is 98% for Professional and Advanced course graduates."
  },
  {
    question: "What are the class sizes?",
    answer: "We maintain small class sizes of 6-8 students maximum to ensure personalized attention and ample hands-on practice time."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment plans. You can pay in installments for courses over 3 days duration. Contact us for details."
  }
];
