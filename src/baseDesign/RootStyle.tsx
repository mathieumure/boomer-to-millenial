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

    :root {
      --primary-base: #DC2828;
      --primary-light: #E35454;
      --primary-background: linear-gradient(30.63deg, #DC2828 0%, #DB275D 94.67%);
      --grey-100: #f3f4f6;
      --grey-300: #D1D5DB;
      --grey-600: #4B5563;
      --grey-700: #374151;
      --grey-800: #1F2937;
      --grey-900: #111827;

      --easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
      --easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
      --easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
    }
`;
