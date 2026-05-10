import { QuizStartPage } from "@/components/quiz/quiz-start-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mulai Quiz",
  description: "Masuk ke sesi quiz edukatif QuestMillion dengan timer, bantuan, dan pembahasan.",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    url: "/quiz",
    title: "Mulai Quiz | QuestMillion",
    description: "Masuk ke sesi quiz edukatif QuestMillion dengan timer, bantuan, dan pembahasan.",
  },
};

export default function QuizPage() {
  return <QuizStartPage />;
}
