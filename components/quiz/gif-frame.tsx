"use client";

import { SparklesIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function GifFrame({ label, src, tone }: { label: string; src: string; tone: "gold" | "danger" | "violet" }) {
  const [failed, setFailed] = useState(false);
  const toneClass = {
    gold: "from-[var(--qm-accent-soft)] to-transparent text-[var(--qm-accent)]",
    danger: "from-[color-mix(in_oklch,var(--qm-danger)_20%,transparent)] to-transparent text-[var(--qm-danger)]",
    violet: "from-[var(--qm-violet-soft)] to-transparent text-[var(--qm-violet)]",
  }[tone];

  return (
    <div className="relative min-h-48 overflow-hidden border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel-deep)]">
      {!failed ? (
        <Image src={src} alt={label} fill unoptimized className="object-cover" onError={() => setFailed(true)} />
      ) : null}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--tw-gradient-from),var(--tw-gradient-to)_58%)] ${toneClass}`} />
      <div className="qm-grid-bg absolute inset-0 bg-[size:36px_36px] opacity-50" />
      <div className="relative z-10 grid min-h-48 place-items-center p-6 text-center">
        <div>
          <div className="mx-auto grid size-16 place-items-center border border-current bg-[var(--qm-panel)]">
            <SparklesIcon />
          </div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.28em]">{label}</p>
          <p className="mt-2 text-sm text-[var(--qm-muted)]">Placeholder GIF. Nanti tinggal taruh asset di path yang sama.</p>
        </div>
      </div>
    </div>
  );
}
