import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;

      &::after,
      &::before {
        box-sizing: border-box;
      }
    }

    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
    }
`;
