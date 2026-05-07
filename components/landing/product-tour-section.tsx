import { SectionShell } from "@/components/landing/section-shell";
import { Reveal, Stagger } from "@/components/landing/motion-primitives";

const stages = [
  { title: "Mulai permainan", copy: "Pemain masuk ke sesi kuis yang langsung terasa seperti game, bukan lembar soal digital." },
  { title: "Jawab di bawah timer", copy: "Empat opsi besar, tekanan waktu, dan bantuan telepon membuat tiap soal punya momen." },
  { title: "Belajar dari jawaban", copy: "Setelah memilih, pemain melihat pembahasan yang menjelaskan kenapa jawaban itu benar." },
];

export function ProductTourSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Alur kuis"
      title="Dari tombol mulai sampai hasil akhir, alurnya dibuat seperti permainan."
      description="Pemain merasakan progres, tekanan waktu, bantuan dramatis, dan momen menang atau kalah tanpa kehilangan tujuan belajar."
    >
      <div className="mx-auto grid max-w-6xl items-stretch gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Stagger className="grid h-full auto-rows-fr gap-3 [&>div>article]:h-full [&>div]:h-full">
          {stages.map((stage, index) => (
            <article key={stage.title} className="group grid grid-cols-[4.5rem_1fr] border border-[color:var(--qm-line)] bg-[var(--qm-panel)] transition duration-500 hover:translate-x-2 hover:border-[color:var(--qm-accent-line)] hover:bg-[var(--qm-accent-soft)]">
              <span className="grid place-items-center border-r border-[color:var(--qm-line)] text-2xl font-black tracking-[-0.08em] text-[var(--qm-accent)] transition duration-500 group-hover:bg-[var(--qm-accent)] group-hover:text-[var(--qm-accent-contrast)]">
                {index + 1}
              </span>
              <div className="p-5">
                <h3 className="text-2xl font-black tracking-[-0.055em] text-[var(--qm-fg-strong)]">{stage.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--qm-muted)]">{stage.copy}</p>
              </div>
            </article>
          ))}
        </Stagger>
        <Reveal className="relative h-full border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel-deep)] p-4 shadow-2xl shadow-[var(--qm-shadow)]" delay={0.12}>
          <div className="qm-hero-surface grid h-full grid-rows-[auto_1fr] gap-4 p-5">
            <div className="grid grid-cols-[1fr_auto] items-start gap-4 border-b border-[color:var(--qm-line)] pb-4">
              <div>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-[var(--qm-accent)]">layar kuis</p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.07em]">Soal 04 sedang berjalan</h3>
              </div>
              <span className="bg-[var(--qm-danger)] px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[var(--qm-danger-contrast)]">18s</span>
            </div>
            <div className="grid min-h-0 gap-4 md:grid-cols-[1.25fr_0.75fr]">
              <div className="h-full border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-5">
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--qm-accent)]">opsi jawaban</p>
                <div className="mt-6 grid gap-3">
                  {[78, 12, 7, 3].map((value, index) => (
                    <div key={value} className="group/bar grid grid-cols-[2rem_1fr_3rem] items-center gap-3">
                      <span className="font-black text-[var(--qm-muted)]">{String.fromCharCode(65 + index)}</span>
                      <span className="h-5 overflow-hidden bg-[var(--qm-panel-deep)]">
                        <span
                          className="block h-full bg-[var(--qm-accent)] transition-[width,filter] duration-700 group-hover/bar:brightness-125"
                          style={{ width: `${value}%` }}
                        />
                      </span>
                      <span className="text-right text-sm font-black text-[var(--qm-accent)]">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid h-full auto-rows-fr gap-4">
                {['Phone a Friend', 'Pembahasan', 'Animasi bantuan'].map((item) => (
                  <div key={item} className="h-full border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-4 transition duration-300 hover:-translate-y-1 hover:bg-[var(--qm-accent-soft)]">
                    <p className="text-sm font-bold text-[var(--qm-fg-strong)]">{item}</p>
                    <p className="mt-2 text-xs leading-6 text-[var(--qm-muted-2)]">Membuat sesi terasa hidup tanpa mengganggu pemain membaca soal.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
