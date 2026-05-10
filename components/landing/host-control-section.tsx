import { SectionShell } from "@/components/landing/section-shell";
import { Reveal, Stagger } from "@/components/landing/motion-primitives";

const controls = [
  ["Sekali pakai", "Bantuan terasa berharga karena pemain tidak bisa memakainya di setiap soal."],
  ["Bisa gagal", "Teman virtual tidak selalu membantu, jadi keputusan tetap punya risiko."],
  ["Pemain tetap memilih", "Saran hanya memberi arah. Jawaban akhir tetap ada di tangan pemain."],
];

export function HostControlSection() {
  return (
    <SectionShell
      eyebrow="Phone a Friend"
      title="Saat ragu, pemain bisa menelepon teman virtual."
      description="Bantuan ini dibuat sebagai momen permainan: ada jeda, ada ketegangan, ada kemungkinan sukses, dan pemain tetap harus mengambil keputusan sendiri."
      className="qm-section-deep overflow-hidden"
    >
      <div id="console" className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="border border-[color:var(--qm-line-strong)] bg-[var(--qm-bg-deep)] p-3">
          <div className="grid gap-3 bg-[var(--qm-panel-solid)] p-4 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="border border-[color:var(--qm-accent-line)] bg-[var(--qm-accent-soft)] p-5">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.32em] text-[var(--qm-accent)]">teman virtual</p>
                <p className="mt-3 text-4xl font-black leading-[0.95] tracking-[-0.08em] sm:text-6xl">Teman virtual bisa membantu, tapi tidak selalu memberi petunjuk.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:w-44">
                {['Q04', '18s', 'CALL', '50%'].map((item) => (
                  <span key={item} className="grid h-20 place-items-center border border-[color:var(--qm-line)] bg-[var(--qm-panel)] text-lg font-black tracking-[-0.05em] text-[var(--qm-accent)]">{item}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {['Pakai bantuan', 'Menelepon', 'Dapat saran', 'Pilih sendiri'].map((action, index) => (
                <button key={action} className={`${index === 3 ? "bg-[var(--qm-danger)] text-[var(--qm-danger-contrast)]" : "bg-[var(--qm-panel)] text-[var(--qm-fg-strong)]"} border border-[color:var(--qm-line)] px-4 py-5 text-sm font-black uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-1 hover:bg-[var(--qm-accent)] hover:text-[var(--qm-accent-contrast)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_42%,transparent)]`}>
                  {action}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <Stagger className="flex flex-col justify-center gap-4" delay={0.12}>
          {controls.map(([title, copy]) => (
            <div key={title} className="border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-5 transition duration-300 hover:translate-x-1 hover:bg-[var(--qm-accent-soft)]">
              <h3 className="text-2xl font-black tracking-[-0.06em]">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--qm-muted)]">{copy}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </SectionShell>
  );
}
