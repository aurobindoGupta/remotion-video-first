import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

type Tone = "worry" | "reaction";

interface Props {
  text: string;
  index: number;
  delay: number;
  tone: Tone;
}

// A small floating bubble used in the split-screen pain-point scene.
// "worry" bubbles are dim and anxious (slide in from the left); "reaction"
// bubbles are bright and reassuring (slide in from the right).
export const Bubble: React.FC<Props> = ({ text, index, delay, tone }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 110, mass: 0.9 },
  });
  const opacity = interpolate(enter, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const dir = tone === "worry" ? -70 : 70;
  const x = interpolate(enter, [0, 1], [dir, 0]);
  const bob = Math.sin(frame * 0.04 + index * 1.5) * 6;

  const worry = tone === "worry";

  return (
    <div
      style={{
        alignSelf: worry ? "flex-start" : "flex-end",
        maxWidth: 560,
        padding: "22px 30px",
        borderRadius: worry ? "26px 26px 26px 6px" : "26px 26px 6px 26px",
        background: worry ? "rgba(255,255,255,0.05)" : "rgba(52,211,153,0.12)",
        border: `1px solid ${worry ? "rgba(255,255,255,0.12)" : "rgba(52,211,153,0.4)"}`,
        color: worry ? COLORS.faint : COLORS.text,
        fontFamily: FONT,
        fontSize: 36,
        fontWeight: 600,
        lineHeight: 1.25,
        opacity,
        transform: `translateX(${x}px) translateY(${bob}px)`,
        boxShadow: worry ? "none" : "0 14px 40px rgba(16,185,129,0.18)",
      }}
    >
      {worry ? text : `“${text}”`}
    </div>
  );
};
