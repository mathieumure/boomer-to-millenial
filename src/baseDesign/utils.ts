import { Theme, ThemeFeatures } from "./theme";
import { css } from "styled-components";

export const ifFeature =
  (featureName: keyof ThemeFeatures, css: any) => (props: { theme: Theme }) =>
    props.theme.features[featureName] ? css : undefined;

export const ifNotFeature =
  (featureName: keyof ThemeFeatures, css: any) => (props: { theme: Theme }) =>
    props.theme.features[featureName] ? undefined : css;

export const withKeyboardFocus = (options?: {
  relativeTarget?: string;
  initialShadow?: string;
}) => {
  const { relativeTarget = "", initialShadow = "none" } = options || {};

  return css`
    &:focus-visible ${relativeTarget} {
      box-shadow: 0 0 0 3px var(--primary-light);
    }
    // fallback for older browsers
    &:focus ${relativeTarget} {
      box-shadow: 0 0 0 3px var(--primary-light);
    }
    // no focus ring on browsers that support :focus-visible
    &:focus:not(:focus-visible) ${relativeTarget} {
      box-shadow: ${initialShadow};
    }
  `;
};
