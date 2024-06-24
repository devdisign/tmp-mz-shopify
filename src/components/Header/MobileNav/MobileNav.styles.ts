import { styled } from "@linaria/react";
import { colors } from "@utils/theme";
import Entities from "@images/entities.svg";
import { cssUrl } from "@utils/utils";

export const Nav = styled.nav`
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  justify-items: flex-end;

  .nav__hambugesa-container {
    * {
      fill: ${colors.primary};
      stroke: ${colors.primary};
    }
  }

  .nav__hambugesa-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* hambugesa icon */
  .nav__hambugesa {
    z-index: 1;
    cursor: pointer;
    width: var(--h);
    height: var(--h);
    * { 
      transition: transform 250ms ease-in-out calc(calc(var(--n-max) * 100ms) + 100ms);
    }
  }

  /* hambugesa open */
  &.nav--open .nav__hambugesa {
    * { 
      transition: transform 350ms ease-in-out;
    }

    #long_bar {
      transform: rotate(90deg) translate(0, -25.125px);
    }

    #short_bar {
      transform: translate(-9px, 20%);
    }
  }

  .nav__list {
    display: flex;
    position: absolute;
    padding-top: 4.5em;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
  }

  .nav__list-item {
    --gap: 1.5em;

    position: relative;
    display: inline-block;

    padding: var(--gap);

    text-shadow: 1px 1px 2px ${colors.bg};
  }

  &.nav--closed .nav__list-item {
    visibility: hidden;

    opacity: 0;
    transform: translateY(calc(var(--gap) * -2));

    transition: opacity 100ms ease calc(calc(var(--n-max) - var(--n)) * 100ms),
                transform 100ms ease calc(calc(var(--n-max) - var(--n)) * 100ms),
                visibility 0ms calc(var(--n-max) * 100ms);
  }
    
  &.nav--open .nav__list-item {
    visibility: visible;

    opacity: 1;
    transform: translateY(0);

    transition: opacity 350ms ease calc(var(--n) * 200ms), 
                transform 350ms ease calc(var(--n) * 200ms);
  }

  &.nav--open .nav__list-item:not(:hover) {
    /* transition: opacity 350ms ease calc(var(--n) * 200ms), 
                transform 350ms ease calc(var(--n) * 200ms); */
  }

  /* FIXME stop hover state during transition */
  /* &.nav--open-complete .nav__list-item:hover {
    opacity: ${colors.opacity};
  } */

 .nav__list-item:hover {
    opacity: ${colors.opacity};
  }

  .nav__list-item.active::after {
    --dot-size: 15px;

    content: "";
    /* background: ${() => cssUrl(Entities)} 100%; */
    background-image: ${() => cssUrl(Entities)};
    background-size: 100% 100%;
    position: absolute;

    width: var(--dot-size);
    height: var(--dot-size);
    /* border-radius: 50%; */

    bottom: calc(-1 * calc(var(--dot-size) - var(--gap))); 
    /* left: calc(50% - calc(var(--dot-size) / 2)); */
    right: var(--gap);

    /* background: currentColor; */
  }
`;
