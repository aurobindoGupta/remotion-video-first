import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

// Deterministic pseudo-random in [0,1) — Remotion renders must be reproducible,
// so we hash the index instead of using Math.random().
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const PARTICLE_COUNT = 46;

const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {new Array(PARTICLE_COUNT).fill(0).map((_, i) => {
        const baseX = rand(i) * 100; // vw %
        const baseY = rand(i + 100) * 100; // vh %
        const size = 2 + rand(i + 200) * 6;
        const speed = 0.08 + rand(i + 300) * 0.22;
        const drift = rand(i + 400) * 24;
        const phase = rand(i + 500) * Math.PI * 2;

        // Slow upward drift that wraps, plus a gentle horizontal sway.
        const y = (baseY - frame * speed + 120) % 120;
        const x = baseX + Math.sin(frame * 0.02 + phase) * (drift / 100) * 6;
        const twinkle = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(frame * 0.05 + phase));

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              opacity: twinkle * 0.5,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}
    </>
  );
};

const Blob: React.FC<{
  color: string;
  size: number;
  cx: number;
  cy: number;
  ax: number;
  ay: number;
  phase: number;
}> = ({ color, size, cx, cy, ax, ay, phase }) => {
  const frame = useCurrentFrame();
  const x = cx + Math.sin(frame * 0.012 + phase) * ax;
  const y = cy + Math.cos(frame * 0.01 + phase) * ay;
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: "translate(-50%, -50%)",
        filter: "blur(40px)",
        opacity: 0.55,
      }}
    />
  );
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // Very slow vertical parallax of the blob field for a living, calm feel.
  const drift = interpolate(frame, [0, durationInFrames], [0, -40]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(130% 110% at 50% 8%, ${COLORS.bgMid} 0%, ${COLORS.bgTop} 48%, ${COLORS.bgBottom} 100%)`,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ transform: `translateY(${drift}px)` }}>
        <Blob color={COLORS.glow} size={920} cx={20} cy={20} ax={6} ay={4} phase={0} />
        <Blob color={COLORS.teal} size={820} cx={84} cy={38} ax={5} ay={6} phase={2} />
        <Blob color={COLORS.mint} size={760} cx={52} cy={92} ax={7} ay={3} phase={4} />
        <Blob color={COLORS.violet} size={680} cx={68} cy={70} ax={5} ay={5} phase={1.4} />
      </AbsoluteFill>
      <Particles />
      {/* Soft emerald sheen + vignette to anchor the bright center text. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 80% at 50% 42%, rgba(52,211,153,0.10) 0%, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
