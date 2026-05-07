"use client";

import { CheckIcon, HeadphonesIcon, Loader2Icon, RotateCcwIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { GifFrame } from "@/components/quiz/gif-frame";
import { MotionButton, easeOut } from "@/components/quiz/motion-button";
import { getOptionText } from "@/components/quiz/quiz-data";
import type { PlayerProfile, QuizQuestion, QuizSession } from "@/components/quiz/types";

export function ExplanationModal({ session, question, onContinue }: { session: QuizSession; question: QuizQuestion; onContinue: () => void }) {
  const correctText = getOptionText(question, question.correct_option);

  return (
    <AnimatePresence>
      {session.phase === "explanation" ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-2xl border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel-solid)] p-5 text-[var(--qm-fg)] shadow-2xl shadow-[var(--qm-shadow)] sm:p-7" initial={{ y: 24, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -18, opacity: 0, scale: 0.98 }} transition={{ duration: 0.42, ease: easeOut }}>
            <div className="flex items-start gap-4">
              <div className={session.answerState === "correct" ? "grid size-12 place-items-center bg-[var(--qm-accent)] text-[var(--qm-accent-contrast)]" : "grid size-12 place-items-center bg-[var(--qm-danger)] text-[var(--qm-danger-contrast)]"}>
                {session.answerState === "correct" ? <CheckIcon /> : <XIcon />}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--qm-muted)]">
                  {session.answerState === "correct" ? "jawaban benar" : session.answerState === "timeout" ? "waktu habis" : "jawaban salah"}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--qm-fg-strong)] sm:text-5xl">Pembahasan</h2>
              </div>
            </div>
            <div className="mt-6 border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-4">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--qm-accent)]">Jawaban benar: {question.correct_option}</p>
              <p className="mt-2 text-xl font-black text-[var(--qm-fg-strong)]">{correctText}</p>
              <p className="mt-4 text-base leading-8 text-[var(--qm-muted)]">{question.explanation}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <MotionButton type="button" onClick={onContinue} className="cursor-pointer bg-[var(--qm-danger)] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-[var(--qm-danger-contrast)] transition-colors duration-200 hover:bg-[var(--qm-danger-bright)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-danger)_45%,transparent)]">
                {session.answerState === "correct" ? "Lanjut" : "Lihat hasil"}
              </MotionButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PhoneModal({ session, question, onReturn }: { session: QuizSession; question: QuizQuestion; onReturn: () => void }) {
  return (
    <AnimatePresence>
      {session.phase === "phone" ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-xl border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel-solid)] p-5 shadow-2xl shadow-[var(--qm-shadow)] sm:p-7" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.42, ease: easeOut }}>
            <div className="flex items-center gap-4">
              <div className="grid size-12 place-items-center bg-[var(--qm-violet)] text-white">
                <HeadphonesIcon />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--qm-muted)]">phone a friend</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--qm-fg-strong)]">Bantuan teman</h2>
              </div>
            </div>
            <div className="mt-5">
              <GifFrame
                label={session.phoneState === "calling" ? "Menghubungi teman" : session.phoneState === "success" ? "Bantuan berhasil" : "Bantuan gagal"}
                src={session.phoneState === "calling" ? "/gifs/phone-call-placeholder.gif" : session.phoneState === "success" ? "/gifs/phone-success-placeholder.gif" : "/gifs/phone-fail-placeholder.gif"}
                tone={session.phoneState === "success" ? "gold" : session.phoneState === "fail" ? "danger" : "violet"}
              />
            </div>
            <div className="mt-5 border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-4">
              {session.phoneState === "calling" ? (
                <p className="flex items-center gap-2 text-sm font-bold text-[var(--qm-muted)]"><Loader2Icon className="animate-spin" /> Timer dijeda. Teman sedang berpikir...</p>
              ) : session.phoneState === "success" && session.phoneSuggestion ? (
                <p className="text-base leading-7 text-[var(--qm-muted)]">Teman kamu cukup yakin jawabannya <strong className="text-[var(--qm-fg-strong)]">{session.phoneSuggestion}. {getOptionText(question, session.phoneSuggestion)}</strong></p>
              ) : (
                <p className="text-base leading-7 text-[var(--qm-muted)]">Teman kamu ragu dan tidak berani memberi petunjuk. Pilihan tetap di tanganmu.</p>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <MotionButton type="button" onClick={onReturn} disabled={session.phoneState === "calling"} className="cursor-pointer bg-[var(--qm-danger)] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-[var(--qm-danger-contrast)] transition-colors duration-200 hover:bg-[var(--qm-danger-bright)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-danger)_45%,transparent)]">
                Kembali ke soal
              </MotionButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function ResultOverlay({ session, profile, onRestart, onClearData }: { session: QuizSession; profile: PlayerProfile; onRestart: () => void; onClearData: () => void }) {
  const isTerminal = session.phase === "won" || session.phase === "lost";

  return (
    <AnimatePresence mode="wait">
      {isTerminal ? (
        <motion.div className="fixed inset-0 z-40 grid place-items-center bg-[var(--qm-bg)] p-4" initial={{ clipPath: "inset(0% 0% 100% 0%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: easeOut }}>
          <div className="qm-grid-bg absolute inset-0 bg-[size:72px_72px] opacity-80" />
          <motion.div className="relative z-10 grid w-full max-w-5xl gap-6 border border-[color:var(--qm-line-strong)] bg-[color-mix(in_oklch,var(--qm-panel-solid)_86%,transparent)] p-5 shadow-2xl shadow-[var(--qm-shadow)] backdrop-blur-2xl sm:p-8 lg:grid-cols-[0.9fr_1.1fr]" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.52, ease: easeOut, delay: 0.12 }}>
            <GifFrame label={session.phase === "won" ? "GIF menang" : "GIF kalah"} src={session.phase === "won" ? "/gifs/win-placeholder.gif" : "/gifs/lose-placeholder.gif"} tone={session.phase === "won" ? "gold" : "danger"} />
            <div className="flex flex-col justify-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--qm-accent)]">{session.phase === "won" ? "victory" : "game over"}</p>
              <h2 className="mt-4 text-balance text-5xl font-black leading-[0.9] tracking-[-0.08em] text-[var(--qm-fg-strong)] sm:text-7xl">
                {session.phase === "won" ? `Mantap, ${profile.name || "Pemain"}.` : "Kursi panas selesai."}
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--qm-muted)]">
                {session.phase === "won"
                  ? `Kamu menyelesaikan ${session.questions.length} soal dengan pembahasan lengkap.`
                  : `Progress kamu berhenti di soal ${session.currentIndex + 1} dari ${session.questions.length}. Coba lagi dengan paket soal acak baru.`}
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <MotionButton type="button" onClick={onRestart} className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[var(--qm-danger)] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-[var(--qm-danger-contrast)] transition-colors duration-200 hover:bg-[var(--qm-danger-bright)]">
                  <RotateCcwIcon />
                  Main lagi
                </MotionButton>
                <MotionButton type="button" onClick={onClearData} className="cursor-pointer border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel)] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-[var(--qm-fg-strong)] transition-colors duration-200 hover:bg-[var(--qm-accent-soft)]">
                  Hapus data
                </MotionButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
