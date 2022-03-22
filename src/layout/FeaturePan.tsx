import {
  FormEvent,
  FC,
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import styled, { css, useTheme } from "styled-components";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { ThemeFeatures } from "../baseDesign/theme";
import { ifFeature } from "../baseDesign/utils";

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 2rem;
  top: 2rem;
  border: 2px solid black;
  background-color: white;

  ${ifFeature(
    "baseCss",
    css`
      border-radius: var(--border-radius-element);
      overflow: hidden;
      border: 1px solid var(--grey-300);
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
    `
  )}
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
  column-gap: 1rem;
`;

const KEYFRAME_IN = {
  opacity: 1,
  transform: "translateY(0)",
};

const KEYFRAME_OUT = {
  opacity: 0,
  transform: "translateY(-15px)",
};

const ANIMATION_DURATION = 200;
const ANIMATION_EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)";

const handleFeatureActivation = (feature: keyof ThemeFeatures) => {
  if (feature) {
    window.activateFeature(feature);
  }
};

export const FeaturePan: FC = () => {
  const { features } = useTheme();
  const [inputValue, setInputValue] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isValueValid = useMemo(
    () => Object.keys(features).includes(inputValue),
    [inputValue]
  );

  const activateFeature = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      handleFeatureActivation(inputValue as keyof ThemeFeatures);
      slideOut();
    }
  };

  const slideIn = () => {
    inputRef.current?.focus();

    if (!wrapperRef.current || !features.microinteractions) {
      return;
    }
    wrapperRef.current.animate([KEYFRAME_OUT, KEYFRAME_IN], {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    });
  };

  const slideOut = () => {
    if (!wrapperRef.current) {
      return;
    }
    const animation = wrapperRef.current.animate([KEYFRAME_IN, KEYFRAME_OUT], {
      duration: features.microinteractions ? ANIMATION_DURATION : 0,
      easing: ANIMATION_EASING,
    });

    animation.onfinish = () => {
      setIsVisible(false);
      setInputValue("");
    };
  };

  useEffect(() => {
    const handleEscapePressed = (event: KeyboardEvent) => {
      if (event.code === "Escape" && event.ctrlKey) {
        if (isVisible) {
          slideOut();
        } else {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("keydown", handleEscapePressed);

    return () => {
      window.removeEventListener("keydown", handleEscapePressed);
    };
  }, [isVisible]);

  useLayoutEffect(() => {
    if (isVisible) {
      slideIn();
    }
  }, [isVisible]);

  return isVisible ? (
    <Wrapper ref={wrapperRef}>
      <StyledForm onSubmit={activateFeature}>
        <Input
          ref={inputRef}
          label="Feature"
          list="theme-keys"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required={true}
        />
        <datalist id="theme-keys">
          {Object.keys(features).map((it) => (
            <option value={it} key={it} />
          ))}
        </datalist>
        <Button disabled={!isValueValid}>Activer</Button>
      </StyledForm>
    </Wrapper>
  ) : null;
};
