import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/SourceCodePro";

// Modern, highly legible tech font. Blocks render until ready.
const { fontFamily } = loadInter("normal", {
  weights: ["400", "600", "800"],
  subsets: ["latin"],
});

// Monospace for the fake code editor in the opening scene.
const { fontFamily: monoFamily } = loadMono("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

export const FONT = fontFamily;
export const MONO = monoFamily;

// ── Palette ────────────────────────────────────────────────────────────────
// Deep-ocean-green world: near-black emerald base, luminous green/teal/aqua
// accents, and a bright emerald→lime CTA that glows against the dark water.
export const COLORS = {
  bgTop: "#02120d", // near-black deep green (top of gradient)
  bgMid: "#063a2c", // ocean emerald (mid glow)
  bgBottom: "#021a14", // deep abyssal green (bottom)
  text: "#eafff6",
  muted: "rgba(223,255,242,0.74)",
  faint: "rgba(223,255,242,0.42)",
  // Dazzling green CTA gradient — emerald into electric lime.
  accentFrom: "#10b981",
  accentTo: "#a3e635",
  // Luminous accents used by blobs / chips / cards / highlights.
  teal: "#2dd4bf",
  violet: "#059669", // (name kept for Background API) deep emerald glow
  mint: "#5eead4", // aqua mint
  glow: "#34d399", // signature emerald — highlights, glows, cursor
  // Editor syntax-ish colors.
  termGreen: "#5eead4",
  termRed: "#fb7185",
} as const;

// ── Composition timing ──────────────────────────────────────────────────────
export const FPS = 30;
export const DURATION = 900; // 30s @ 30fps

// Scenes are SEQUENTIAL (no time overlap). Each scene fades its own content in
// and out within its window, so transitions dissolve through the background
// instead of stacking two layouts on top of each other.
export const SCENES = {
  opening: { from: 0, durationInFrames: 168 }, // 0.0 – 5.6s  (fake CFP editor)
  perfect: { from: 168, durationInFrames: 84 }, // 5.6 – 8.4s ("…didn't need to be perfect?")
  community: { from: 252, durationInFrames: 198 }, // 8.4 – 15.0s (reassure + chat cards)
  painpoint: { from: 450, durationInFrames: 144 }, // 15.0 – 19.8s (split screen)
  peak: { from: 594, durationInFrames: 114 }, // 19.8 – 23.6s (emotional peak)
  cta: { from: 708, durationInFrames: 192 }, // 23.6 – 30.0s (CTA)
} as const;

// ── Opening editor script ───────────────────────────────────────────────────
export const EDITOR = {
  file: "CFP_SUBMISSION.md",
  prompt: "$ cfp submit --title",
  typed: "Ever wanted to give a tech talk...",
  deleted: "[DELETED]  ...but never submitted?",
};

// ── Reassure scene data ─────────────────────────────────────────────────────
export const REASSURE_LINES = [
  "No experience needed.",
  "Just 5 minutes.",
  "A supportive audience.",
  "Zero judgment.",
];

export interface Chat {
  name: string;
  role: string;
  message: string;
  grad: [string, string];
}

export const CHATS: Chat[] = [
  {
    name: "Sarah M.",
    role: "React Dev",
    message: "Hey everyone! Just submitted my first CFP 🚀",
    grad: ["#5eead4", "#2dd4bf"],
  },
  {
    name: "Alex K.",
    role: "Designer",
    message: "OMG congrats! You're going to crush it 🙌",
    grad: ["#a3e635", "#65a30d"],
  },
  {
    name: "Dave L.",
    role: "Staff Eng",
    message: "No experience needed — we all start somewhere.",
    grad: ["#34d399", "#10b981"],
  },
];

// ── Pain-point scene data ───────────────────────────────────────────────────
export const WORRIES = [
  "I'm not an expert.",
  "What if I mess up?",
  "Someone else knows more.",
];

export const REACTIONS = [
  "The audience is nodding.",
  "People relate to your story.",
  "Applause — you did it.",
];

// ── Burned-in captions (the voiceover, as a high-contrast caption track) ─────
export interface Caption {
  text: string;
  startMs: number;
  endMs: number;
}

export const CAPTIONS: Caption[] = [
  { text: "Ever wanted to give a tech talk…", startMs: 400, endMs: 3000 },
  { text: "…but hitting 'submit' feels terrifying.", startMs: 3000, endMs: 5400 },
  { text: "What if it didn't need to be perfect?", startMs: 5700, endMs: 8200 },
  { text: "Built for your very first talk.", startMs: 8600, endMs: 11500 },
  { text: "No pressure. No expertise required.", startMs: 11500, endMs: 14800 },
  { text: "The best talks come from people sharing what they learned.", startMs: 15200, endMs: 19600 },
  { text: "One small talk can change your confidence.", startMs: 20000, endMs: 23400 },
  { text: "Your voice matters. Apply today.", startMs: 23900, endMs: 29600 },
];
