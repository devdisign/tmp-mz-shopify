import { styled } from "@linaria/react";

import { breakpoints, colors } from "@utils/theme";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-areas:
    "quote artwork-right"
    "artwork-left logo"
    "passage passage";
  
  grid-row-gap: 2rem;

  place-items: center;

  margin: 3rem 0;

  .artwork {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .artwork-fade {
    position: relative;

    --offset: 80px;
    --blur-radius: 80px;
    --spread-radius: 28px;

    &:after {
      content: "";
      position: absolute;
      display: block;
      color: ${colors.bg};

      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      border-collapse: separate;
      box-shadow: inset 0 var(--offset) var(--blur-radius) calc(-1 * var(--spread-radius)),
                  inset 0 calc(-1 * var(--offset)) var(--blur-radius) calc(-1 * var(--spread-radius));
    }
  }

  .artwork-right {
    grid-area: artwork-right;
  }
  
  .artwork-left {
    grid-area: artwork-left;
  }
  
  .logo-passage {
    display: contents;
  }
  
  .logo {
    grid-area: logo;
    
    width: min(50%, 400px);
    height: auto;
    place-self: center;
  }
  
  .text {
    place-self: center;
    text-align: center;
    transition: font-size 250ms;
  }
  
  .quote {
    grid-area: quote;
    font-size: clamp(0.8rem, 3vw, 3rem);
  }
  
  .passage {
    grid-area: passage;
    font-size: clamp(0.8rem, 2vw, 3rem);
    min-height: 34ex;
  }

  @media only screen and (min-width: ${breakpoints.lg}px) {
    grid-template-areas:
      "quote artwork-right"
      "artwork-left logo-passage";

    .logo-passage {
      grid-area: logo-passage;
      display: grid;
      grid-row-gap: 1em;
      height: 100%;
      width: 100%;
      
      grid-template-areas:
        "logo"
        "passage";
    }

    .passage {
      font-size: clamp(0.8rem, 1vw, 2rem);
    }
  }
`;
