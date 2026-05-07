import { SectionShell } from "@/components/landing/section-shell";
import { Reveal, Stagger } from "@/components/landing/motion-primitives";

const quotes = [
  ["Biasanya latihan soal terasa kering. Format ini bikin pemain penasaran lanjut ke soal berikutnya.", "Rania", "Fasilitator kelas"],
  ["Pembahasan setelah jawab bikin diskusi lebih enak karena semua orang tahu konteksnya.", "Bagas", "Mentor belajar"],
  ["Phone a Friend memberi momen lucu sekaligus tegang. Anak-anak jadi lebih fokus.", "Maya", "Komunitas belajar"],
];

export function TestimonialsSection() {
  return (
    <SectionShell
      eyebrow="Kenapa ini bagus"
      title="Pemain bertahan karena seru, lalu pulang dengan pemahaman baru."
      description="Kuis memberi tekanan dan reward. Pembahasan memastikan momen seru itu berubah jadi pengetahuan yang menempel."
    >
      <div className="mx-auto grid max-w-6xl auto-rows-fr items-stretch gap-3 md:grid-cols-2 lg:grid-cols-5">
        <Reveal className="flex h-full min-h-56 flex-col justify-between bg-[var(--qm-accent)] p-6 text-[var(--qm-accent-contrast)] sm:p-7 lg:col-span-2 lg:p-8">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.26em] opacity-75">learning loop</p>
          <p className="mt-5 text-3xl font-black leading-[1.04] tracking-[-0.065em] sm:text-4xl lg:text-5xl">
            “Seru dulu, paham setelahnya.”
          </p>
          <footer className="mt-6 max-w-sm text-sm font-bold leading-7 opacity-80">
            Setiap jawaban punya momen: tegang saat memilih, jelas saat pembahasan muncul.
          </footer>
        </Reveal>
        <Stagger className="grid h-full gap-3 md:grid-cols-3 lg:col-span-3 [&>div>article]:h-full [&>div]:h-full" delay={0.12}>
          {quotes.map(([quote, name, role]) => (
            <article key={name} className="flex min-h-56 flex-col justify-between border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-5 transition duration-300 hover:-translate-y-1 hover:bg-[var(--qm-accent-soft)]">
              <p className="text-sm leading-7 text-[var(--qm-muted)]">“{quote}”</p>
              <p className="mt-6 text-sm font-black text-[var(--qm-fg-strong)]">{name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--qm-muted-2)]">{role}</p>
            </article>
          ))}
        </Stagger>
      </div>
    </SectionShell>
  );
}
