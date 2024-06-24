import { styled } from "@linaria/react";
import { colors } from "@utils/theme";

export const MessageP = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-family: 'GIIG';
  margin: auto;
`;

export const SuccessSpan = styled.span`
  font-size: 0.7rem;
  display: flex;
  flex-direction: row;
  margin: auto;
  padding: 0.4em;
  align-items: center;

  p {
    font-family: 'GIIG';
    padding-left: 0.2em;
  }
`;

interface BackgroundVideoProps {
  aspectRatio: number,
}

export const BackgroundVideo = styled.div<BackgroundVideoProps>`
  --videoRatio: ${props => props.aspectRatio};
  
  z-index: -1;
  
  border: 0;
  padding: 0;
  margin: 0;
  
  --parent-width: 100vw; 
  --parent-height: 100vh;
  width: var(--parent-width);
  height: var(--parent-height);
  
  overflow: hidden;
  position: fixed;

  iframe {
    padding: 0;
    margin: 0;
    
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

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${colors.bg};
    opacity: 0.4;
  }
`;

export const ContentContainer = styled.div`
  display: grid;
  
  position: fixed;
  top: 12.5vh;
  width: 100vw;
  
  grid-template-rows: 40vh 20vh 15vh;
  //grid-row-gap: 3rem;
  grid-template-areas: 
    "logo"
    "form"
    "controls";


  .logo {
    grid-area: logo; 

    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;
    /* transition: transform 500ms cubic-bezier(0,1.69,.26,1.81); */

    z-index: -1;

    /* mix-blend-mode: multiply; */
    
    img, svg {
      width: 100%;
      height: 100%;
      max-width: 80vw;
      max-height: 40vh;
    }

    &:before {
      /* content: ""; */
      z-index: -1;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background: ${colors.bg};
    }
  }
  
  .formik {
    grid-area: form; 
    display: flex;
    flex-direction: column;
    place-items: center;
    justify-content: space-between;
  }

  .controls {
    grid-area: controls;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas: ". mute . skip .";
    grid-template-columns: 1fr 8em 1fr 8em 1fr;
    align-items: center;
  }
  
  .mute {
    grid-area: mute;
  }
  
  .skip {
    grid-area: skip;
  }
`;
