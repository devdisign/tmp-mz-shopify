import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import ReactPlayer from "react-player/vimeo";

import { useBoolean } from "@utils/hooks";

interface MediaProps {
  url: string,
}

const Media: FunctionComponent<MediaProps> = ({
  url
}) => {
  const { state: playing, ...handlePlaying } = useBoolean(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && playing) {
        handlePlaying.off();
        handlePlaying.on();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [playing]);

  return (
    <ReactPlayer
      url={url}
      playsinline
      playing={playing}
      controls={false}
      loop
      muted={musicMuted}
      volume={musicMuted ? 0 : 0.5}
      style={{ display: "none" }}
      wrapper={"span"}
    />
  );
};

export default Media;
