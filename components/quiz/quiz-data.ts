import type { OptionKey, PlayerProfile, QuizQuestion, QuizSession } from "@/components/quiz/types";

export const profileKey = "questmillion.player.v1";
export const sessionKey = "questmillion.session.v1";
export const timeLimit = 30;
export const sessionQuestionCount = 10;
export const maxPhoneUses = 3;
export const optionKeys: OptionKey[] = ["A", "B", "C", "D"];

const questionFiles = [
  "/data/questions-part-1.csv",
  "/data/questions-part-2.csv",
  "/data/questions-part-3.csv",
  "/data/questions-part-4.csv",
];

type OptionTextField = "option_a" | "option_b" | "option_c" | "option_d";

const optionFieldMap: Record<OptionKey, OptionTextField> = {
  A: "option_a",
  B: "option_b",
  C: "option_c",
  D: "option_d",
};

const sampleQuestions: QuizQuestion[] = [
  {
    id: "sample-1",
    category: "Pengetahuan Umum",
    difficulty: "mudah",
    question: "Apa ibu kota Indonesia?",
    option_a: "Jakarta",
    option_b: "Bandung",
    option_c: "Surabaya",
    option_d: "Medan",
    correct_option: "A",
    explanation: "Jakarta adalah ibu kota negara Indonesia dan pusat pemerintahan nasional.",
    image: "",
  },
  {
    id: "sample-2",
    category: "Sains",
    difficulty: "mudah",
    question: "Planet apa yang dikenal sebagai planet merah?",
    option_a: "Venus",
    option_b: "Mars",
    option_c: "Jupiter",
    option_d: "Merkurius",
    correct_option: "B",
    explanation: "Mars tampak kemerahan karena permukaannya kaya oksida besi atau karat.",
    image: "",
  },
];

export function getOptionText(question: QuizQuestion, key: OptionKey) {
  return question[optionFieldMap[key]];
}

export function safeJsonParse<T>(value: string | null) {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function emptyProfile(): PlayerProfile {
  return { name: "", group: "", goal: "" };
}

export function playSound(path: string, muted: boolean) {
  if (muted) return;
  const audio = new Audio(path);
  audio.volume = 0.55;
  void audio.play().catch(() => undefined);
}

export async function loadQuestions() {
  try {
    const chunks = await Promise.all(
      questionFiles.map(async (file) => {
        const response = await fetch(file);
        if (!response.ok) throw new Error(file);
        return response.text();
      })
    );
    const parsed = chunks.flatMap((chunk) => rowsToQuestions(parseCsv(chunk)));
    return { questions: parsed.length ? parsed : sampleQuestions, error: "" };
  } catch {
    return {
      questions: sampleQuestions,
      error: "Bank soal belum bisa dibaca. Sementara sistem memakai beberapa soal contoh agar flow tetap bisa dicoba.",
    };
  }
}

export function createSession(questions: QuizQuestion[], muted = false): QuizSession {
  const sessionQuestions = shuffle(questions)
    .slice(0, Math.min(sessionQuestionCount, questions.length))
    .map((question) => shuffleQuestionOptions(question));

  return {
    questions: sessionQuestions,
    currentIndex: 0,
    selectedOption: null,
    answerState: null,
    phase: "playing",
    timeLeft: timeLimit,
    phoneUsesLeft: maxPhoneUses,
    phoneState: null,
    phoneSuggestion: null,
    muted,
    startedAt: Date.now(),
  };
}

function shuffleQuestionOptions(question: QuizQuestion): QuizQuestion {
  const shuffledOptions = shuffle(optionKeys.map((key) => ({ key, text: getOptionText(question, key) })));
  const nextQuestion = { ...question };

  shuffledOptions.forEach((option, index) => {
    const nextKey = optionKeys[index];
    nextQuestion[optionFieldMap[nextKey]] = option.text;
    if (option.key === question.correct_option) nextQuestion.correct_option = nextKey;
  });

  return nextQuestion;
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);

  return rows;
}

function rowsToQuestions(rows: string[][]) {
  const [header, ...items] = rows;
  if (!header) return [];

  return items
    .map((row) => Object.fromEntries(header.map((column, index) => [column, row[index] ?? ""])))
    .filter((item) => optionKeys.includes(item.correct_option as OptionKey))
    .map((item): QuizQuestion => ({
      id: item.id,
      category: item.category || "Umum",
      difficulty: item.difficulty || "campuran",
      question: item.question,
      option_a: item.option_a,
      option_b: item.option_b,
      option_c: item.option_c,
      option_d: item.option_d,
      correct_option: item.correct_option as OptionKey,
      explanation: item.explanation || "Pembahasan belum tersedia untuk soal ini.",
      image: item.image || "",
    }))
    .filter((question) => question.id && question.question && question.option_a && question.option_b && question.option_c && question.option_d);
}

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next;
}
