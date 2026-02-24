// Fetch data from backend API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bbta-backend.onrender.com/api';

async function fetchAPI(endpoint: string) {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, { next: { revalidate: 60 } }); // Cache for 60s
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.warn(`Failed to fetch ${endpoint}:`, error);
        return null;
    }
}

export async function getCourses() { return await fetchAPI('/courses') || []; }
export async function getCourseBySlug(slug: string) {
    const courses = await getCourses();
    return courses.find((c: any) => c.slug === slug);
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
    return posts.find((p: any) => p.slug === slug);
}
export async function getTeamMembers() { return await fetchAPI('/team') || []; }
export async function getBranches() { return await fetchAPI('/branches') || []; }
export async function getSettings() { return await fetchAPI('/settings/site') || {}; }
export async function getHero() { return await fetchAPI('/settings/hero') || {}; }
export async function getCtaBanner() { return await fetchAPI('/settings/cta') || {}; }
