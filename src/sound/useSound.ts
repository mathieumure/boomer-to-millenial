import { useTheme } from "styled-components";
import { useCallback, useEffect, useRef } from "react";

type SoundType = "add" | "cassette" | "delete" | "shuffle" | "click";
const soundLibrary: Record<SoundType, { url: string; volume: number }> = {
  add: { url: `sound/add.mp3`, volume: 0.2 },
  cassette: { url: `sound/cassette.mp3`, volume: 0.4 },
  delete: { url: `sound/delete.mp3`, volume: 0.15 },
  shuffle: { url: `sound/shuffle.mp3`, volume: 0.25 },
  click: { url: `sound/click.mp3`, volume: 0.4 },
};

export const useSound = () => {
  const theme = useTheme();

  // Pre-load audio
  const audioLoaded = useRef<boolean>(false);
  useEffect(() => {
    if (theme.features.sound && !audioLoaded.current) {
      audioLoaded.current = true;
      Object.values(soundLibrary).forEach((sound) => new Audio(sound.url));
    }
  }, [theme]);

  const playSound = useCallback(
    (name: SoundType) => {
      if (theme.features.sound) {
        const sound = new Audio(soundLibrary[name].url);
        sound.volume = soundLibrary[name].volume;
        return sound.play();
      }
    },
    [theme]
  );

  return { playSound };
};
