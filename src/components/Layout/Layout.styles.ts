import { styled } from "@linaria/react";
import { css } from "@linaria/core";

export const headerStyles = css`
  z-index: 3;
`;

export const drawerStyles = css`
  z-index: 2;
  position: fixed;
  right: 0;
`;

export const StyledMain = styled.main`
  margin: auto 0;
  padding-top: 7em;
`;

interface BgIconDivProps {
  display: "flex" | "none",
}

export const BgIconDiv = styled.a<BgIconDivProps>`
  z-index: 1;
  position: fixed;
  cursor: pointer;

  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  transition: transform 250ms ease-out;

  width: min(25vw, 200px);
  height: auto;

  display: ${props => props.display};

  .bg-animation,
  .bg-animation-freeze-frame {
    transition: opacity 250ms ease-out;
    /* width: 100%; */
    /* height: 100%; */
  }

  .bg-animation {
    /* opacity: 0; */
    display: none;
  }

  .bg-animation-freeze-frame {
    /* position: absolute; */
    /* opacity: 1; */
    display: block;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);

    .bg-animation {
      /* opacity: 1; */
      display: block;
    }

    .bg-animation-freeze-frame {
      /* position: absolute; */
      /* opacity: 0; */
      display: none;
    }
  }
`;
