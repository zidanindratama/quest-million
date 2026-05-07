import { SectionShell } from "@/components/landing/section-shell";
import { Reveal, Stagger } from "@/components/landing/motion-primitives";

const insights = [
  ["skor", "7/10", "Pemain tahu bagian mana yang sudah kuat dan mana yang perlu diulang."],
  ["paham", "tiap soal", "Setiap jawaban diikuti alasan singkat, jadi kuis tetap terasa belajar."],
  ["tegang", "timer", "Batas waktu bikin permainan hidup tanpa menghilangkan fokus ke materi."],
];

const progressBars = [
  48, 62, 57, 70, 76, 66, 82, 73, 88, 79,
].map((height, index) => ({
  height,
  label: `Q${index + 1}`,
}));

export function AnalyticsSection() {
  return (
      <SectionShell
        eyebrow="Laporan"
        title="Setelah sesi selesai, pemain tahu apa yang sudah berjalan baik."
        description="Lihat skor, soal yang paling menantang, pola jawaban, dan bagian materi yang perlu diulang sebelum bermain lagi."
    >
      <div className="mx-auto grid max-w-6xl items-stretch gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Stagger className="grid gap-4">
          {insights.map(([label, value, copy]) => (
            <article key={label} className="border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-5 transition duration-300 hover:-translate-y-1 hover:bg-[var(--qm-accent-soft)]">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-[var(--qm-muted-2)]">{label}</p>
              <h3 className="mt-2 text-4xl font-black tracking-[-0.08em] text-[var(--qm-accent)]">{value}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--qm-muted)]">{copy}</p>
            </article>
          ))}
        </Stagger>
        <Reveal className="h-full border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel-solid)] p-5" delay={0.12}>
          <div className="flex h-full min-h-[28rem] items-stretch gap-3 bg-[var(--qm-panel-deep)] p-5">
            {progressBars.map((bar) => (
              <div key={bar.label} className="group flex min-h-0 flex-1 flex-col items-center gap-3">
                <div className="flex min-h-0 w-full flex-1 items-end bg-[var(--qm-panel)] p-1">
                  <div
                    className="w-full border border-[color:var(--qm-accent-line)] bg-[var(--qm-accent)] transition-[height,filter] duration-700 group-hover:brightness-110"
                    style={{ height: `${bar.height}%` }}
                  />
                </div>
                <span className="text-[0.65rem] font-bold text-[var(--qm-muted-2)]">{bar.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
