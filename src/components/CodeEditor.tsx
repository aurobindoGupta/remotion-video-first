import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, EDITOR, MONO } from "../theme";

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ width: 20, height: 20, borderRadius: "50%", background: color }} />
);

// A fake "CFP_SUBMISSION.md" editor window. The title is typed out character by
// character with a blinking cursor, then deleted — visualizing the moment of
// almost-submitting a conference talk and backing out.
export const CodeEditor: React.FC = () => {
  const frame = useCurrentFrame();

  // Window pops in.
  const winO = interpolate(frame, [6, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const winY = interpolate(frame, [6, 26], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typewriter: reveal one char every ~2 frames after the window settles.
  const typeStart = 28;
  const typed = EDITOR.typed;
  const charsShown = Math.max(
    0,
    Math.min(typed.length, Math.floor((frame - typeStart) / 2)),
  );
  const typing = frame >= typeStart && charsShown < typed.length;
  const fullyTyped = charsShown >= typed.length;

  // After it's typed, hold a beat, then swap the line for a red [DELETED] note.
  const deleteAt = typeStart + Math.ceil(typed.length * 2) + 18;
  const deleted = frame >= deleteAt;

  // Blinking cursor.
  const cursorOn = Math.floor(frame / 14) % 2 === 0;

  return (
    <div
      style={{
        width: 1180,
        opacity: winO,
        transform: `translateY(${winY}px)`,
        borderRadius: 22,
        overflow: "hidden",
        background: "rgba(15,20,40,0.92)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
        fontFamily: MONO,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "20px 28px",
          background: "rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Dot color="#ff5f57" />
        <Dot color="#febc2e" />
        <Dot color="#28c840" />
        <div
          style={{
            flex: 1,
            textAlign: "center",
            color: COLORS.faint,
            fontSize: 26,
            letterSpacing: 1,
          }}
        >
          {EDITOR.file}
        </div>
        <div style={{ width: 76 }} />
      </div>

      {/* Body */}
      <div style={{ padding: "44px 48px", minHeight: 260 }}>
        <div style={{ color: COLORS.termGreen, fontSize: 30, marginBottom: 36 }}>
          {EDITOR.prompt}
        </div>

        {deleted ? (
          <div style={{ fontSize: 38, color: COLORS.faint }}>
            <span style={{ color: COLORS.termRed, fontWeight: 600 }}>[DELETED]</span>{" "}
            <span style={{ textDecoration: "line-through" }}>
              ...but never submitted?
            </span>
          </div>
        ) : (
          <div style={{ fontSize: 40, color: COLORS.text, lineHeight: 1.3 }}>
            {typed.slice(0, charsShown)}
            <span
              style={{
                display: "inline-block",
                width: 16,
                height: 40,
                marginLeft: 4,
                transform: "translateY(6px)",
                background: COLORS.accentTo,
                opacity: typing || cursorOn || fullyTyped ? (cursorOn ? 1 : 0.25) : 0,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
