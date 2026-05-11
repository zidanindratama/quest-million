"use client";

import { MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

const links = [
  { label: "Alur kuis", href: "#experience" },
  { label: "Phone a Friend", href: "#console" },
  { label: "Manfaat", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const themeWipeBackground = {
  dark: "radial-gradient(circle at 50% -10%, oklch(0.78 0.16 72 / 0.18), transparent 38%), linear-gradient(135deg, oklch(0.08 0.02 260), oklch(0.145 0.034 274) 52%, oklch(0.075 0.02 260))",
  light: "radial-gradient(circle at 50% -10%, oklch(0.73 0.16 72 / 0.2), transparent 38%), linear-gradient(135deg, oklch(0.96 0.014 86), oklch(0.9 0.026 84) 52%, oklch(0.84 0.036 82))",
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const [isSwitchingTheme, setIsSwitchingTheme] = useState(false);
  const [wipeTheme, setWipeTheme] = useState<"dark" | "light">("dark");
  const wipeControls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const menuDuration = shouldReduceMotion ? 0.01 : 0.72;
  const menuExitDuration = shouldReduceMotion ? 0.01 : 0.78;
  const menuItemDuration = shouldReduceMotion ? 0.01 : 0.56;

  useBodyScrollLock(open);

  async function toggleTheme() {
    if (isSwitchingTheme) return;

    const nextTheme = isDark ? "light" : "dark";

    setOpen(false);
    setWipeTheme(nextTheme);
    setIsSwitchingTheme(true);

    wipeControls.set({ clipPath: "inset(0% 0% 100% 0%)", opacity: 1 });
    await wipeControls.start({
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
    });

    setTheme(nextTheme);

    await wipeControls.start({
      clipPath: "inset(100% 0% 0% 0%)",
      transition: { duration: 0.86, ease: [0.16, 1, 0.3, 1], delay: 0.08 },
    });

    wipeControls.set({ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 });
    setIsSwitchingTheme(false);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[100] pointer-events-none"
        initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
        animate={wipeControls}
        style={{ background: themeWipeBackground[wipeTheme] }}
      >
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(var(--qm-grid)_1px,transparent_1px),linear-gradient(90deg,var(--qm-grid)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60"
          initial={{ y: -24 }}
          animate={isSwitchingTheme ? { y: 24 } : { y: -24 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--qm-accent)_30%,transparent),transparent)]"
          animate={isSwitchingTheme ? { y: ["-100%", "100vh"] } : { y: "-100%" }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group/nav relative mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto_auto] items-center gap-2 overflow-visible border border-[color:var(--qm-line-strong)] bg-[color-mix(in_oklch,var(--qm-panel-solid)_78%,transparent)] px-3 py-2 shadow-2xl shadow-[var(--qm-shadow)] backdrop-blur-2xl"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--qm-accent),var(--qm-danger),transparent)] opacity-80 transition duration-700 group-hover/nav:opacity-100" />
        <motion.span
          className="pointer-events-none absolute top-0 h-full w-1/3 skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--qm-accent)_26%,transparent),transparent)] blur-md"
          initial={{ left: "-36%", opacity: 0 }}
          animate={{ left: ["-36%", "110%"], opacity: [0, 1, 0] }}
          transition={{ duration: 4.8, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 2.6 }}
        />

        <a
          href="#top"
          onClick={closeMenu}
          className="group/logo relative z-10 flex items-center gap-3 outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]"
        >
          <motion.span
            className="relative grid size-9 place-items-center overflow-hidden bg-[var(--qm-accent)] text-sm font-black text-[var(--qm-accent-contrast)]"
            whileHover={{ rotate: -6, scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
          >
            QM
            <motion.span
              className="absolute inset-0 bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--qm-fg-strong)_28%,transparent),transparent)]"
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.span>
          <span className="hidden text-xs font-black uppercase tracking-[0.22em] text-[var(--qm-fg-strong)] sm:inline">
            QuestMillion
          </span>
        </a>

        <div className="relative z-10 hidden items-center justify-center gap-1 md:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="group/link relative overflow-hidden px-3 py-2 text-[0.7rem] font-black uppercase tracking-[0.16em] text-[var(--qm-muted)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]"
              whileHover={{ y: -1, color: "var(--qm-accent-contrast)" }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="absolute inset-0 origin-left bg-[var(--qm-accent)]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="relative">{link.label}</span>
            </motion.a>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          disabled={isSwitchingTheme}
          className="relative z-10 grid size-9 cursor-pointer place-items-center border border-[color:var(--qm-line)] bg-[var(--qm-panel)] text-[var(--qm-fg)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]"
          whileHover={{ y: -2, backgroundColor: "var(--qm-accent-soft)" }}
          whileTap={{ scale: 0.94 }}
        >
          <SunIcon className="hidden dark:block" />
          <MoonIcon className="dark:hidden" />
        </motion.button>

        <Button asChild className="relative z-10 hidden rounded-none bg-[var(--qm-danger)] text-[var(--qm-danger-contrast)] hover:bg-[var(--qm-danger-bright)] sm:inline-flex">
          <a href="/quiz" onClick={closeMenu}>
              Mulai
          </a>
        </Button>

        <motion.button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
          className="relative z-10 grid size-9 cursor-pointer place-items-center border border-[color:var(--qm-line)] bg-[var(--qm-panel)] text-[var(--qm-fg)] md:hidden"
          whileHover={{ y: -2, backgroundColor: "var(--qm-accent-soft)" }}
          whileTap={{ scale: 0.94 }}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </motion.button>
      </motion.nav>
    </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-[60] overflow-y-auto text-[var(--qm-fg-strong)] md:hidden"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { clipPath: "inset(0% 0% 100% 0%)" },
              show: {
                clipPath: "inset(0% 0% 0% 0%)",
                transition: {
                  duration: menuDuration,
                  ease: easeOut,
                  when: "beforeChildren",
                  staggerChildren: shouldReduceMotion ? 0 : 0.06,
                },
              },
              exit: {
                clipPath: "inset(100% 0% 0% 0%)",
                transition: {
                  duration: menuExitDuration,
                  ease: easeOut,
                  when: "afterChildren",
                  staggerChildren: shouldReduceMotion ? 0 : 0.04,
                  staggerDirection: -1,
                },
              },
            }}
            style={{ background: themeWipeBackground[isDark ? "dark" : "light"] }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(var(--qm-grid)_1px,transparent_1px),linear-gradient(90deg,var(--qm-grid)_1px,transparent_1px)] bg-[size:64px_64px] opacity-55"
              initial={{ y: -28 }}
              animate={{ y: shouldReduceMotion ? 0 : 28 }}
              exit={{ y: shouldReduceMotion ? 0 : 84, opacity: 0 }}
              transition={{ duration: 1.2, ease: easeOut }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--qm-accent)_34%,transparent),transparent)]"
              initial={{ y: "-100%" }}
              animate={{ y: shouldReduceMotion ? "0%" : "100vh" }}
              exit={{ y: shouldReduceMotion ? "0%" : "100vh", opacity: 0 }}
              transition={{ duration: 1.08, ease: easeOut }}
            />

            <div className="relative z-10 flex min-h-dvh flex-col px-3 pb-6 pt-3 sm:px-5">
              <motion.div
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-[color:var(--qm-line-strong)] bg-[color-mix(in_oklch,var(--qm-panel-solid)_84%,transparent)] px-3 py-2 shadow-2xl shadow-[var(--qm-shadow)] backdrop-blur-2xl"
                variants={{
                  hidden: { opacity: 0, y: -16 },
                  show: { opacity: 1, y: 0, transition: { duration: menuItemDuration, ease: easeOut } },
                  exit: { opacity: 0, y: -16, transition: { duration: 0.26, ease: easeOut } },
                }}
              >
                <a
                  href="#top"
                  onClick={closeMenu}
                  className="group/logo flex cursor-pointer items-center gap-3 outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]"
                >
                  <span className="grid size-9 place-items-center bg-[var(--qm-accent)] text-sm font-black text-[var(--qm-accent-contrast)]">
                    QM
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.22em] text-[var(--qm-fg-strong)]">
                    QuestMillion
                  </span>
                </a>
                <span className="justify-self-end text-[0.64rem] font-black uppercase tracking-[0.28em] text-[var(--qm-muted)]">
                  Menu
                </span>
                <motion.button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={closeMenu}
                  className="grid size-9 cursor-pointer place-items-center border border-[color:var(--qm-line)] bg-[var(--qm-panel)] text-[var(--qm-fg)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]"
                  whileHover={{ y: -2, backgroundColor: "var(--qm-accent-soft)" }}
                  whileTap={{ scale: 0.94 }}
                >
                  <XIcon />
                </motion.button>
              </motion.div>

              <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center gap-3 py-8">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="group/mobile grid cursor-pointer grid-cols-[1fr_auto] items-center overflow-hidden border border-[color:var(--qm-line)] bg-[color-mix(in_oklch,var(--qm-panel-solid)_78%,transparent)] px-5 py-5 text-[clamp(2rem,12vw,4.5rem)] font-black leading-none tracking-[-0.08em] text-[var(--qm-fg-strong)] backdrop-blur-2xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-accent)_45%,transparent)]"
                    variants={{
                      hidden: { opacity: 0, y: -28 },
                      show: { opacity: 1, y: 0, transition: { duration: menuItemDuration, ease: easeOut } },
                      exit: { opacity: 0, y: -18, transition: { duration: 0.24, ease: easeOut } },
                    }}
                    whileHover={{ x: 4, backgroundColor: "var(--qm-accent-soft)", borderColor: "var(--qm-accent)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{link.label}</span>
                    <span className="text-sm font-black uppercase tracking-[0.16em] text-[var(--qm-muted)]">
                      0{index + 1}
                    </span>
                  </motion.a>
                ))}
                <motion.a
                  href="/quiz"
                  onClick={closeMenu}
                  className="mt-2 cursor-pointer bg-[var(--qm-danger)] px-5 py-5 text-center text-sm font-black uppercase tracking-[0.22em] text-[var(--qm-danger-contrast)] transition-colors duration-200 hover:bg-[var(--qm-danger-bright)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklch,var(--qm-danger)_45%,transparent)]"
                  variants={{
                    hidden: { opacity: 0, y: -24 },
                    show: { opacity: 1, y: 0, transition: { duration: menuItemDuration, ease: easeOut } },
                    exit: { opacity: 0, y: -16, transition: { duration: 0.24, ease: easeOut } },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mulai quiz
                </motion.a>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
