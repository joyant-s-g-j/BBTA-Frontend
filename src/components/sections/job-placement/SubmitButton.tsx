import { Send } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  loading: boolean;
  idleText: string;
}

export function SubmitButton({ loading, idleText }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={loading}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-hover font-semibold"
    >
      {loading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="mr-2"
          >
            <Send className="h-5 w-5" />
          </motion.div>
          Submitting...
        </>
      ) : (
        <>
          <Send className="mr-2 h-5 w-5" />
          {idleText}
        </>
      )}
    </Button>
  );
}
