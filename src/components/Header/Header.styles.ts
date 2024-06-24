import { styled } from "@linaria/react";
import { breakpoints, colors } from "@utils/theme";
import hexRgb from "hex-rgb";

export const Header = styled.header`
  --pad: 2em;
  --h: 3em;

  position: fixed;
  top: 0;
  width: 100%;

  background: ${() => hexRgb(colors.bg, { alpha: colors.opacity, format: "css" })};

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: var(--pad);

  .header__logo {
    height: var(--h);
    width: auto;

    &:hover {
      animation: scaleUp 750ms ease-in-out alternate infinite;
    }

    @keyframes scaleUp {
      to {
        transform: scale(1.1);
      }
    }
  }

  .header__nav-mobile,
  .header__nav-desktop {
    position: absolute;
    right: var(--pad);
  }

  .header__nav-mobile {
    transform: translateX(0);

    transition: width 0ms 500ms,
                visibility 0s 500ms, 
                transform 500ms ease-in-out 500ms;

    @media only screen and (min-width: ${breakpoints.md}px) {
      transition: width 0ms 500ms,
                  visibility 0s 500ms, 
                  transform 500ms ease-in-out;

      transform: translateX(calc(100% + var(--pad)));
      width: 0;
      visibility: hidden;
    }
  }

  .header__nav-desktop {
    height: var(--h);

    width: 0;
    transform: translateY(calc(-100% - var(--pad)));
    visibility: hidden;

    transition: transform 500ms ease-in-out,
                visibility 0s 500ms, 
                width 0ms 500ms;

    @media only screen and (min-width: ${breakpoints.md}px) {
      width: max-content;
      transform: translateY(0);
      visibility: visible;

      transition: transform 500ms ease-in-out 500ms,
                  visibility 0s 500ms, 
                  width 0ms 500ms;
    }
  }

  &.animate {
    .header__nav-mobile {
      animation: showMobileNav 500ms ease-in-out;

      @keyframes showMobileNav {
        from {
          transform: translateX(calc(100% + var(--pad)));
        }
        to {
          transform: translateX(0);
        }
      }
    }

    .header__nav-desktop {
      @media only screen and (min-width: ${breakpoints.md}px) {
        animation: showDesktopNav 500ms ease-in-out;
      }

      @keyframes showDesktopNav {
        from {
          transform: translateY(calc(-100% - var(--pad)));
        }
        to {
          transform: translateY(0);
        }
      }
    }
  }
`;
