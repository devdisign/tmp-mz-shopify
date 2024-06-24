import { styled } from "@linaria/react";
import { breakpoints, colors } from "@utils/theme";

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 2em;

  .footer__links {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  .footer__details::before,
  .footer__details::after {
    content: "";
    position: absolute;

    width: 100%;
    height: 1px;

    background-color: ${colors.accent};
  }

  .footer__details::before {
    top: -0.5em;
  }

  .footer__details::after {
    bottom: -0.5em;
  }

  .footer__details {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .footer__payments {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    --scale: 0.8;

    li {
      height: calc(24px * var(--scale)); /* FIXME: why is this needed */
      width: calc(38px * var(--scale)); /* FIXME: why is this needed */
    }

    svg {
      transform-origin: top;
      transform: scale(var(--scale));
    }

    svg + svg {
      margin-left: 2em;
    }
  }

  .footer__payments + .footer__copyright {
    margin-top: 1em;

    &::before {
      content: "";
      position: absolute;
  
      width: 20px;
      height: 2px;
  
      top: -0.5em;
  
      background-color: ${colors.accent};
    }
  }

  .footer__copyright {
    position: relative;

    font-size: 0.8rem;
    text-align: center;

    display: flex;
    justify-content: center;
  }
`;

export const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  transition: all 0.3s ease;
  font-size: 0.85rem;

  li {
    height: 2ex;
  }

  li + li {
    margin-top: 2em;
  }

  li:hover {
    opacity: 0.8;
  }

  @media only screen and (min-width: ${breakpoints.md}px) {
    flex-direction: row;

    li + li {
      margin-top: 0;
      margin-left: 5em;
    }
  }
`;
