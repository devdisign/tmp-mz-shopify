import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { colors } from "@utils/theme";

interface BackgroundVideoProps {
  aspectRatio: number,
}

export const BackgroundVideo = styled.div<BackgroundVideoProps>`
  --videoRatio: ${props => props.aspectRatio};
  
  z-index: -1;
 
  &, * {
    border: 0;
    padding: 0;
    margin: 0;
  }
  
  --parent-width: 100vw; 
  --parent-height: calc(75vh - 7em);
  width: var(--parent-width);
  height: var(--parent-height);
  
  overflow: hidden;
  position: fixed;

  iframe {
    position: absolute;
    
    top: calc(var(--parent-height) * 0.5);
    left: calc(var(--parent-width) * 0.5);
    transform: translate(-50%, -50%);
    
    --width: var(--parent-width);
    --height: calc(var(--width) / var(--videoRatio));
    
    height: var(--height) !important;
    width: var(--width) !important;
  }

  @media (max-aspect-ratio: 16/9) {
    iframe {
      --height: var(--parent-height);
      --width: calc(var(--height) * var(--videoRatio));
    }
  }

  &::before, &::after {
    content: '';
    position: absolute;
    box-shadow: 0 0 3em 5em ${colors.bg};
    width: 100vw;
    background-color: ${colors.bg};
    z-index: 1;
  }

  &::before {
    top: -7em;
    height: calc(7em + var(--scroll));
  }

  &::after {
    top: calc(75vh - 7em - var(--scroll));
    height: 100vh;
  }
`;

export const productsStyles = css`
  --video-offset:  calc(55vh - 7em);

  margin-top: var(--video-offset);
  margin-bottom: calc(var(--video-offset) / 2);
  animation: fadeInUp 2500ms ease-out;
  min-height: 100%;

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }

    100% {
      opacity: 1;
    }
  } 
`;
