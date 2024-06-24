import { css } from "@linaria/core";

import BebasNeue from "@fonts/BebasNeue.otf";

import ResetCss from "@styles/reset.css";

export const colors = Object.freeze({
  /* main: "#060606" "#161616" "black" "#010101" */
  bg: "#010101",
  primary: "#ffffff",
  accent: "silver",
  opacity: 0.7,
});

export const breakpoints = Object.freeze({
  xs: 320,    // 320px-480px: Mobile devices
  sm: 480,    // 481px-768px: iPads, Tablets
  md: 768,    // 769px-1024px: Small screens, laptops
  lg: 1024,   // 1025px-1200px: Desktops, large screens
  xlg: 1200,  // 1200+px: Extra large screens, TV
});

const ProjectDefaultCss = css`
  :global() {
    :root {
      --bounce: transform 250ms cubic-bezier(0,1.69,.26,1.81)
    }

    *, *::before, *::after {
      /* outline: red solid 2px; */
    }

    @font-face {
      font-family: "GIIG";
      src: url(${BebasNeue}) format("opentype")
    }    

    body {
      background-color: ${colors.bg};
      color: ${colors.primary};
      display: flex;
      flex-direction: column;
      font-family: "GIIG";
    }

    input,
    textarea {
      border: none;
      background-color: transparent;
      caret-color: ${colors.primary};
      padding: 0
    }
  }
`;

const GlobalCss = {
  ResetCss,
  ProjectDefaultCss,
};

export default GlobalCss;
