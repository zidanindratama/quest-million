import { Button } from "@/components/ui/button";
import { FireButton, Reveal, ScanLine } from "@/components/landing/motion-primitives";

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:pb-24 lg:pt-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,var(--qm-accent-soft),transparent_38%),radial-gradient(circle_at_8%_26%,color-mix(in_oklch,var(--qm-danger)_22%,transparent),transparent_34%),linear-gradient(135deg,var(--qm-bg),var(--qm-bg-alt)_48%,var(--qm-bg))]" />
      <div className="qm-grid-bg absolute inset-0 -z-10 bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.22fr_0.78fr] lg:items-end">
        <Reveal className="flex flex-col items-start gap-7">
            <p className="border-y border-[color:var(--qm-accent-line)] py-2 text-[0.68rem] font-black uppercase tracking-[0.36em] text-[var(--qm-accent)]">
            Kuis edukatif rasa game show
          </p>
          <div className="flex flex-col gap-5">
              <h1 className="max-w-6xl text-balance text-6xl font-black leading-[0.82] tracking-[-0.09em] text-[var(--qm-fg-strong)] sm:text-8xl lg:text-9xl">
              Bikin belajar terasa seperti kuis jutaan, bukan latihan biasa.
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-[var(--qm-muted)] sm:text-xl">
              QuestMillion menggabungkan soal pilihan ganda, timer, bantuan Phone a Friend, feedback dramatis, dan pembahasan singkat supaya pemain bukan cuma menebak, tapi paham jawaban.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-none bg-[var(--qm-danger)] px-6 text-[var(--qm-danger-contrast)] hover:bg-[var(--qm-danger-bright)]">
              <a href="/quiz">Mulai quiz</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-none border-[color:var(--qm-accent-line)] bg-[var(--qm-accent-soft)] px-6 text-[var(--qm-accent)] hover:bg-[var(--qm-accent-soft)]">
              <a href="#experience">Lihat alur kuis</a>
            </Button>
          </div>
        </Reveal>
        <Reveal className="relative" delay={0.12}>
          <div className="relative mx-auto max-w-xl border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel-deep)] p-3 shadow-2xl shadow-[var(--qm-shadow)]">
            <div className="qm-hero-surface relative overflow-hidden border border-[color:var(--qm-accent-line)] p-5">
              <ScanLine className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,transparent,var(--qm-accent-soft),transparent)]" />
              <div className="grid grid-cols-[1fr_auto] gap-5">
                <div>
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.32em] text-[var(--qm-accent)]">Pertanyaan 12</p>
                  <h2 className="mt-4 text-balance text-3xl font-black leading-[0.96] tracking-[-0.07em] sm:text-5xl">
                    Apa ibu kota Indonesia?
                  </h2>
                </div>
                <div className="hidden w-24 border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-2 sm:block">
                  {["100M", "50M", "25M", "10M", "5M"].map((prize, index) => (
                    <div key={prize} className={`px-2 py-1 text-right text-xs font-black ${index === 0 ? "bg-[var(--qm-accent)] text-[var(--qm-accent-contrast)]" : "text-[var(--qm-muted-2)]"}`}>
                      {prize}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {['Jakarta', 'Bandung', 'Surabaya', 'Medan'].map((answer, index) => (
                  <button key={answer} className="group/answer grid grid-cols-[2.5rem_1fr] items-center border border-[color:var(--qm-line)] bg-[var(--qm-panel)] text-left transition duration-300 hover:-translate-y-1 hover:border-[color:var(--qm-accent-line)] hover:bg-[var(--qm-accent-soft)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_42%,transparent)]">
                    <span className="grid h-12 place-items-center border-r border-[color:var(--qm-line)] text-xs font-black text-[var(--qm-accent)] group-hover/answer:bg-[var(--qm-accent)] group-hover/answer:text-[var(--qm-accent-contrast)]">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="px-3 text-sm font-black text-[var(--qm-fg-strong)]">{answer}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-4 border-t border-[color:var(--qm-line)] pt-5">
                <div>
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-[var(--qm-muted-2)]">setelah menjawab</p>
                  <p className="mt-1 text-sm text-[var(--qm-muted)]">Pembahasan muncul agar pemain tahu alasan jawaban benar.</p>
                </div>
                <FireButton className="grid size-20 place-items-center rounded-full bg-[var(--qm-danger)] text-xs font-black uppercase tracking-[0.16em] text-[var(--qm-danger-contrast)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-danger)_45%,transparent)]">
                  Jawab
                </FireButton>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 left-8 hidden bg-[var(--qm-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[var(--qm-accent-contrast)] sm:block">
            timer 00:12
          </div>
        </Reveal>
      </div>
    </section>
  );
}
