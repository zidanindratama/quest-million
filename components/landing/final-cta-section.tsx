import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/motion-primitives";

export function FinalCtaSection() {
  return (
    <section className="relative isolate px-5 py-20 sm:px-8 lg:py-28">
      <div className="absolute inset-x-5 top-8 -z-10 mx-auto h-72 max-w-5xl bg-[var(--qm-accent-soft)] blur-3xl" />
      <Reveal className="mx-auto grid max-w-6xl gap-8 border border-[color:var(--qm-accent-line)] bg-[radial-gradient(circle_at_20%_10%,var(--qm-accent-soft),transparent_34%),linear-gradient(135deg,var(--qm-panel-solid),var(--qm-bg-deep))] p-8 shadow-2xl shadow-[var(--qm-shadow)] sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end lg:p-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--qm-accent)]">siap main?</p>
          <h2 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.08em] text-[var(--qm-fg-strong)] sm:text-7xl">
            Ubah latihan soal jadi permainan yang bikin orang mau lanjut.
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-[var(--qm-muted)] sm:text-lg">
            QuestMillion memberi tensi game show, bantuan dramatis, dan pembahasan yang membuat setiap jawaban punya nilai belajar.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:w-56">
          <Button asChild size="lg" className="h-12 rounded-none bg-[var(--qm-danger)] px-5 text-[var(--qm-danger-contrast)] hover:bg-[var(--qm-danger-bright)]">
            <a href="/quiz">
              Mulai sekarang
              <ArrowRightIcon data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-none border-[color:var(--qm-line-strong)] bg-[var(--qm-panel)] px-5 text-[var(--qm-fg-strong)] hover:bg-[var(--qm-accent-soft)]">
            <a href="#experience">Lihat alur kuis</a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
