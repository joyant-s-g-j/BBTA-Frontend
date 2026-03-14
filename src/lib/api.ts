// Fetch data from backend API with retry logic for cold-start timeouts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 15000; // 15s first attempt

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout: number): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        return res;
    } finally {
        clearTimeout(timeoutId);
    }
}

async function fetchAPI(endpoint: string) {
    if (!API_URL) {
        console.warn(`Missing NEXT_PUBLIC_API_URL for endpoint: ${endpoint}`);
        return null;
    }
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const timeout = INITIAL_TIMEOUT + attempt * 10000; // 15s, 25s, 35s
            const res = await fetchWithTimeout(
                `${API_URL}${endpoint}`,
                { next: { revalidate: 30 } } as RequestInit,
                timeout,
            );
            if (!res.ok) throw new Error(`API Error: ${res.status}`);
            return await res.json();
        } catch (error: unknown) {
            const isTimeout =
                (error instanceof Error && error.name === 'AbortError') ||
                (error instanceof TypeError && (error as NodeJS.ErrnoException).cause?.toString().includes('ConnectTimeout'));
            const isLastAttempt = attempt === MAX_RETRIES - 1;

            if (isTimeout && !isLastAttempt) {
                console.warn(`Fetch ${endpoint} timed out (attempt ${attempt + 1}/${MAX_RETRIES}), retrying...`);
                // Small delay before retry
                await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
                continue;
            }

            console.warn(`Failed to fetch ${endpoint} after ${attempt + 1} attempt(s):`, error);
            return null;
        }
    }
    return null;
}

export async function getCourses() { return await fetchAPI('/courses') || []; }
export async function getCourseCategories() { return await fetchAPI('/course-categories') || []; }
export async function getCourseBySlug(slug: string) {
    const courses = await getCourses();
    return courses.find((c: { slug: string }) => c.slug === slug);
}
export async function getStats() { return await fetchAPI('/stats') || []; }
export async function getFeatures() { return await fetchAPI('/features') || []; }
export async function getFaqs() { return await fetchAPI('/faqs') || []; }
export async function getCareerBenefits() { return await fetchAPI('/career') || []; }
export async function getBatches() { return await fetchAPI('/batches') || []; }
export async function getGallery() { return await fetchAPI('/gallery') || []; }
export async function getCertifications() { return await fetchAPI('/certifications') || []; }
export async function getTestimonials() { return await fetchAPI('/testimonials') || []; }
export async function getBlogPosts() { return await fetchAPI('/blog') || []; }
export async function getBlogPost(slug: string) {
    const posts = await getBlogPosts();
    return posts.find((p: { slug: string }) => p.slug === slug);
}
export async function getTeamMembers() { return await fetchAPI('/team') || []; }
export async function getBranches() { return await fetchAPI('/branches') || []; }
export async function getSettings(key = 'site') { return await fetchAPI(`/settings/${key}`) || {}; }
export async function getHero() { return await fetchAPI('/settings/hero') || {}; }
export async function getCtaBanner() { return await fetchAPI('/settings/cta') || {}; }
export async function getServices() { return await fetchAPI('/services') || []; }
export async function verifyCertificate(id: string) {
    const all = await fetchAPI('/verify-certificate') || [];
    return all.filter((c: { certificateId: string }) => c.certificateId === id);
}
export async function getHeroByPage(page: string) { return await getSettings(`hero_${page}`); }
export async function getSeoByPage(page: string) { return await getSettings(`seo_${page}`); }

// ===================== Why BBTA =====================
export async function getWhyBbtaPoints() { return await fetchAPI('/why-bbta-points') || []; }

// ===================== Job Placement =====================
export async function getJobListings() { return await fetchAPI('/job-listings') || []; }
export async function getBannerSlides() { return await fetchAPI('/banner-slides') || []; }
export async function getMediaCoverage() { return await fetchAPI('/media-coverage') || []; }
export async function getVideos() { return await fetchAPI('/videos') || []; }
export async function getSuccessStories() { return await fetchAPI('/success-stories') || []; }
export async function getAccommodations() { return await fetchAPI('/accommodations') || []; }
export async function getPromoBanner() { return await fetchAPI('/settings/promo_banner') || null; }
export async function submitJobApplication(data: Record<string, unknown>) {
    try {
        const res = await fetch(`${API_URL}/job-applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Submission failed');
        return await res.json();
    } catch (error) {
        console.warn('Failed to submit job application:', error);
        return null;
    }
}

// ===================== Section Headers =====================
// Each section header is stored in Config with key: sh_{page}_{section}
export async function getSectionHeader(key: string, defaults: { subtitle: string; title: string; description?: string }) {
    void defaults;
    try {
        const data = await fetchAPI(`/settings/${key}`);
        return {
            subtitle: data?.subtitle || "",
            title: data?.title || "",
            description: data?.description || "",
        };
    } catch {
        return { subtitle: "", title: "", description: "" };
    }
}

export async function getAllSectionHeaders() {
    const keys = [
        'sh_home_stats',
        'sh_home_courses',
        'sh_home_batches',
        'sh_home_features',
        'sh_home_career',
        'sh_home_testimonials',
        'sh_home_certs',
        'sh_home_faq',
        'sh_home_branches',
        'sh_home_media',
        'sh_about_mission',
        'sh_about_timeline',
        'sh_about_team',
        'sh_courses_faq',
        'sh_catering_services',
        'sh_catering_events',
        'sh_catering_pricing',
        'sh_consulting_svcs',
        'sh_consulting_cases',
        'sh_consulting_form',
        'sh_maint_services',
        'sh_maint_rates',
        'sh_maint_form',
        'sh_contact_info',
        'sh_course_related',
        'sh_certificate_verify',
        'sh_why_bbta_points',
        'sh_why_bbta_impact',
        'sh_job_forms',
        'sh_job_listings',
        'sh_accommodation',
        'sh_success_stories',
        'sh_review_testimonials',
    ];

    const results = await Promise.all(
        keys.map((key) => getSectionHeader(key, { subtitle: "", title: "", description: "" }))
    );

    const map: Record<string, { subtitle: string; title: string; description?: string }> = {};
    keys.forEach((key, i) => { map[key] = results[i]; });
    return map;
}
