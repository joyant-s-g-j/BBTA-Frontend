"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Advantage {
    title: string;
    description: string;
    icon?: string;
}

const defaultAdvantages: Advantage[] = [];

export function AdvantagesGrid({ initialAdvantages }: { initialAdvantages?: Advantage[] }) {
    const [advantages, setAdvantages] = useState<Advantage[]>(initialAdvantages || defaultAdvantages);

    useEffect(() => {
        if (!initialAdvantages) {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bbta-backend.onrender.com/api';
            fetch(`${API_URL}/settings/upcoming_advantages`, { next: { revalidate: 60 } } as any)
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data?.items && data.items.length > 0) {
                        setAdvantages(data.items);
                    }
                })
                .catch(() => { /* keep defaults */ });
        }
    }, [initialAdvantages]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, index) => (
                <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-2xl bg-muted/50 border border-border"
                >
                    <h3 className="text-xl font-bold mb-4 italic">{adv.title}</h3>
                    <p className="text-muted-foreground">{adv.description}</p>
                </motion.div>
            ))}
        </div>
    );
}
