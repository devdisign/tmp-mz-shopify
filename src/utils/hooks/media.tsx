import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { memo } from "preact/compat";

const useMedia = (sources: [string, string][], type: "audio" | "video", autoplay = true) => {
  const mediaEl = useMemo(() => {
    const mediaEl = document.createElement(type);

    mediaEl.muted = true;
    mediaEl.volume = 0.33;
    mediaEl.loop = true;
    mediaEl.setAttribute("playsinline", "");
    if (autoplay) { mediaEl.setAttribute("autoplay", ""); }

    mediaEl.append(...sources.map(([source, type]) => {
      const sourceEl = document.createElement("source");
      sourceEl.setAttribute("src", source);
      sourceEl.setAttribute("type", type);
      return sourceEl;
    }));

    return mediaEl;
  }, [autoplay, sources, type]);

  // Audio
  const [muted, setMuted] = useState(mediaEl.muted);

  const updateMuted = useCallback((newMute?: boolean) => {
    setMuted(muteState => {
      const nextMute = newMute ?? !muteState;
      mediaEl.muted = nextMute;
      return nextMute;
    });
  }, [mediaEl]);

  const toggleMuted = useCallback(() => updateMuted(), [updateMuted]);
  const mute = useCallback(() => updateMuted(true), [updateMuted]);
  const unmute = useCallback(() => updateMuted(false), [updateMuted]);

  const audio = useMemo(
    () => ({ muted, toggle: toggleMuted, mute, unmute }),
    [mute, muted, toggleMuted, unmute]
  );

  // Track
  const [paused, setPaused] = useState(mediaEl.paused);
  const [canplay, setCanplay] = useState(false);

  useEffect(() => {
    mediaEl.addEventListener("canplay", () => setCanplay(true), { once: true });
  }, [mediaEl]);

  const updatePaused = useCallback((newPaused?: boolean) => {
    setPaused(pauseState => {
      const nextPaused = newPaused ?? !pauseState;
      nextPaused ? mediaEl.pause() : mediaEl.play();
      return nextPaused;
    });
  }, [mediaEl]);

  const togglePaused = useCallback(() => updatePaused(), [updatePaused]);
  const play = useCallback(() => updatePaused(false), [updatePaused]);
  const pause = useCallback(() => updatePaused(true), [updatePaused]);

  const track = useMemo(
    () => ({ paused, playing: !paused, toggle: togglePaused, canplay, play, pause }),
    [canplay, pause, paused, play, togglePaused]
  );

  // Component
  // TODO: get correct specific types for MediaComponent using mediaEl
  const MediaComponent = memo((props: Record<string, string>) => {
    // TODO: mediaEl mutates on render
    Object.entries(props).map(([key, value]) => mediaEl.setAttribute(key, value));
    return <span ref={(nodeElement) => { nodeElement?.appendChild(mediaEl); }} />;
  });

  // TODO: only permitted to have one rendering instance
  return [audio, track, MediaComponent] as const;
};

export default useMedia;
