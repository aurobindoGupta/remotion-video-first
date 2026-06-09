import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { DURATION, FPS } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FirstTimeSpeakers"
        component={MyComposition}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
