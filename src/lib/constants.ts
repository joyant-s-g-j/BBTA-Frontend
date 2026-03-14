// ============================================================
// Central Site Configuration
// ============================================================
// Change ONLY this file when switching domains (e.g., from Vercel to production).
// Every file in the project imports from here — zero hardcoded URLs elsewhere.
// ============================================================

/** The canonical site URL (no trailing slash). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

/** Human-readable site name used in meta tags, JSON-LD, etc. */
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "";

/** Default OG image path (relative to SITE_URL). */
export const DEFAULT_OG_IMAGE = "";

/** Default meta description used as fallback. */
export const DEFAULT_DESCRIPTION = "";

/** Default keywords used as fallback. */
export const DEFAULT_KEYWORDS: string[] = [];
