import { FC, useEffect, useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { LeftNav } from "./layout/LeftNav";
import { MainContent } from "./layout/MainContent";
import { MoviesProvider } from "./movie/movieContext";
import { Theme, ThemeFeatures } from "./baseDesign/theme";
import { ifFeature, ifNotFeature } from "./baseDesign/utils";

declare global {
  interface Window {
    activateFeature: (featureName: keyof ThemeFeatures) => void;
    disableFeature: (featureName: keyof ThemeFeatures) => void;
  }
}

const Container = styled.div`
  ${ifNotFeature(
    "baseCss",
    css`
      display: flex;
    `
  )}

  ${ifFeature(
    "baseCss",
    css`
      font-family: Inter, sans-serif;
      display: grid;
      grid-template: 100vh / 20vw 1fr 22vw;
      overflow: hidden;
      background: linear-gradient(127.31deg, #ffffff 15.25%, #f1f5f9 87.59%);
    `
  )}
`;

const DEFAULT_THEME: Theme = {
  features: {
    baseCss: true,
    galleryFlip: true,
    watchlistFlip: true,
  },
};

const App: FC = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    window.activateFeature = (featureName: keyof ThemeFeatures) => {
      theme.features[featureName] = true;
      setTheme({ ...theme });
    };
    window.disableFeature = (featureName: keyof ThemeFeatures) => {
      theme.features[featureName] = false;
      setTheme({ ...theme });
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <MoviesProvider>
        <Container>
          <LeftNav />
          <MainContent />
        </Container>
      </MoviesProvider>
    </ThemeProvider>
  );
};

export default App;
