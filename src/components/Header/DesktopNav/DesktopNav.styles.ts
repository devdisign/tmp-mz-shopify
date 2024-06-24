import { styled } from "@linaria/react";
import { colors } from "@utils/theme";
import Entities from "@images/entities.svg";
import { cssUrl } from "@utils/utils";

export const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;

  .nav__list {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    text-transform: uppercase;
  }

  .nav__list-item {
    position: relative;
    display: inline-block;
    margin-left: 5em;
    min-width: 2em;
    text-align: center;
  }

  .nav__list-item:hover {
    opacity: ${colors.opacity};
  }

  .nav__list-item::after {
    --dot-size: 15px;

    content: "";
    /* background: ${() => cssUrl(Entities)} 100%; */
    background-image: ${() => cssUrl(Entities)};
    background-size: 100% 100%;
    position: absolute;

    width: var(--dot-size);
    height: var(--dot-size);
    /* border-radius: 50%; */

    bottom: calc(-1 * var(--dot-size)); 
    /* left: calc(50% - calc(var(--dot-size) / 2)); */
    right: 0;

    /* background: currentColor; */
    transform: translateY(-1em);
    opacity: 0;
    transition: transform 250ms ease-in,
                opacity 250ms ease-in;
  }

  .nav__list-item.active::after,
  .nav__list-item:hover::after {
    opacity: inherit;
    transform: translateY(0);
  }

  .nav__list-item:hover:not(.active)::after {
    transition: var(--bounce);
  }
`;
