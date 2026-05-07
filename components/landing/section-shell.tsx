import type { ReactNode } from "react";

import { Reveal } from "@/components/landing/motion-primitives";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  headerClassName,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("relative px-5 py-20 sm:px-8 lg:py-28", className)}>
      {(eyebrow || title || description) && (
        <Reveal
          className={cn(
            "mx-auto mb-10 grid max-w-6xl gap-5 lg:mb-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-end",
            headerClassName
          )}
        >
          <div className="flex flex-col items-start gap-4">
            {eyebrow ? (
              <p className="border-y border-[color:var(--qm-accent-line)] py-2 text-[0.7rem] font-black uppercase tracking-[0.34em] text-[var(--qm-accent)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="max-w-5xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.075em] text-[var(--qm-fg-strong)] sm:text-6xl">
                {title}
              </h2>
            ) : null}
          </div>
          {description ? (
            <p className="max-w-2xl text-pretty text-base leading-8 text-[var(--qm-muted)] sm:text-lg lg:justify-self-end">
              {description}
            </p>
          ) : null}
        </Reveal>
      )}
      {children}
    </section>
  );
}
