import { SectionShell } from "@/components/landing/section-shell";
import { Stagger } from "@/components/landing/motion-primitives";

const features = [
  ["Mode kuis bertahap", "Pemain maju dari satu soal ke soal berikutnya dengan rasa progres yang jelas."],
  ["Pilihan A/B/C/D", "Opsi jawaban besar dan mudah ditekan, enak dipakai di laptop maupun layar HP."],
  ["Timer tegang", "Countdown memberi tekanan seperti game show dan membuat pemain fokus mengambil keputusan."],
  ["Phone a Friend", "Bantuan telepon memberi momen dramatis saat pemain ragu memilih jawaban."],
  ["Pembahasan jawaban", "Setelah menjawab, pemain langsung tahu alasan benar atau salahnya pilihan mereka."],
  ["Hasil menang kalah", "Akhir sesi terasa tuntas: pemain bisa menang, gagal, melihat skor, lalu mencoba lagi."],
];

export function FeatureSystemSection() {
  return (
    <SectionShell
      id="features"
      eyebrow="Fitur utama"
      title="Semua yang bikin kuis terasa seru sekaligus tetap edukatif."
      description="QuestMillion bukan hanya cek benar salah. Tiap fitur dibuat untuk menjaga tensi permainan dan membantu pemain memahami materi."
    >
      <div className="mx-auto max-w-6xl border border-[color:var(--qm-line-strong)] bg-[var(--qm-bg-deep)] p-3">
        <Stagger className="grid gap-px bg-[var(--qm-line)] md:grid-cols-2 lg:grid-cols-3" step={0.06}>
          {features.map(([title, copy], index) => (
            <article key={title} className="group min-h-64 bg-[var(--qm-panel-solid)] p-5 transition duration-500 hover:bg-[var(--qm-panel-deep)]">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="flex items-center justify-between">
                  <span className="text-[0.68rem] font-black uppercase tracking-[0.26em] text-[var(--qm-muted-2)]">fitur {index + 1}</span>
                  <span className="h-3 w-10 bg-[var(--qm-danger)] opacity-50 transition duration-300 group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="text-4xl font-black tracking-[-0.08em] text-[var(--qm-fg-strong)]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--qm-muted)]">{copy}</p>
                </div>
              </div>
            </article>
          ))}
        </Stagger>
      </div>
    </SectionShell>
  );
}
