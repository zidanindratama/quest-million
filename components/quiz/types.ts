export type OptionKey = "A" | "B" | "C" | "D";
export type GamePhase = "playing" | "explanation" | "phone" | "won" | "lost";
export type AnswerState = "correct" | "wrong" | "timeout" | null;
export type PhoneState = "calling" | "success" | "fail";

export type PlayerProfile = {
  name: string;
  group: string;
  goal: string;
};

export type QuizQuestion = {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: OptionKey;
  explanation: string;
  image: string;
};

export type QuizSession = {
  questions: QuizQuestion[];
  currentIndex: number;
  selectedOption: OptionKey | null;
  answerState: AnswerState;
  phase: GamePhase;
  timeLeft: number;
  phoneUsesLeft: number;
  phoneState: PhoneState | null;
  phoneSuggestion: OptionKey | null;
  muted: boolean;
  startedAt: number;
};
