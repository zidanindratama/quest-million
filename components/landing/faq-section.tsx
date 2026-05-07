import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/landing/motion-primitives";
import { SectionShell } from "@/components/landing/section-shell";

const faqs = [
  ["Apa bedanya dengan latihan soal biasa?", "QuestMillion memberi timer, progres, bantuan, feedback visual, dan pembahasan, jadi pemain merasa sedang main game sambil belajar."],
  ["Apakah pemain langsung tahu jawaban benar?", "Ya. Setelah memilih atau kehabisan waktu, pemain melihat jawaban benar beserta alasan singkatnya."],
  ["Bagaimana Phone a Friend bekerja?", "Pemain bisa meminta saran sekali dalam satu sesi. Bantuan bisa membantu, bisa juga gagal, jadi keputusan tetap terasa menegangkan."],
  ["Cocok untuk materi apa?", "Cocok untuk pengetahuan umum, sains, sejarah, teknologi, onboarding, atau materi kelas yang bisa dibuat menjadi pilihan ganda."],
];

export function FaqSection() {
  return (
    <SectionShell
      id="faq"
      eyebrow="FAQ"
      title="Pertanyaan umum sebelum memakai QuestMillion."
      description="Jawaban singkat tentang pengalaman pemain, pembahasan jawaban, bantuan, dan jenis materi yang cocok."
      className="qm-section-deep"
    >
      <Reveal className="mx-auto max-w-3xl border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-4">
        <Accordion type="single" collapsible className="gap-2">
          {faqs.map(([question, answer], index) => (
            <AccordionItem key={question} value={`item-${index}`} className="border border-[color:var(--qm-line)] px-4 data-[state=open]:bg-[var(--qm-accent-soft)]">
              <AccordionTrigger className="text-left text-base font-black tracking-[-0.03em] text-[var(--qm-fg-strong)] hover:no-underline">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-[var(--qm-muted)]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </SectionShell>
  );
}
