"use client";

import { CheckIcon, Clock3Icon, EraserIcon, LockIcon, PhoneCallIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";

import { MotionButton, easeOut } from "@/components/quiz/motion-button";
import { getOptionText, maxPhoneUses, optionKeys, timeLimit } from "@/components/quiz/quiz-data";
import type { OptionKey, PlayerProfile, QuizQuestion, QuizSession } from "@/components/quiz/types";

export function QuizBoard({
  session,
  profile,
  question,
  onAnswer,
  onPhone,
  onClearData,
}: {
  session: QuizSession;
  profile: PlayerProfile;
  question: QuizQuestion;
  onAnswer: (option: OptionKey) => void;
  onPhone: () => void;
  onClearData: () => void;
}) {
  const progress = ((session.currentIndex + 1) / session.questions.length) * 100;
  const isTerminal = session.phase === "won" || session.phase === "lost";

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.58, ease: easeOut }}
      className="grid gap-5 lg:grid-cols-[1fr_16rem] lg:items-start"
    >
      <div className="overflow-hidden border border-[color:var(--qm-line-strong)] bg-[color-mix(in_oklch,var(--qm-panel-solid)_82%,transparent)] shadow-2xl shadow-[var(--qm-shadow)] backdrop-blur-2xl">
        <div className="grid gap-4 border-b border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-[0.64rem] font-black uppercase tracking-[0.28em] text-[var(--qm-accent)]">
              Soal {session.currentIndex + 1} / {session.questions.length}
            </p>
            <p className="mt-1 text-sm font-bold text-[var(--qm-muted)]">
              {question.category} · {question.difficulty} · {profile.name || "Pemain"}
            </p>
          </div>
          <TimerPanel timeLeft={session.timeLeft} />
        </div>

        <div className="relative p-5 sm:p-7 lg:p-9">
          <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,var(--qm-accent-soft),transparent)]" animate={{ opacity: session.timeLeft <= 8 ? 0.95 : 0.45 }} />
          <div className="relative z-10">
            <div className="flex flex-wrap gap-2">
              <span className="border border-[color:var(--qm-accent-line)] bg-[var(--qm-accent-soft)] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[var(--qm-accent)]">Pertanyaan</span>
              {session.phoneSuggestion ? (
                <span className="border border-[color:var(--qm-violet)] bg-[var(--qm-violet-soft)] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[var(--qm-violet)]">
                  Teman menyarankan {session.phoneSuggestion}
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 text-balance text-4xl font-black leading-[0.95] tracking-[-0.07em] text-[var(--qm-fg-strong)] sm:text-6xl lg:text-7xl">
              {question.question}
            </h1>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {optionKeys.map((option) => (
                <AnswerButton
                  key={option}
                  option={option}
                  question={question}
                  session={session}
                  reveal={session.phase === "explanation" || isTerminal}
                  onAnswer={onAnswer}
                />
              ))}
            </div>

            <div className="mt-7 grid gap-3 border-t border-[color:var(--qm-line)] pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--qm-muted)]">Progress sesi</p>
                <div className="mt-2 h-2 overflow-hidden bg-[var(--qm-line)]">
                  <motion.div className="h-full bg-[var(--qm-danger)]" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: easeOut }} />
                </div>
              </div>
              <MotionButton
                type="button"
                onClick={onPhone}
                disabled={session.phoneUsesLeft <= 0 || session.phase !== "playing"}
                className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[color:var(--qm-violet)] bg-[var(--qm-violet-soft)] px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[var(--qm-violet)] transition-colors duration-200 hover:bg-[color-mix(in_oklch,var(--qm-violet)_24%,transparent)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-violet)_45%,transparent)]"
              >
                <PhoneCallIcon />
                Phone a Friend ({session.phoneUsesLeft}/{maxPhoneUses})
              </MotionButton>
            </div>
          </div>
        </div>
      </div>

      <aside className="grid gap-3">
        <PrizeLadder currentIndex={session.currentIndex} totalQuestions={session.questions.length} />
        <MotionButton
          type="button"
          onClick={onClearData}
          className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel)] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--qm-danger)] transition-colors duration-200 hover:bg-[color-mix(in_oklch,var(--qm-danger)_12%,transparent)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-danger)_45%,transparent)]"
        >
          <EraserIcon />
          Hapus data
        </MotionButton>
      </aside>
    </motion.section>
  );
}

function TimerPanel({ timeLeft }: { timeLeft: number }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 border border-[color:var(--qm-line)] bg-[var(--qm-panel-deep)] p-3">
      <Clock3Icon className={timeLeft <= 8 ? "text-[var(--qm-danger)]" : "text-[var(--qm-accent)]"} />
      <div className="min-w-40">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-[var(--qm-muted)]">
          <span>Timer</span>
          <span className={timeLeft <= 8 ? "text-[var(--qm-danger)]" : "text-[var(--qm-fg-strong)]"}>00:{String(timeLeft).padStart(2, "0")}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden bg-[var(--qm-line)]">
          <motion.div className={timeLeft <= 8 ? "h-full bg-[var(--qm-danger)]" : "h-full bg-[var(--qm-accent)]"} animate={{ width: `${(timeLeft / timeLimit) * 100}%` }} transition={{ duration: 0.45, ease: easeOut }} />
        </div>
      </div>
    </div>
  );
}

function AnswerButton({ option, question, session, reveal, onAnswer }: { option: OptionKey; question: QuizQuestion; session: QuizSession; reveal: boolean; onAnswer: (option: OptionKey) => void }) {
  const isSelected = session.selectedOption === option;
  const isCorrect = question.correct_option === option;
  const stateClass = reveal && isCorrect
    ? "border-[color:var(--qm-accent)] bg-[var(--qm-accent)] text-[var(--qm-accent-contrast)]"
    : reveal && isSelected
      ? "border-[color:var(--qm-danger)] bg-[var(--qm-danger)] text-[var(--qm-danger-contrast)]"
      : "border-[color:var(--qm-line)] bg-[var(--qm-panel)] text-[var(--qm-fg-strong)] hover:border-[color:var(--qm-accent-line)] hover:bg-[var(--qm-accent-soft)]";

  return (
    <MotionButton
      type="button"
      onClick={() => onAnswer(option)}
      disabled={session.phase !== "playing"}
      className={`group/answer grid min-h-20 cursor-pointer grid-cols-[3rem_1fr_auto] items-center overflow-hidden border text-left transition-colors duration-200 disabled:cursor-default ${stateClass}`}
    >
      <span className="grid h-full min-h-20 place-items-center border-r border-current/25 text-sm font-black">{option}</span>
      <span className="px-4 py-4 text-base font-black leading-snug sm:text-lg">{getOptionText(question, option)}</span>
      <span className="pr-4">
        {reveal && isCorrect ? <CheckIcon /> : reveal && isSelected ? <XIcon /> : <span className="block size-2 bg-current opacity-35" />}
      </span>
    </MotionButton>
  );
}

function PrizeLadder({ currentIndex, totalQuestions }: { currentIndex: number; totalQuestions: number }) {
  const prizes = createPrizeLadder(totalQuestions);

  return (
    <div className="border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel)] p-4 shadow-xl shadow-[var(--qm-shadow)]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--qm-accent)]">Prize ladder</p>
          <p className="mt-1 text-xs font-bold text-[var(--qm-muted)]">Naik setiap jawaban benar</p>
        </div>
        <p className="text-right text-xs font-black text-[var(--qm-fg-strong)]">{currentIndex + 1}/{totalQuestions}</p>
      </div>
      <div className="mt-4 grid gap-1">
        {prizes.map((prize, index) => {
          const questionIndex = totalQuestions - 1 - index;
          const active = questionIndex === currentIndex;
          const cleared = questionIndex < currentIndex;

          return (
            <motion.div
              key={prize}
              layout
              className={
                active
                  ? "grid grid-cols-[auto_1fr] items-center gap-2 bg-[var(--qm-accent)] px-3 py-2 text-sm font-black text-[var(--qm-accent-contrast)]"
                  : cleared
                    ? "grid grid-cols-[auto_1fr] items-center gap-2 bg-[var(--qm-accent-soft)] px-3 py-2 text-sm font-black text-[var(--qm-fg-strong)]"
                    : "grid grid-cols-[auto_1fr] items-center gap-2 px-3 py-2 text-sm font-black text-[var(--qm-muted-2)]"
              }
              animate={active ? { scale: 1.03 } : { scale: 1 }}
              transition={{ duration: 0.28, ease: easeOut }}
            >
              <span className="text-[0.62rem] uppercase tracking-[0.16em]">
                {active ? "now" : cleared ? <CheckIcon /> : <LockIcon />}
              </span>
              <span className="text-right">{prize}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function createPrizeLadder(totalQuestions: number) {
  const compactPrizes = ["100K", "250K", "500K", "1M", "2M", "5M", "10M", "25M", "50M", "100M", "250M", "500M", "1B", "2B", "5B"];
  const prizes = compactPrizes.slice(0, totalQuestions);
  return prizes.reverse();
}
