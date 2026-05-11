"use client";

import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { QuizBoard } from "@/components/quiz/quiz-board";
import { createSession, emptyProfile, loadQuestions, playSound, profileKey, safeJsonParse, sessionKey, timeLimit } from "@/components/quiz/quiz-data";
import { ExplanationModal, PhoneModal, ResultOverlay } from "@/components/quiz/quiz-modals";
import { QuizShell } from "@/components/quiz/quiz-shell";
import type { OptionKey, PlayerProfile, QuizQuestion, QuizSession } from "@/components/quiz/types";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

export function QuizPlayPage() {
  const router = useRouter();
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [profile, setProfile] = useState<PlayerProfile>(emptyProfile());
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [session, setSession] = useState<QuizSession | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [dismissedResultKey, setDismissedResultKey] = useState<string | null>(null);

  const currentQuestion = session?.questions[session.currentIndex] ?? null;
  const bgmPhase = session?.phase;
  const bgmMuted = session?.muted;
  const isTerminal = session?.phase === "won" || session?.phase === "lost";
  const resultKey = isTerminal && session ? `${session.startedAt}:${session.phase}` : null;
  const resultOverlayOpen = resultKey !== null && dismissedResultKey !== resultKey;

  useBodyScrollLock(session?.phase === "explanation" || session?.phase === "phone" || (isTerminal && resultOverlayOpen));

  useEffect(() => {
    queueMicrotask(() => {
      const savedProfile = safeJsonParse<PlayerProfile>(localStorage.getItem(profileKey));
      const savedSession = safeJsonParse<QuizSession>(localStorage.getItem(sessionKey));

      if (savedProfile) setProfile(savedProfile);
      if (savedSession?.questions?.length) setSession(normalizeSession(savedSession));
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    let ignore = false;

    async function load() {
      const result = await loadQuestions();
      if (!ignore) setQuestions(result.questions);
    }

    void load();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated || !session) return;
    localStorage.setItem(sessionKey, JSON.stringify(session));
  }, [hydrated, session]);

  useEffect(() => {
    return () => {
      bgmRef.current?.pause();
      bgmRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!bgmPhase) {
      bgmRef.current?.pause();
      return;
    }

    if (!bgmRef.current) {
      const audio = new Audio("/audio/bgm.mp3");
      audio.loop = true;
      audio.volume = 0.18;
      bgmRef.current = audio;
    }

    const audio = bgmRef.current;
    const startBgm = () => void audio.play().catch(() => undefined);
    const shouldPlay = !bgmMuted && bgmPhase !== "won" && bgmPhase !== "lost";
    if (shouldPlay) {
      startBgm();
      window.addEventListener("pointerdown", startBgm);
      window.addEventListener("keydown", startBgm);

      return () => {
        window.removeEventListener("pointerdown", startBgm);
        window.removeEventListener("keydown", startBgm);
      };
    }

    audio.pause();
  }, [bgmMuted, bgmPhase]);

  useEffect(() => {
    if (!session || session.phase !== "playing") return;

    const timer = window.setTimeout(() => {
      setSession((current) => {
        if (!current || current.phase !== "playing") return current;

        if (current.timeLeft <= 1) {
          playSound("/audio/sfx-wrong.mp3", current.muted);
          return { ...current, timeLeft: 0, selectedOption: null, answerState: "timeout", phase: "explanation" };
        }

        const nextTimeLeft = current.timeLeft - 1;
        if (nextTimeLeft <= 8) playSound("/audio/sfx-tick.mp3", current.muted);

        return { ...current, timeLeft: nextTimeLeft };
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [session]);

  useEffect(() => {
    if (session?.phase !== "phone" || session.phoneState !== "calling") return;

    const timer = window.setTimeout(() => {
      const success = Math.random() >= 0.5;
      setSession((current) =>
        current && current.phase === "phone"
          ? {
              ...current,
              phoneState: success ? "success" : "fail",
              phoneSuggestion: success ? current.questions[current.currentIndex].correct_option : null,
            }
          : current
      );
    }, 1450);

    return () => window.clearTimeout(timer);
  }, [session?.phase, session?.phoneState]);

  function handleAnswer(option: OptionKey) {
    if (!session || !currentQuestion || session.phase !== "playing") return;

    const correct = option === currentQuestion.correct_option;
    playSound(correct ? "/audio/sfx-correct.mp3" : "/audio/sfx-wrong.mp3", session.muted);
    setSession({ ...session, selectedOption: option, answerState: correct ? "correct" : "wrong", phase: "explanation" });
  }

  function handleContinue() {
    if (!session) return;

    if (session.answerState !== "correct") {
      setSession({ ...session, phase: "lost" });
      return;
    }

    if (session.currentIndex >= session.questions.length - 1) {
      setSession({ ...session, phase: "won" });
      return;
    }

    setSession({
      ...session,
      currentIndex: session.currentIndex + 1,
      selectedOption: null,
      answerState: null,
      phase: "playing",
      timeLeft: timeLimit,
      phoneState: null,
      phoneSuggestion: null,
    });
  }

  function handlePhone() {
    if (!session || session.phase !== "playing" || session.phoneUsesLeft <= 0) return;
    setSession({ ...session, phase: "phone", phoneUsesLeft: session.phoneUsesLeft - 1, phoneState: "calling", phoneSuggestion: null });
  }

  function clearSavedData() {
    localStorage.removeItem(sessionKey);
    setSession(null);
    router.push("/quiz");
  }

  function restartFresh() {
    const sourceQuestions = questions.length ? questions : session?.questions;
    if (!sourceQuestions?.length) return;
    setSession(createSession(sourceQuestions, session?.muted ?? false));
  }

  function toggleMute() {
    setSession((current) => (current ? { ...current, muted: !current.muted } : current));
  }

  function closeResultOverlay() {
    if (resultKey) setDismissedResultKey(resultKey);
  }

  if (!hydrated) {
    return (
      <QuizShell>
        <div className="mx-auto grid gap-3 border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel)] p-8 text-center shadow-2xl shadow-[var(--qm-shadow)]">
          <Loader2Icon className="mx-auto animate-spin text-[var(--qm-accent)]" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--qm-muted)]">Memuat sesi</p>
        </div>
      </QuizShell>
    );
  }

  if (!session || !currentQuestion) {
    return (
      <QuizShell>
        <div className="mx-auto max-w-xl border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel)] p-8 text-center shadow-2xl shadow-[var(--qm-shadow)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--qm-accent)]">sesi belum ada</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[var(--qm-fg-strong)]">Isi form dulu.</h1>
          <p className="mt-4 text-base leading-7 text-[var(--qm-muted)]">Halaman quiz membutuhkan data pemain dan paket soal yang dibuat dari halaman mulai.</p>
          <Link href="/quiz" className="mt-6 inline-flex cursor-pointer items-center justify-center bg-[var(--qm-danger)] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-[var(--qm-danger-contrast)]">
            Ke halaman mulai
          </Link>
        </div>
      </QuizShell>
    );
  }

  return (
    <QuizShell muted={session.muted} onToggleMute={toggleMute}>
      <QuizBoard session={session} profile={profile} question={currentQuestion} onAnswer={handleAnswer} onPhone={handlePhone} onClearData={clearSavedData} />
      <ExplanationModal session={session} question={currentQuestion} onContinue={handleContinue} />
      <PhoneModal session={session} question={currentQuestion} onReturn={() => setSession({ ...session, phase: "playing" })} />
      <ResultOverlay session={session} profile={profile} open={resultOverlayOpen} onClose={closeResultOverlay} onRestart={restartFresh} onClearData={clearSavedData} />
    </QuizShell>
  );
}

function normalizeSession(session: QuizSession): QuizSession {
  return {
    ...session,
    phoneUsesLeft: typeof session.phoneUsesLeft === "number" ? session.phoneUsesLeft : 3,
  };
}
