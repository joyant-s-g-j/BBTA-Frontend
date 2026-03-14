import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_DESCRIPTION } from "@/lib/constants";

interface OrganizationSchemaProps {
    logo?: string;
    description?: string;
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
        linkedin?: string;
        twitter?: string;
    };
}

/**
 * Organization JSON-LD for rich snippets in search results.
 */
export function OrganizationSchema({ logo, description, socialLinks }: OrganizationSchemaProps) {
    const sameAs = Object.values(socialLinks || {}).filter(Boolean);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: logo || DEFAULT_OG_IMAGE,
        description: description || DEFAULT_DESCRIPTION,
        address: {
            "@type": "PostalAddress",
            addressCountry: "BD",
            addressLocality: "Dhaka",
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface WebSiteSchemaProps {
    name?: string;
}

/**
 * WebSite JSON-LD for sitelinks search box in Google.
 */
export function WebSiteSchema({ name }: WebSiteSchemaProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: name || SITE_NAME,
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/bbta-courses?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface BreadcrumbSchemaProps {
    items: Array<{ name: string; href?: string }>;
}

/**
 * BreadcrumbList JSON-LD for breadcrumb rich snippets.
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            ...(item.href ? { item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}` } : {}),
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface CourseSchemaProps {
    name: string;
    description: string;
    image?: string;
    price?: string;
    duration?: string;
    level?: string;
    url: string;
}

/**
 * Course JSON-LD for course rich snippets.
 */
export function CourseSchema({ name, description, image, price, duration, level, url }: CourseSchemaProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        name,
        description,
        provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        ...(image ? { image } : {}),
        ...(duration ? { timeRequired: duration } : {}),
        ...(level ? { educationalLevel: level } : {}),
        url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
        ...(price
            ? {
                offers: {
                    "@type": "Offer",
                    price: String(price).replace(/[^0-9.]/g, ""),
                    priceCurrency: "BDT",
                    availability: "https://schema.org/InStock",
                },
            }
            : {}),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface FAQSchemaProps {
    items: Array<{ question: string; answer: string }>;
}

/**
 * FAQPage JSON-LD for FAQ rich snippets in search results.
 */
export function FAQSchema({ items }: FAQSchemaProps) {
    if (!items || items.length === 0) return null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
