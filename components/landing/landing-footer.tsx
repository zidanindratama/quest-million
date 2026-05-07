export function LandingFooter() {
  return (
    <footer className="border-t border-[color:var(--qm-line)] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-[var(--qm-muted)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-black uppercase tracking-[0.22em] text-[var(--qm-fg-strong)]">QuestMillion</p>
          <p className="mt-1">Kuis edukatif interaktif dengan rasa game Millionaire.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="#features" className="transition hover:text-[var(--qm-fg-strong)]">Fitur</a>
          <a href="#pricing" className="transition hover:text-[var(--qm-fg-strong)]">Manfaat</a>
          <a href="#faq" className="transition hover:text-[var(--qm-fg-strong)]">FAQ</a>
          <a href="mailto:sales@questmillion.app" className="transition hover:text-[var(--qm-fg-strong)]">Kontak</a>
        </div>
      </div>
    </footer>
  );
}
