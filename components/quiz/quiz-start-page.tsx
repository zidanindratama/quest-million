"use client";

import { EraserIcon, Loader2Icon, PlayIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { MotionButton, easeOut } from "@/components/quiz/motion-button";
import { QuizShell } from "@/components/quiz/quiz-shell";
import { createSession, emptyProfile, loadQuestions, maxPhoneUses, profileKey, safeJsonParse, sessionKey } from "@/components/quiz/quiz-data";
import type { PlayerProfile, QuizQuestion } from "@/components/quiz/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ruleCards = [
  { value: "10 soal", label: "Satu sesi" },
  { value: "30 detik", label: "Per pertanyaan" },
  { value: `${maxPhoneUses} bantuan`, label: "Phone a Friend" },
];

export function QuizStartPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [profile, setProfile] = useState<PlayerProfile>(emptyProfile());
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loadError, setLoadError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const savedProfile = safeJsonParse<PlayerProfile>(localStorage.getItem(profileKey));
      if (savedProfile) setProfile(savedProfile);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    let ignore = false;

    async function load() {
      const result = await loadQuestions();
      if (ignore) return;
      setQuestions(result.questions);
      setLoadError(result.error);
    }

    void load();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(profileKey, JSON.stringify(profile));
  }, [hydrated, profile]);

  function clearSavedData() {
    localStorage.removeItem(profileKey);
    localStorage.removeItem(sessionKey);
    setProfile(emptyProfile());
  }

  function handleStart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.name.trim() || !questions.length) return;

    localStorage.setItem(profileKey, JSON.stringify(profile));
    localStorage.setItem(sessionKey, JSON.stringify(createSession(questions)));
    router.push("/quiz/play");
  }

  return (
    <QuizShell>
      <motion.section
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: easeOut }}
        className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch"
      >
        <div className="relative overflow-hidden border border-[color:var(--qm-accent-line)] bg-[var(--qm-panel-deep)] p-6 shadow-2xl shadow-[var(--qm-shadow)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_10%,var(--qm-accent-soft),transparent_32%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <p className="border-y border-[color:var(--qm-accent-line)] py-2 text-[0.65rem] font-black uppercase tracking-[0.34em] text-[var(--qm-accent)]">siap bermain?</p>
              <h1 className="mt-6 text-balance text-6xl font-black leading-[0.86] tracking-[-0.09em] text-[var(--qm-fg-strong)] sm:text-8xl">
                Masuk ke kursi panas.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-[var(--qm-muted)] sm:text-lg">
                Isi identitas pemain dulu. Data disimpan otomatis di browser, jadi kalau halaman ke-refresh kamu tidak perlu mengetik ulang.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {ruleCards.map((item) => (
                <div key={item.value} className="border border-[color:var(--qm-line)] bg-[var(--qm-panel)] p-4">
                  <p className="text-lg font-black text-[var(--qm-fg-strong)]">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--qm-muted)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleStart} className="border border-[color:var(--qm-line-strong)] bg-[color-mix(in_oklch,var(--qm-panel-solid)_84%,transparent)] p-5 shadow-2xl shadow-[var(--qm-shadow)] backdrop-blur-2xl sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--qm-accent)]">profil pemain</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-[var(--qm-fg-strong)] sm:text-5xl">Mulai quiz</h2>
            </div>
            <MotionButton
              type="button"
              onClick={clearSavedData}
              className="grid size-10 cursor-pointer place-items-center border border-[color:var(--qm-line)] bg-[var(--qm-panel)] text-[var(--qm-danger)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-danger)_42%,transparent)]"
              aria-label="Hapus data tersimpan"
            >
              <EraserIcon />
            </MotionButton>
          </div>

          <div className="mt-7 flex flex-col gap-5">
            <ProfileInput id="player-name" label="Nama pemain" value={profile.name} onChange={(name) => setProfile((current) => ({ ...current, name }))} placeholder="Contoh: Zidan" required />
            <ProfileInput id="player-group" label="Kelas / tim / asal" value={profile.group} onChange={(group) => setProfile((current) => ({ ...current, group }))} placeholder="Contoh: XI RPL / Tim Garuda" />
            <ProfileInput id="player-goal" label="Target belajar" value={profile.goal} onChange={(goal) => setProfile((current) => ({ ...current, goal }))} placeholder="Contoh: latihan pengetahuan umum" />
          </div>

          {loadError ? <p className="mt-4 border border-[color:var(--qm-danger)] bg-[color-mix(in_oklch,var(--qm-danger)_12%,transparent)] p-3 text-sm text-[var(--qm-danger)]">{loadError}</p> : null}

          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
            <MotionButton
              type="submit"
              disabled={!profile.name.trim() || !questions.length}
              className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[var(--qm-danger)] px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-[var(--qm-danger-contrast)] shadow-xl shadow-[var(--qm-shadow)] transition-colors duration-200 hover:bg-[var(--qm-danger-bright)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-danger)_45%,transparent)]"
            >
              {!questions.length ? <Loader2Icon className="animate-spin" /> : <PlayIcon />}
              Mulai quiz
            </MotionButton>
            <MotionButton
              type="button"
              onClick={clearSavedData}
              className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[color:var(--qm-line-strong)] bg-[var(--qm-panel)] px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[var(--qm-fg-strong)] transition-colors duration-200 hover:bg-[var(--qm-accent-soft)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]"
            >
              <EraserIcon />
              Start fresh
            </MotionButton>
          </div>
        </form>
      </motion.section>
    </QuizShell>
  );
}

function ProfileInput({ id, label, value, onChange, placeholder, required }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-xs font-black uppercase tracking-[0.2em] text-[var(--qm-muted)]">{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-none border-[color:var(--qm-line)] bg-[var(--qm-panel)] px-4 text-base font-bold text-[var(--qm-fg-strong)] placeholder:text-[var(--qm-muted-2)]"
        required={required}
      />
    </div>
  );
}
