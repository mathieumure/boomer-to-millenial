export type ThemeFeatures = {
  font: boolean;
  baseCss: boolean;
  microinteractions: boolean;
  galleryFlip: boolean;
  watchlistFlip: boolean;
  addCartFlip: boolean;
  sound: boolean;
  spatialisation: boolean;
};

export type Theme = {
  features: ThemeFeatures;
};
