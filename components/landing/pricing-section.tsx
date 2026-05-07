import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Stagger } from "@/components/landing/motion-primitives";
import { SectionShell } from "@/components/landing/section-shell";

const plans = [
  {
    name: "Untuk pemain",
    price: "Main",
    copy: "Pengalaman kuis cepat yang terasa tegang, jelas, dan bisa diulang.",
    features: ["Soal bertahap", "Timer", "Skor akhir", "Coba lagi"],
  },
  {
    name: "Untuk belajar",
    price: "Paham",
    copy: "Setiap jawaban menjadi pintu masuk untuk memahami materi.",
    features: ["Pembahasan", "Jawaban benar", "Review salah", "Progress materi"],
    featured: true,
  },
  {
    name: "Untuk keseruan",
    price: "Drama",
    copy: "Nuansa game show membuat pemain lebih betah sampai sesi selesai.",
    features: ["Phone a Friend", "Animasi feedback", "Efek suara", "Menang/kalah"],
  },
];

export function PricingSection() {
  return (
    <SectionShell
      id="pricing"
      eyebrow="Nilai produk"
      title="Kuis yang seru dimainkan dan tetap punya hasil belajar."
      description="QuestMillion dibuat untuk menjaga tiga hal sekaligus: pemain fokus, suasana tegang, dan materi tetap dipahami setelah sesi selesai."
      className="qm-section-alt"
    >
      <Stagger className="mx-auto grid max-w-6xl gap-3 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`rounded-none py-0 text-[var(--qm-fg)] ring-0 transition duration-500 hover:-translate-y-2 ${
              plan.featured
                ? "border-[color:var(--qm-accent-line)] bg-[var(--qm-accent-soft)] shadow-2xl shadow-[var(--qm-shadow)]"
                : "border-[color:var(--qm-line)] bg-[var(--qm-panel)]"
            }`}
          >
            <CardHeader className="p-6">
              <CardTitle className="text-3xl font-black tracking-[-0.07em]">{plan.name}</CardTitle>
              <p className="text-sm leading-7 text-[var(--qm-muted)]">{plan.copy}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 p-6 pt-0">
              <p className="text-5xl font-black tracking-[-0.08em] text-[var(--qm-accent)]">{plan.price}</p>
              <div className="grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-[var(--qm-muted)]">
                    <CheckIcon className="size-4 text-[var(--qm-accent)]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-6">
              <Button asChild className="w-full rounded-none bg-[var(--qm-accent)] text-[var(--qm-accent-contrast)] hover:bg-[var(--qm-accent-bright)]">
                <a href="mailto:sales@questmillion.app">
                  Lihat detail
                  <ArrowRightIcon data-icon="inline-end" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Stagger>
    </SectionShell>
  );
}
