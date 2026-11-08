import type { Key } from "@/i18n";

/* ------------------------------------------------------------------ */
/* Imagery (Pexels, free to use). Each card also has a gradient         */
/* fallback in the UI so layouts never look empty while loading.        */
/*                                                                      */
/* All visible words live in src/i18n/*.ts — this file only holds       */
/* structure: translation keys, prices, image ids and colours.          */
/* ------------------------------------------------------------------ */
const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
export const NAV_LINKS: { labelKey: Key; href: string; id: string }[] = [
  { labelKey: "nav.library", href: "#library", id: "library" },
  { labelKey: "nav.pricing", href: "#pricing", id: "pricing" },
  { labelKey: "nav.faq", href: "#faq", id: "faq" },
];

/* ------------------------------------------------------------------ */
/* Library carousels                                                   */
/*                                                                     */
/* NOTE: posters below are original placeholder designs (stock photo +  */
/* title treatment). To show real artwork, add `image: "https://…"`    */
/* to any item — you are responsible for holding the rights to it.     */
/* ------------------------------------------------------------------ */
export type Poster = {
  /** Fictional title — intentionally not translated. */
  title: string;
  genre: Key;
  year: number;
  rating: string;
  badge: "4K" | "HD" | "NEW";
  photo: number;
  tint: string;
  /** Optional full image URL that overrides the stock photo. */
  image?: string;
};

export const posterUrl = (p: Poster) => p.image ?? px(p.photo, 400, 600);

export const FILMS: Poster[] = [
  { title: "Midnight Protocol", genre: "genre.thriller", year: 2025, rating: "8.4", badge: "NEW", photo: 6720006, tint: "#7c3aed" },
  { title: "Orbit Seven", genre: "genre.scifi", year: 2025, rating: "8.1", badge: "4K", photo: 7170695, tint: "#2563eb" },
  { title: "Crown of Ash", genre: "genre.fantasy", year: 2024, rating: "8.7", badge: "4K", photo: 18993399, tint: "#b45309" },
  { title: "Dust & Thunder", genre: "genre.action", year: 2025, rating: "7.9", badge: "NEW", photo: 28666421, tint: "#ea580c" },
  { title: "The Last Whistle", genre: "genre.sportsDrama", year: 2024, rating: "8.3", badge: "4K", photo: 3158350, tint: "#16a34a" },
  { title: "Hollow House", genre: "genre.horror", year: 2024, rating: "7.6", badge: "HD", photo: 36891508, tint: "#475569" },
  { title: "Neon Harbor", genre: "genre.crime", year: 2025, rating: "8.0", badge: "4K", photo: 36742559, tint: "#db2777" },
  { title: "Iron Distance", genre: "genre.boxingDrama", year: 2023, rating: "8.2", badge: "HD", photo: 28304171, tint: "#dc2626" },
  { title: "Paper Skies", genre: "genre.drama", year: 2024, rating: "7.8", badge: "HD", photo: 34622355, tint: "#0891b2" },
  { title: "Behind the Wall", genre: "genre.mystery", year: 2025, rating: "8.5", badge: "NEW", photo: 20584069, tint: "#9333ea" },
];

export const SERIES: Poster[] = [
  { title: "Golden Boot", genre: "genre.footballDrama", year: 2025, rating: "9.0", badge: "NEW", photo: 3131406, tint: "#16a34a" },
  { title: "Blackwater", genre: "genre.crime", year: 2025, rating: "8.8", badge: "4K", photo: 10924122, tint: "#0ea5e9" },
  { title: "Signal Lost", genre: "genre.scifi", year: 2024, rating: "8.6", badge: "4K", photo: 29146237, tint: "#6366f1" },
  { title: "The Salt Kings", genre: "genre.fantasy", year: 2024, rating: "8.9", badge: "4K", photo: 5970156, tint: "#b45309" },
  { title: "Full Time", genre: "genre.sportsDocuseries", year: 2025, rating: "8.7", badge: "NEW", photo: 37391237, tint: "#22c55e" },
  { title: "Station 9", genre: "genre.thriller", year: 2025, rating: "8.2", badge: "HD", photo: 21316136, tint: "#e11d48" },
  { title: "Harbor Lights", genre: "genre.romance", year: 2024, rating: "7.9", badge: "HD", photo: 16339485, tint: "#d946ef" },
  { title: "Night Shift", genre: "genre.drama", year: 2023, rating: "8.4", badge: "HD", photo: 8387447, tint: "#f59e0b" },
  { title: "Ghost Road", genre: "genre.mystery", year: 2025, rating: "8.1", badge: "NEW", photo: 27692126, tint: "#f97316" },
  { title: "The Understudy", genre: "genre.drama", year: 2024, rating: "8.5", badge: "4K", photo: 27869187, tint: "#64748b" },
];

export type Sport = {
  nameKey: Key;
  captionKey: Key;
  photo: number;
  live?: boolean;
  image?: string;
};

export const sportUrl = (s: Sport) => s.image ?? px(s.photo, 640, 460);

export const SPORTS: Sport[] = [
  { nameKey: "sport.football", captionKey: "sportCap.football", photo: 35898730, live: true },
  { nameKey: "sport.basketball", captionKey: "sportCap.basketball", photo: 30555531, live: true },
  { nameKey: "sport.f1", captionKey: "sportCap.f1", photo: 28680795, live: true },
  { nameKey: "sport.tennis", captionKey: "sportCap.tennis", photo: 21855870 },
  { nameKey: "sport.boxing", captionKey: "sportCap.boxing", photo: 28304171, live: true },
  { nameKey: "sport.rugby", captionKey: "sportCap.rugby", photo: 3746003 },
  { nameKey: "sport.americanFootball", captionKey: "sportCap.americanFootball", photo: 274517 },
  { nameKey: "sport.cricket", captionKey: "sportCap.cricket", photo: 29463867 },
];

export type Channel = {
  /** Fictional brand name — intentionally not translated. */
  name: string;
  subKey: Key;
  mark: string;
  shape: "circle" | "square" | "diamond" | "pill";
  from: string;
  to: string;
  /** Optional logo image URL. Only use logos you are licensed to display. */
  logo?: string;
};

export const CHANNELS: Channel[] = [
  { name: "ARENA", subKey: "chSub.sportHd", mark: "A", shape: "square", from: "#22c55e", to: "#0d9488" },
  { name: "GOAL", subKey: "chSub.footballTv", mark: "G", shape: "circle", from: "#38bdf8", to: "#4f46e5" },
  { name: "PITCHSIDE", subKey: "chSub.live", mark: "P", shape: "diamond", from: "#a3e635", to: "#16a34a" },
  { name: "KICKOFF+", subKey: "chSub.matchday", mark: "K", shape: "pill", from: "#f59e0b", to: "#e11d48" },
  { name: "GRIDLINE", subKey: "chSub.motorsport", mark: "G", shape: "square", from: "#ef4444", to: "#9f1239" },
  { name: "COURTSIDE", subKey: "chSub.basketball", mark: "C", shape: "circle", from: "#fb923c", to: "#c2410c" },
  { name: "FIGHT NIGHT", subKey: "chSub.combat", mark: "F", shape: "diamond", from: "#f43f5e", to: "#7f1d1d" },
  { name: "CINE PRIME", subKey: "chSub.movies", mark: "C", shape: "circle", from: "#a78bfa", to: "#7c3aed" },
  { name: "SERIES HUB", subKey: "chSub.boxSets", mark: "S", shape: "square", from: "#f472b6", to: "#be185d" },
  { name: "NOIR+", subKey: "chSub.crimeThriller", mark: "N", shape: "diamond", from: "#94a3b8", to: "#334155" },
  { name: "STORYLINE", subKey: "chSub.drama", mark: "S", shape: "pill", from: "#fbbf24", to: "#b45309" },
  { name: "KIDZONE", subKey: "chSub.family", mark: "K", shape: "circle", from: "#2dd4bf", to: "#0891b2" },
  { name: "DOCU WORLD", subKey: "chSub.documentary", mark: "D", shape: "square", from: "#34d399", to: "#047857" },
  { name: "NEWSROOM", subKey: "chSub.liveNews", mark: "N", shape: "pill", from: "#60a5fa", to: "#1d4ed8" },
];

/* ------------------------------------------------------------------ */
/* Pricing — edit prices here (EUR, one payment per plan)              */
/* ------------------------------------------------------------------ */
export type PlanId = "1m" | "3m" | "6m" | "12m";

export type Plan = {
  id: PlanId;
  labelKey: Key;
  months: number;
  price: number;
  featured?: boolean;
};

export const ALL_PLANS: Plan[] = [
  { id: "1m", labelKey: "plan.1m", months: 1, price: 10 },
  { id: "3m", labelKey: "plan.3m", months: 3, price: 20 },
  { id: "6m", labelKey: "plan.6m", months: 6, price: 35 },
  { id: "12m", labelKey: "plan.12m", months: 12, price: 50, featured: true },
];

export const getPlan = (id: PlanId) => ALL_PLANS.find((p) => p.id === id)!;

/** The three plans shown as cards. */
export const MAIN_PLANS: Plan[] = [getPlan("3m"), getPlan("6m"), getPlan("12m")];
/** Shown as a small "just want to try it?" option under the cards. */
export const SHORT_PLAN: Plan = getPlan("1m");

/** What the plan would cost if you simply paid month by month. */
export const fullPrice = (p: Plan) => p.months * SHORT_PLAN.price;
export const saveAmount = (p: Plan) => fullPrice(p) - p.price;
export const savePct = (p: Plan) => Math.round((1 - p.price / fullPrice(p)) * 100);
export const perMonth = (p: Plan) => p.price / p.months;

/* ------------------------------------------------------------------ */
/* FAQ (question / answer translation keys)                            */
/* ------------------------------------------------------------------ */
export const FAQ_ITEMS: { q: Key; a: Key }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
];

/* ------------------------------------------------------------------ */
/* Devices offered in the order form                                   */
/* Brand names stay as-is; generic ones use a translation key.         */
/* ------------------------------------------------------------------ */
export type Device = { id: string; label?: string; labelKey?: Key };

export const DEVICES: Device[] = [
  { id: "smart-tv", label: "Smart TV" },
  { id: "android-tv", labelKey: "device.androidTv" },
  { id: "fire-tv", label: "Amazon Fire TV Stick" },
  { id: "apple-tv", label: "Apple TV" },
  { id: "ios", label: "iPhone / iPad" },
  { id: "android", labelKey: "device.phone" },
  { id: "computer", label: "Windows / Mac" },
  { id: "mag", label: "MAG / Formuler" },
  { id: "other", labelKey: "device.other" },
];
