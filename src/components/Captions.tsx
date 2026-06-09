import { useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTIONS, COLORS, FONT } from "../theme";

// Burned-in caption track. High-contrast backing + bold white text, pinned to
// the lower-third safe area so it never collides with platform UI overlays.
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;

  const current = CAPTIONS.find((c) => ms >= c.startMs && ms < c.endMs);
  if (!current) return null;

  // Quick fade at the edges of each caption window for a clean swap.
  const FADE = 120; // ms
  const into = (ms - current.startMs) / FADE;
  const outOf = (current.endMs - ms) / FADE;
  const opacity = Math.max(0, Math.min(1, into, outOf));

  return (
    <div
      style={{
        position: "absolute",
        bottom: "7%",
        left: "10%",
        right: "10%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity,
          maxWidth: 1280,
          padding: "16px 36px",
          borderRadius: 16,
          background: "rgba(0,0,0,0.62)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: COLORS.text,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.2,
          textAlign: "center",
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
        }}
      >
        {current.text}
      </div>
    </div>
  );
};
