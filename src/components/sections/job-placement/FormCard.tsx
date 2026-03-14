import { motion } from "motion/react";
import * as React from "react";

interface FormCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function FormCard({ title, description, children }: FormCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-xl"
    >
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}
