import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Chat, COLORS, FONT } from "../theme";

interface Props {
  chat: Chat;
  index: number;
  delay: number;
}

// A chat-message card that springs in from the right, like a supportive
// community reacting in real time.
export const ChatCard: React.FC<Props> = ({ chat, index, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.9 },
  });
  const opacity = interpolate(enter, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(enter, [0, 1], [90, 0]);
  const bob = Math.sin(frame * 0.045 + index * 1.7) * 5;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 22,
        width: 720,
        padding: "24px 28px",
        borderRadius: 24,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 18px 44px rgba(0,0,0,0.32)",
        opacity,
        transform: `translateX(${x}px) translateY(${bob}px)`,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          flexShrink: 0,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${chat.grad[0]}, ${chat.grad[1]})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 32,
          fontWeight: 800,
          boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.25)",
        }}
      >
        {chat.name[0]}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ color: COLORS.text, fontSize: 30, fontWeight: 800 }}>
            {chat.name}
          </span>
          <span style={{ color: COLORS.faint, fontSize: 24, fontWeight: 600 }}>
            {chat.role}
          </span>
        </div>
        <div style={{ color: COLORS.muted, fontSize: 28, lineHeight: 1.25 }}>
          {chat.message}
        </div>
      </div>
    </div>
  );
};
