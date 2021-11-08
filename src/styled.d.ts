import { Theme } from "./baseDesign/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
