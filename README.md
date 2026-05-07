# QuestMillion

QuestMillion is an interactive educational quiz web app inspired by game shows like "Who Wants to Be a Millionaire". It combines multiple-choice questions, a countdown timer, Phone a Friend assistance, answer feedback, and educational explanations after each answer.

## Key Features

- Animated landing page with a game-show visual direction.
- Player start form at `/quiz`.
- Form data is saved in `localStorage`, so it survives accidental refreshes.
- Reset controls for starting fresh.
- Quiz gameplay page at `/quiz/play`.
- 10 random questions per session.
- Question bank supports 1000 questions split across 4 CSV files.
- A/B/C/D answer options are shuffled for every session.
- Correct answer positions are recalculated after shuffling.
- 30-second timer per question.
- Explanation modal after correct answers, wrong answers, or timeout.
- Game over state for wrong answers and timeout.
- Win state after completing all questions.
- Phone a Friend can be used 3 times per session.
- Phone a Friend uses a 50:50 success/fail probability.
- GIF and audio placeholders are safe even before final assets are added.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui-style components
- framer-motion
- lucide-react

## Routes

- `/` - Landing page.
- `/quiz` - Player start form.
- `/quiz/play` - Quiz gameplay page.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Question Data

Question data lives in `public/data`:

```text
public/data/questions-part-1.csv
public/data/questions-part-2.csv
public/data/questions-part-3.csv
public/data/questions-part-4.csv
```

Expected CSV columns:

```csv
id,category,difficulty,question,option_a,option_b,option_c,option_d,correct_option,explanation,image
```

Important notes:

- `correct_option` must be `A`, `B`, `C`, or `D`.
- The app shuffles answer positions when a session is created.
- Even if many CSV rows use `A` as the original correct answer, the displayed correct answer can appear as A/B/C/D after shuffling.
- `explanation` is shown in the explanation modal after the player answers.

## GIF Assets

GIF assets are optional during development. If the files are missing, the app displays a polished visual placeholder instead of crashing.

Add final GIF assets to these paths:

```text
public/gifs/win-placeholder.gif
public/gifs/lose-placeholder.gif
public/gifs/phone-call-placeholder.gif
public/gifs/phone-success-placeholder.gif
public/gifs/phone-fail-placeholder.gif
```

GIF usage:

- `win-placeholder.gif` - shown when the player wins.
- `lose-placeholder.gif` - shown when the player loses.
- `phone-call-placeholder.gif` - shown during the Phone a Friend call sequence.
- `phone-success-placeholder.gif` - shown when Phone a Friend succeeds.
- `phone-fail-placeholder.gif` - shown when Phone a Friend fails.

## Audio Assets

Audio is also optional. If an audio file is missing, the app continues to run without errors.

Add audio assets to these paths:

```text
public/audio/sfx-correct.mp3
public/audio/sfx-wrong.mp3
```

Audio usage:

- `sfx-correct.mp3` - played after a correct answer.
- `sfx-wrong.mp3` - played after a wrong answer or timeout.

## State Persistence

The app uses `localStorage` for persistence:

- Player profile: `questmillion.player.v1`
- Quiz session: `questmillion.session.v1`

Saved data can be cleared from the `Hapus data` or `Start fresh` buttons in the quiz flow.

## Quiz Components

Main quiz components live in `components/quiz`:

```text
components/quiz/quiz-start-page.tsx
components/quiz/quiz-play-page.tsx
components/quiz/quiz-board.tsx
components/quiz/quiz-modals.tsx
components/quiz/quiz-shell.tsx
components/quiz/quiz-data.ts
components/quiz/types.ts
```

Responsibilities:

- `quiz-start-page.tsx` handles the player form and session creation.
- `quiz-play-page.tsx` handles game state, timer, answers, and Phone a Friend.
- `quiz-board.tsx` renders the question, answer options, timer, progress, and prize ladder.
- `quiz-modals.tsx` renders the explanation modal, Phone a Friend modal, and win/lose result overlay.
- `quiz-data.ts` handles CSV loading, parsing, session creation, question shuffling, and answer shuffling.
- `types.ts` stores shared quiz types.

## Development Notes

- Do not use video for game scenes. Use GIF assets.
- The data structure is prepared for 1000 questions.
- Questions per session are currently set to 10 via `sessionQuestionCount` in `components/quiz/quiz-data.ts`.
- Phone a Friend uses are currently set to 3 via `maxPhoneUses` in `components/quiz/quiz-data.ts`.
