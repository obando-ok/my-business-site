"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";

export default function DailyQuote() {
  const quote = "Man cannot remake himself without suffering, for he is both the marble and the sculptor.";
  const author = "Alexis Carrel";

  return (
    <SectionWrapper id="daily-quote" className="bg-accent">
      <div className="max-w-3xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl italic text-foreground"
        >
          “{quote}”
        </motion.blockquote>
        <p className="mt-4 text-sm text-muted-foreground">— {author}</p>
      </div>
    </SectionWrapper>
  );
}
