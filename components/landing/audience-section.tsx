import { SectionShell } from "@/components/landing/section-shell";
import { Stagger } from "@/components/landing/motion-primitives";

const audiences = [
  ["Belajar mandiri", "Pemain berlatih lewat game singkat, lalu tahu alasan di balik jawaban yang benar."],
  ["Kelas interaktif", "Guru bisa membuka diskusi dari soal yang salah, bukan hanya memberi nilai akhir."],
  ["Pelatihan internal", "Materi onboarding atau product knowledge terasa lebih ringan karena dibungkus kuis."],
  ["Komunitas belajar", "Sesi kuis bisa jadi tantangan harian yang seru, cepat dimainkan, dan mudah diulang."],
];

export function AudienceSection() {
  return (
    <SectionShell
      eyebrow="Cocok untuk"
      title="Untuk belajar yang butuh rasa game, bukan form latihan biasa."
      description="Pakai QuestMillion saat pertanyaan harus menantang, jawaban harus dijelaskan, dan sesi harus terasa punya tekanan waktu."
      className="qm-section-alt"
    >
      <Stagger className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2">
        {audiences.map(([title, copy], index) => (
          <article
            key={title}
            className="group grid min-h-52 grid-cols-[5rem_1fr] border border-[color:var(--qm-line)] bg-[linear-gradient(135deg,var(--qm-panel),color-mix(in_oklch,var(--qm-panel)_40%,transparent))] transition duration-500 hover:-translate-y-1 hover:border-[color:var(--qm-accent-line)]"
          >
            <span className="grid place-items-center border-r border-[color:var(--qm-line)] text-4xl font-black tracking-[-0.09em] text-[color-mix(in_oklch,var(--qm-accent)_56%,transparent)] transition duration-500 group-hover:bg-[var(--qm-accent)] group-hover:text-[var(--qm-accent-contrast)]">0{index + 1}</span>
            <div className="p-6">
              <h3 className="text-3xl font-black tracking-[-0.07em] text-[var(--qm-fg-strong)]">{title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--qm-muted)]">{copy}</p>
            </div>
          </article>
        ))}
      </Stagger>
    </SectionShell>
  );
}
