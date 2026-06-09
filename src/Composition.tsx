import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "./components/Background";
import { Captions } from "./components/Captions";
import { CodeEditor } from "./components/CodeEditor";
import { ChatCard } from "./components/ChatCard";
import { Bubble } from "./components/Bubble";
import { ApplyButton } from "./components/ApplyButton";
import {
  CHATS,
  COLORS,
  FONT,
  REACTIONS,
  REASSURE_LINES,
  SCENES,
  WORRIES,
} from "./theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

// ── Shared helpers ───────────────────────────────────────────────────────────

// Fades a scene's content fully in at the start and fully out at the end of its
// own window. Because scenes are sequential (non-overlapping), the outgoing
// scene reaches opacity 0 before the next appears — they dissolve through the
// background instead of stacking on top of each other.
const SceneWrap: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  justify?: "center" | "flex-start";
  pushScale?: number;
}> = ({ durationInFrames, children, justify = "center", pushScale = 1.04 }) => {
  const frame = useCurrentFrame();
  const FADE = 14;
  const opacity = interpolate(
    frame,
    [0, FADE, durationInFrames - FADE, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const push = interpolate(frame, [0, durationInFrames], [1, pushScale], {
    easing: EASE,
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${push})`,
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: justify,
        textAlign: "center",
        padding: "90px 140px 170px",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Word-by-word entrance. Highlighted words pick up the warm accent color.
const Heading: React.FC<{
  text: string;
  fontSize: number;
  delay?: number;
  highlight?: string[];
  maxWidth?: number;
}> = ({ text, fontSize, delay = 0, highlight = [], maxWidth = 1500 }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <h1
      style={{
        margin: 0,
        maxWidth,
        fontSize,
        fontWeight: 800,
        lineHeight: 1.08,
        color: COLORS.text,
        letterSpacing: -1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 0.28em",
      }}
    >
      {words.map((word, i) => {
        const start = delay + i * 3.5;
        const o = interpolate(frame, [start, start + 16], [0, 1], {
          easing: EASE,
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [start, start + 16], [26, 0], {
          easing: EASE,
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isHot = highlight.includes(word.replace(/[.?,]/g, ""));
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: o,
              transform: `translateY(${y}px)`,
              color: isHot ? COLORS.accentTo : COLORS.text,
            }}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
};

const Chip: React.FC<{ label: string; index: number; delayBase?: number }> = ({
  label,
  index,
  delayBase = 24,
}) => {
  const frame = useCurrentFrame();
  const start = delayBase + index * 8;
  const o = interpolate(frame, [start, start + 16], [0, 1], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [start, start + 16], [18, 0], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity: o,
        transform: `translateY(${y}px)`,
        padding: "16px 34px",
        borderRadius: 999,
        fontSize: 38,
        fontWeight: 600,
        color: COLORS.text,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.16)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
};

// ── Scenes ───────────────────────────────────────────────────────────────────

// OPENING — the fake CFP editor that types a talk title, then deletes it.
const OpeningScene: React.FC = () => (
  <SceneWrap durationInFrames={SCENES.opening.durationInFrames} pushScale={1.03}>
    <CodeEditor />
  </SceneWrap>
);

// PERFECT — the reframe line.
const PerfectScene: React.FC = () => (
  <SceneWrap durationInFrames={SCENES.perfect.durationInFrames}>
    <Heading
      text="What if your first talk didn't need to be perfect?"
      fontSize={96}
      highlight={["perfect?"]}
      maxWidth={1500}
    />
  </SceneWrap>
);

// COMMUNITY — reassuring copy on the left, supportive chat cards on the right.
const CommunityScene: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENES.community.durationInFrames} pushScale={1.03}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 90,
          width: "100%",
        }}
      >
        {/* Left: headline + cycling reassurance chips */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            gap: 34,
            maxWidth: 760,
          }}
        >
          <Heading text="First talks start here." fontSize={84} highlight={["here."]} maxWidth={720} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
            {REASSURE_LINES.map((c, i) => (
              <Chip key={c} label={c} index={i} delayBase={30} />
            ))}
          </div>
        </div>

        {/* Right: chat cards spring in one by one */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {CHATS.map((chat, i) => (
            <Sequence key={chat.name} from={26 + i * 30} layout="none">
              <ChatCard chat={chat} index={i} delay={0} />
            </Sequence>
          ))}
          {/* "Just submitted!" pill that pops after the cards land. */}
          <Sequence from={26 + CHATS.length * 30 + 14} layout="none">
            <JustSubmitted />
          </Sequence>
        </div>
      </div>
    </SceneWrap>
  );
};

const JustSubmitted: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 14], [0, 1], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s = interpolate(frame, [0, 18], [0.8, 1], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        alignSelf: "center",
        marginTop: 8,
        opacity: o,
        transform: `scale(${s})`,
        padding: "16px 34px",
        borderRadius: 999,
        fontSize: 34,
        fontWeight: 800,
        color: COLORS.bgTop,
        background: `linear-gradient(135deg, ${COLORS.accentFrom}, ${COLORS.accentTo})`,
        boxShadow: "0 14px 40px rgba(52,211,153,0.4)",
      }}
    >
      ✅ Application submitted
    </div>
  );
};

// PAIN POINT — split screen: anxious worries vs warm reactions.
const PainPointScene: React.FC = () => (
  <SceneWrap durationInFrames={SCENES.painpoint.durationInFrames} justify="flex-start" pushScale={1.025}>
    <Heading
      text="The tech community needs more voices."
      fontSize={78}
      highlight={["voices."]}
      maxWidth={1400}
    />
    <div
      style={{
        display: "flex",
        gap: 70,
        marginTop: 70,
        width: "100%",
        maxWidth: 1480,
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 26 }}>
        {WORRIES.map((w, i) => (
          <Bubble key={w} text={w} index={i} delay={16 + i * 16} tone="worry" />
        ))}
      </div>
      <div style={{ width: 2, background: "rgba(255,255,255,0.12)" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 26 }}>
        {REACTIONS.map((r, i) => (
          <Bubble key={r} text={r} index={i} delay={44 + i * 16} tone="reaction" />
        ))}
      </div>
    </div>
  </SceneWrap>
);

// EMOTIONAL PEAK — two-beat reveal.
const PeakScene: React.FC = () => {
  const frame = useCurrentFrame();
  const secondO = interpolate(frame, [56, 74], [0, 1], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <SceneWrap durationInFrames={SCENES.peak.durationInFrames}>
      <Heading
        text="Your first talk could inspire someone."
        fontSize={92}
        highlight={["inspire"]}
        maxWidth={1400}
      />
      <div style={{ height: 40 }} />
      <div style={{ opacity: secondO }}>
        <Heading text="Your voice matters." fontSize={120} delay={56} highlight={["voice"]} />
      </div>
    </SceneWrap>
  );
};

// CTA — logo, headline, button, URL.
const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const logoO = interpolate(frame, [4, 22], [0, 1], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoS = interpolate(frame, [4, 26], [0.8, 1], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const footerO = interpolate(frame, [44, 64], [0, 1], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <SceneWrap durationInFrames={SCENES.cta.durationInFrames}>
      <Img
        src={staticFile("logo.png")}
        style={{
          width: 150,
          height: 150,
          objectFit: "contain",
          opacity: logoO,
          transform: `scale(${logoS})`,
          marginBottom: 28,
        }}
      />
      <Heading text="Give your first tech talk." fontSize={86} highlight={["first"]} maxWidth={1300} />
      <div style={{ marginTop: 18 }}>
        <Heading text="Apply now." fontSize={120} delay={10} highlight={["now."]} />
      </div>
      <div style={{ marginTop: 56 }}>
        <ApplyButton delay={20} />
      </div>
      <div
        style={{
          marginTop: 44,
          opacity: footerO,
          fontSize: 42,
          fontWeight: 600,
          letterSpacing: 1,
          color: COLORS.muted,
        }}
      >
        firsttimespeakers.com
      </div>
    </SceneWrap>
  );
};

// ── Root composition ─────────────────────────────────────────────────────────

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow global camera push across the whole piece.
  const camera = interpolate(frame, [0, durationInFrames], [1, 1.05], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Music: ease volume in over the first second and out over the last ~1.5s.
  const musicVol = interpolate(
    frame,
    [0, 30, durationInFrames - 45, durationInFrames],
    [0, 0.7, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgTop, fontFamily: FONT }}>
      <Audio src={staticFile("music.mp3")} volume={musicVol} loop />

      <AbsoluteFill style={{ transform: `scale(${camera})`, transformOrigin: "center" }}>
        <Background />
        <Sequence {...SCENES.opening}>
          <OpeningScene />
        </Sequence>
        <Sequence {...SCENES.perfect}>
          <PerfectScene />
        </Sequence>
        <Sequence {...SCENES.community}>
          <CommunityScene />
        </Sequence>
        <Sequence {...SCENES.painpoint}>
          <PainPointScene />
        </Sequence>
        <Sequence {...SCENES.peak}>
          <PeakScene />
        </Sequence>
        <Sequence {...SCENES.cta}>
          <CtaScene />
        </Sequence>
      </AbsoluteFill>

      <Captions />
    </AbsoluteFill>
  );
};
