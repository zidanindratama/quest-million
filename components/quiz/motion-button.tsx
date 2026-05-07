"use client";

import { motion } from "framer-motion";

export const easeOut = [0.16, 1, 0.3, 1] as const;

export function MotionButton({ className, children, ...props }: React.ComponentProps<typeof motion.button>) {
  return (
    <motion.button
      className={className}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
