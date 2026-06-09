import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

interface Props {
  delay?: number;
}

// Pill CTA: "Apply to Speak →". Spring pop-in, soft pulsing glow, nudging arrow.
export const ApplyButton: React.FC<Props> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 140, mass: 0.7 },
  });
  const scale = interpolate(pop, [0, 1], [0.7, 1]);
  const opacity = interpolate(pop, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  // Living details: breathing glow + an arrow that nudges forward.
  const glow = 24 + (0.5 + 0.5 * Math.sin(frame * 0.12)) * 26;
  const arrowNudge = (0.5 + 0.5 * Math.sin(frame * 0.16)) * 10;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        padding: "30px 56px",
        borderRadius: 999,
        background: `linear-gradient(135deg, ${COLORS.accentFrom}, ${COLORS.accentTo})`,
        color: COLORS.bgTop,
        fontFamily: FONT,
        fontSize: 52,
        fontWeight: 800,
        letterSpacing: 0.5,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: `0 0 ${glow}px rgba(52,211,153,0.7), 0 16px 40px rgba(0,0,0,0.4)`,
      }}
    >
      <span>Apply to Speak</span>
      <span style={{ display: "inline-block", transform: `translateX(${arrowNudge}px)` }}>
        →
      </span>
    </div>
  );
};
