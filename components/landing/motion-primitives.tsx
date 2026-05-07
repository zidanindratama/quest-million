"use client";

import { Children, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.72, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.16 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.72, ease: easeOut },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Ticker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("flex w-max items-center", className)}
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 28, ease: "linear", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

export function ScanLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ y: "-100%" }}
      animate={{ y: "100%" }}
      transition={{ duration: 6, ease: easeOut, repeat: Infinity, repeatType: "loop" }}
    />
  );
}

export function FireButton({ className, children, ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      className={className}
      animate={{
        boxShadow: [
          "0 0 0 0 oklch(0.68 0.23 33 / 0.38), inset 0 -10px 22px oklch(0.24 0.08 30 / 0.45)",
          "0 0 0 10px oklch(0.68 0.23 33 / 0), inset 0 -6px 18px oklch(0.24 0.08 30 / 0.32)",
          "0 0 0 0 oklch(0.68 0.23 33 / 0.38), inset 0 -10px 22px oklch(0.24 0.08 30 / 0.45)",
        ],
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 2.6, ease: easeOut, repeat: Infinity }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export const MotionDiv = motion.div;
export const MotionArticle = motion.article;
export const MotionA = motion.a;
export const MotionSpan = motion.span;
