// Fetch data from backend API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bbta-backend.onrender.com/api';

async function fetchAPI(endpoint: string) {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            next: { revalidate: 30 },
        });
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.warn(`Failed to fetch ${endpoint}:`, error);
        return null;
    }
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
    try {
        const data = await fetchAPI(`/settings/${key}`);
        return {
            subtitle: data?.subtitle || defaults.subtitle,
            title: data?.title || defaults.title,
            description: data?.description !== undefined ? data.description : defaults.description,
        };
    } catch {
        return defaults;
    }
}

export async function getAllSectionHeaders() {
    const keys = [
        // Home Page
        { key: 'sh_home_courses', defaults: { subtitle: 'Start Your Journey', title: 'Popular Courses', description: 'From beginner foundations to advanced professional training, find the perfect course for your coffee career.' } },
        { key: 'sh_home_batches', defaults: { subtitle: 'Secure Your Spot', title: 'Upcoming Batches', description: 'Check out our latest schedule and join our next training session. Limited seats available for each batch.' } },
        { key: 'sh_home_features', defaults: { subtitle: 'Why Choose Us', title: 'The BBTA Advantage', description: 'Experience world-class training with ISO-certified curriculum, expert instructors, and career-focused programs.' } },
        { key: 'sh_home_career', defaults: { subtitle: 'Build Your Future', title: 'How Barista Training Helps Grow Your Career', description: 'The coffee industry is one of the fastest-growing sectors in Bangladesh and globally.' } },
        { key: 'sh_home_testimonials', defaults: { subtitle: 'Success Stories', title: 'What Our Graduates Say', description: undefined } },
        { key: 'sh_home_certs', defaults: { subtitle: 'Industry Recognition', title: 'Our Certifications & Accreditations', description: 'We take pride in our international standards and local recognition.' } },
        { key: 'sh_home_faq', defaults: { subtitle: 'Common Questions', title: 'Frequently Asked Questions', description: 'Everything you need to know about our courses, certification, and career opportunities.' } },
        { key: 'sh_home_branches', defaults: { subtitle: 'Visit Us', title: 'Our Training Centers', description: 'State-of-the-art facilities equipped with professional-grade coffee equipment in prime Dhaka locations.' } },
        // About Page
        { key: 'sh_about_mission', defaults: { subtitle: 'Our Mission', title: 'Empowering Coffee Professionals', description: undefined } },
        { key: 'sh_about_timeline', defaults: { subtitle: 'Our Journey', title: 'BBTA History & Milestones', description: undefined } },
        { key: 'sh_about_team', defaults: { subtitle: 'Meet the Experts', title: 'Our Professional Trainers', description: undefined } },
        // Courses Page
        { key: 'sh_courses_faq', defaults: { subtitle: 'Common Questions', title: 'Frequently Asked Questions', description: 'Everything you need to know about our courses and certification.' } },
        // Upcoming Batch Page
        { key: 'sh_upcoming_why', defaults: { subtitle: 'Our Advantages', title: 'Why Join Our Upcoming Batches?', description: 'Our training programs are designed to provide maximum hands-on experience and professional exposure.' } },
        // Catering Page
        { key: 'sh_catering_services', defaults: { subtitle: 'Our Services', title: 'Events We Serve', description: undefined } },
        { key: 'sh_catering_events', defaults: { subtitle: 'Past Events', title: 'Event Highlights', description: undefined } },
        { key: 'sh_catering_pricing', defaults: { subtitle: 'Pricing', title: 'Choose Your Package', description: undefined } },
        // Consulting Page
        { key: 'sh_consulting_svcs', defaults: { subtitle: 'Our Services', title: 'Comprehensive Consulting Solutions', description: undefined } },
        { key: 'sh_consulting_cases', defaults: { subtitle: 'Success Stories', title: 'Client Case Studies', description: undefined } },
        { key: 'sh_consulting_form', defaults: { subtitle: 'Get Started', title: 'Request a Consultation', description: undefined } },
        // Maintenance Page
        { key: 'sh_maint_services', defaults: { subtitle: 'Our Services', title: 'Comprehensive Equipment Care', description: 'Our certified technicians specialize in maintaining and repairing all major coffee equipment brands.' } },
        { key: 'sh_maint_rates', defaults: { subtitle: 'Pricing', title: 'Service Rates', description: undefined } },
        { key: 'sh_maint_form', defaults: { subtitle: 'Get Help', title: 'Request a Service', description: undefined } },
        // Contact Page
        { key: 'sh_contact_info', defaults: { subtitle: 'Reach Out', title: 'Contact Information', description: undefined } },
        // Course detail page
        { key: 'sh_course_related', defaults: { subtitle: 'Explore More', title: 'Related Courses', description: undefined } },
        // Certificate Verification Page
        { key: 'sh_certificate_verify', defaults: { subtitle: 'Verify Credentials', title: 'Certificate Verification', description: 'Instantly verify the authenticity of any BBTA certificate using the unique certificate ID.' } },
        // Why BBTA Page
        { key: 'sh_why_bbta_points', defaults: { subtitle: 'Our Strengths', title: 'Why Choose BBTA?', description: 'Discover what makes Bangladesh Barista Training Academy the premier choice for coffee education.' } },
        { key: 'sh_why_bbta_impact', defaults: { subtitle: 'Our Impact', title: 'Transforming Coffee Careers', description: 'See the real numbers behind our success.' } },
        // Job Placement Page
        { key: 'sh_job_forms', defaults: { subtitle: 'Get Connected', title: 'Hire or Get Hired', description: 'Whether you are looking to hire trained baristas or seeking your next opportunity, we are here to help.' } },
        { key: 'sh_job_listings', defaults: { subtitle: 'Latest Opportunities', title: 'Job Openings', description: 'Browse the latest job opportunities in the coffee industry.' } },
    ];

    const results = await Promise.all(
        keys.map(({ key, defaults }) => getSectionHeader(key, defaults))
    );

    const map: Record<string, { subtitle: string; title: string; description?: string }> = {};
    keys.forEach(({ key }, i) => { map[key] = results[i]; });
    return map;
}
