"use client";

import { motion } from "motion/react";

export function AdvantagesGrid() {
    const advantages = [
        {
            title: "Small Batch Size",
            description: "We limit our batches to 6-8 students maximum to ensure personalized attention and ample machine time for everyone."
        },
        {
            title: "Expert Mentorship",
            description: "Learn from industry veterans who have worked in world-class cafes and won national barista championships."
        },
        {
            title: "Job Placement",
            description: "98% of our professional course graduates find placement in reputed cafes and hotels across the country."
        }
    ];

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
