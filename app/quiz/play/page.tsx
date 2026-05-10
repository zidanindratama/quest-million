import { QuizPlayPage } from "@/components/quiz/quiz-play-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Berjalan",
  description: "Mainkan sesi quiz QuestMillion dengan timer, pembahasan, dan Phone a Friend.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlayPage() {
  return <QuizPlayPage />;
}
