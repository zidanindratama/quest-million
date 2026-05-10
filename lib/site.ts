export const siteConfig = {
  name: "QuestMillion",
  title: "QuestMillion | Kuis Interaktif Edukatif Bergaya Game Show",
  description:
    "QuestMillion adalah aplikasi kuis interaktif edukatif dengan timer, Phone a Friend, feedback dramatis, dan pembahasan jawaban setelah setiap soal.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://quest-million.vercel.app/",
  ogImage: "/og_image.png",
  icon: "/qm-icon.svg",
  keywords: [
    "QuestMillion",
    "kuis interaktif",
    "aplikasi kuis edukatif",
    "game show quiz",
    "Who Wants to Be a Millionaire",
    "quiz app Indonesia",
    "Phone a Friend",
    "kuis pilihan ganda",
    "pembelajaran interaktif",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
