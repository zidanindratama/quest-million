"use client";

import { ArrowLeftIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { MotionButton } from "@/components/quiz/motion-button";

export function QuizShell({ children, muted, onToggleMute }: { children: ReactNode; muted?: boolean; onToggleMute?: () => void }) {
  return (
    <div className="landing-theme min-h-screen overflow-hidden bg-[var(--qm-bg)] text-[var(--qm-fg)] transition-colors duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,var(--qm-accent-soft),transparent_36%),radial-gradient(circle_at_90%_18%,var(--qm-violet-soft),transparent_30%),linear-gradient(135deg,var(--qm-bg),var(--qm-bg-alt)_52%,var(--qm-bg-deep))]" />
      <div className="qm-grid-bg absolute inset-0 bg-[size:72px_72px] opacity-80 [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-[color:var(--qm-line-strong)] bg-[color-mix(in_oklch,var(--qm-panel-solid)_78%,transparent)] px-3 py-2 shadow-2xl shadow-[var(--qm-shadow)] backdrop-blur-2xl">
          <Link href="/" className="flex cursor-pointer items-center gap-3 text-[var(--qm-fg-strong)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]">
            <span className="grid size-9 place-items-center bg-[var(--qm-accent)] text-sm font-black text-[var(--qm-accent-contrast)]">QM</span>
            <span className="hidden text-xs font-black uppercase tracking-[0.24em] sm:inline">QuestMillion</span>
          </Link>
          <div className="min-w-0 text-center">
            <p className="truncate text-[0.62rem] font-black uppercase tracking-[0.28em] text-[var(--qm-muted)]">quiz control room</p>
          </div>
          <div className="flex items-center gap-2">
            {onToggleMute ? (
              <MotionButton
                type="button"
                onClick={onToggleMute}
                className="grid size-9 cursor-pointer place-items-center border border-[color:var(--qm-line)] bg-[var(--qm-panel)] text-[var(--qm-fg)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]"
                aria-label={muted ? "Unmute audio" : "Mute audio"}
              >
                {muted ? <VolumeXIcon /> : <Volume2Icon />}
              </MotionButton>
            ) : null}
            <Link href="/" className="hidden cursor-pointer items-center gap-2 border border-[color:var(--qm-line)] bg-[var(--qm-panel)] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--qm-fg-strong)] transition-colors duration-200 hover:bg-[var(--qm-accent-soft)] sm:flex">
              <ArrowLeftIcon data-icon="inline-start" />
              Landing
            </Link>
          </div>
        </header>

        <main className="grid flex-1 items-center py-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
