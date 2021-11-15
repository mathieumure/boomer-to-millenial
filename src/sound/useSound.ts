import { useTheme } from "styled-components";
import { useCallback, useEffect, useRef } from "react";

type SoundType = "add" | "cassette" | "delete" | "shuffle" | "click";
const soundLibrary: Record<SoundType, { url: string; volume: number }> = {
  add: { url: `sound/add.mp3`, volume: 0.2 },
  cassette: { url: `sound/cassette.mp3`, volume: 0.4 },
  delete: { url: `sound/delete.mp3`, volume: 0.15 },
  shuffle: { url: `sound/shuffle.mp3`, volume: 0.25 },
  click: { url: `sound/click.mp3`, volume: 0.2 },
};

export const useSound = () => {
  const theme = useTheme();

  // Pre-load audio
  const audioLoaded = useRef<boolean>(false);
  useEffect(() => {
    if (theme.features.sound && !audioLoaded.current) {
      audioLoaded.current = true;
      Object.values(soundLibrary).forEach((sound) => {
        new Audio(sound.url);
      });
    }
  }, [theme]);

  const playSound = useCallback(
    (name: SoundType, spatialization?: "left-to-right" | "right" | "left") => {
      if (theme.features.sound) {
        const sound = new Audio(soundLibrary[name].url);
        sound.volume = soundLibrary[name].volume;

        if (
          theme.features.spatialisation &&
          spatialization === "left-to-right"
        ) {
          const audioContext = new AudioContext();
          const track = audioContext.createMediaElementSource(sound);

          const stereoNode = new StereoPannerNode(audioContext, { pan: -1 });

          track.connect(stereoNode).connect(audioContext.destination);

          sound.addEventListener("timeupdate", () => {
            // Must be à right à 33% of the duration
            // t=0 => 0% (full left, pan = -1)
            // t=10% => 30% (center, pan = 0)
            // t=33% => 100% (right, pan = 1)
            // t=100% => 100% (right, pan = 1)
            const progression = Math.min(
              (sound.currentTime / sound.duration) * 3,
              1
            );
            stereoNode.pan.value = progression * 2 - 1;
          });
        }

        if (theme.features.spatialisation && spatialization === "right") {
          const audioContext = new AudioContext();
          const track = audioContext.createMediaElementSource(sound);

          const stereoNode = new StereoPannerNode(audioContext, { pan: 1 });

          track.connect(stereoNode).connect(audioContext.destination);
        }

        if (theme.features.spatialisation && spatialization === "left") {
          const audioContext = new AudioContext();
          const track = audioContext.createMediaElementSource(sound);

          const stereoNode = new StereoPannerNode(audioContext, { pan: -1 });

          track.connect(stereoNode).connect(audioContext.destination);
        }

        return sound.play();
      }
    },
    [theme]
  );

  return { playSound };
};
