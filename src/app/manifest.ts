import type { MetadataRoute } from "next";

/**
 * Web app manifest for PWA support and better mobile experience.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "BBTA - Bangladesh Barista Training Academy",
        short_name: "BBTA",
        description:
            "Bangladesh's premier barista training academy. ISO certified courses in espresso, latte art, roasting, and cafe management.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#c8a97e",
        icons: [
            {
                src: "/icon.webp",
                sizes: "any",
                type: "image/webp",
            },
        ],
    };
}
