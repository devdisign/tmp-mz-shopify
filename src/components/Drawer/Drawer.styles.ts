import { styled } from "@linaria/react";
import { breakpoints, colors } from "@utils/theme";
import hexRgb from "hex-rgb";

export const DrawerDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;

  /* grid-template-rows: max-content auto; */
  /* grid-gap: 1em; */

  top: 7em;
  width: 100%;
  bottom: 0;

  transform: translateX(100%);

  transition: transform 750ms ease-in-out;

  background-color: ${colors.bg};

  /* padding: 2em; */

  &.visible {
    transform: translateX(0);

    &.animate {
      animation: fadeIn 750ms ease-in-out forwards;

      @keyframes fadeIn {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
    }
  }

  &::before {
    content: "";

    position: fixed;

    top: -7em;
    left: 0;

    height: calc(100% + 7em);
    width: 100%;

    background: ${colors.bg};

    z-index: -1;
  }

  .drawer__close {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .drawer__content {
    flex: 1 1 0;
  }

  @media only screen and (min-width: ${breakpoints.sm}px) {
    right: 0;
    width: 25em;
    background-color: transparent;

    &::before {
      top: 0;
      height: 100%;

      background: ${() => hexRgb(colors.bg, { alpha: colors.opacity, format: "css" })};
    }
  }

  @media only screen and (min-width: ${breakpoints.sm}px) {
    grid-template-rows: auto;

    .drawer__close {
      display: none;
    }
  }
`;
