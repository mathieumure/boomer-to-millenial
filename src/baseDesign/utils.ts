import { Theme, ThemeFeatures } from "./theme";

export const ifFeature =
  (featureName: keyof ThemeFeatures, css: any) => (props: { theme: Theme }) =>
    props.theme.features[featureName] ? css : undefined;
