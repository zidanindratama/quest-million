import { Ticker } from "@/components/landing/motion-primitives";

const cues = [
  "kuis siap mulai",
  "jawaban dikunci",
  "timer berjalan",
  "pembahasan tersedia",
  "Phone a Friend aktif",
  "skor naik",
  "game over jelas",
  "coba lagi kapan saja",
];

export function TrustSection() {
  return (
    <section className="border-y border-[color:var(--qm-line)] bg-[var(--qm-bg-deep)] py-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 overflow-hidden px-5 sm:px-8 lg:flex-row lg:items-center">
        <p className="shrink-0 bg-[var(--qm-danger)] px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.24em] text-[var(--qm-danger-contrast)]">
          status kuis
        </p>
        <div className="relative flex-1 overflow-hidden">
          <Ticker className="gap-8">
            {[...cues, ...cues].map((cue, index) => (
              <span key={`${cue}-${index}`} className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--qm-muted)] transition duration-300 hover:text-[var(--qm-accent)]">
                {cue}
              </span>
            ))}
          </Ticker>
        </div>
      </div>
    </section>
  );
}
