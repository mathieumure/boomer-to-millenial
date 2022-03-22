import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { ifFeature } from "../baseDesign/utils";

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 2rem;
  top: 2rem;
  border: 2px solid black;
  padding: 2.5rem 2rem;
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

type SlidePanelProps = {
  onBeforeEnter: () => void;
  onAfterLeave: () => void;
  onVisibleChange: (isVisible: boolean) => any;
  visible: boolean;
};

export const SlidePanel: FC<SlidePanelProps> = ({
  visible,
  onBeforeEnter,
  onAfterLeave,
  onVisibleChange,
  children,
}) => {
  const { features } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInnerVisible, setIsInnerVisible] = useState(visible);

  const slideIn = () => {
    onBeforeEnter();

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
      onAfterLeave();
      return;
    }
    const animation = wrapperRef.current.animate([KEYFRAME_IN, KEYFRAME_OUT], {
      duration: features.microinteractions ? ANIMATION_DURATION : 0,
      easing: ANIMATION_EASING,
    });

    animation.onfinish = () => {
      setIsInnerVisible(false);
      onVisibleChange(false);
      onAfterLeave();
    };
  };

  useEffect(() => {
    const handleEscapePressed = (event: KeyboardEvent) => {
      if (event.code === "Escape" && event.ctrlKey) {
        if (visible) {
          slideOut();
        } else {
          setIsInnerVisible(true);
          onVisibleChange(true);
        }
      }
    };
    window.addEventListener("keydown", handleEscapePressed);

    return () => {
      window.removeEventListener("keydown", handleEscapePressed);
    };
  }, [visible]);

  useLayoutEffect(() => {
    if (visible) {
      slideIn();
    } else {
      slideOut();
    }
  }, [visible]);

  return isInnerVisible ? <Wrapper ref={wrapperRef}>{children}</Wrapper> : null;
};
