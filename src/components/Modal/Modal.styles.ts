import { styled } from "@linaria/react";
import { colors } from "@utils/theme";
import hexRgb from "hex-rgb";

export const ModalDiv = styled.div`
  position: fixed;
  z-index: 5;

  top: 50vh;
  left: 50vw;

  outline: 0.5px solid ${colors.primary};

  transform: translate(-50%, -50%) scale(0);
  transition: transform 500ms ease-in-out;

  --modal-size: clamp(5em, 80vw, 20em);
  height: var(--modal-size);
  width: var(--modal-size);

  background-color: ${() => hexRgb(colors.bg, { alpha: colors.opacity, format: "css" })};

  &.visible {
    transform: translate(-50%, -50%) scale(1);
  }

  .modal__close {
    position: absolute;
    top: 1em;
    right: 1em;
    cursor: pointer;
  }

  .modal__content {
    position: absolute;
    top: 2em;
    margin: 1em;
  }
`;

export const ModalContentDiv = styled.div`
`;
