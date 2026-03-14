// ============================================================
// Central Site Configuration
// ============================================================
// Change ONLY this file when switching domains (e.g., from Vercel to production).
// Every file in the project imports from here — zero hardcoded URLs elsewhere.
// ============================================================

/** The canonical site URL (no trailing slash). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bbta-frontend.vercel.app";

/** Human-readable site name used in meta tags, JSON-LD, etc. */
export const SITE_NAME = "BBTA - Bangladesh Barista Training Academy";

/** Default OG image path (relative to SITE_URL). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Default meta description used as fallback. */
export const DEFAULT_DESCRIPTION =
  "Bangladesh's premier barista training academy. ISO certified courses in espresso, latte art, roasting, and cafe management. Transform your passion for coffee into a professional career.";

/** Default keywords used as fallback. */
export const DEFAULT_KEYWORDS = [
  "barista training",
  "coffee courses",
  "Bangladesh",
  "Dhaka",
  "latte art",
  "espresso training",
  "cafe management",
  "coffee roasting",
  "SCA certification",
  "BBTA",
];
