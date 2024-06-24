import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { breakpoints, colors } from "@utils/theme";

export const ProductDiv = styled.div`
  display: grid;
  place-items: center;
  grid-gap: 3em;
  margin: 2em;
  
  min-height: 500px; // TODO: review

  --product-col-width: 40em;

  .product-page__images,
  .product-page__details {
    place-self: center;
  }

  .product-page__images {
    max-width: min(40vh, 65vw, var(--product-col-width));

    @media only screen and (min-width: ${breakpoints.lg}px) {
      max-width: clamp(500px, var(--product-col-width), 60vh);
    }
  }

  .product-page__details {
    max-width: var(--product-col-width);
  }

  @media only screen and (max-width: ${breakpoints.lg}px) {
    animation: fadeUp 1000ms ease-out;
  }

  @media only screen and (min-width: ${breakpoints.lg}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7rem;
    
    --product-col-width: 80em;

    .product-page__images {
      animation: fadeRight 1000ms ease-out;
    }

    .product-page__details {
      animation: fadeUp 1000ms ease-out;
    }
  }

  @keyframes fadeRight {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }

    100% {
      opacity: 1;
    }
  } 
`;

export const DetailsDiv = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-template-areas:
    "title title title"
    "emblem emblem emblem"
    "description description description"
    "price price price";
`;

export const Title = styled.h1`
  grid-area: title;
  text-align: center;
  font-weight: 800;
  font-size: clamp(1.5rem, 5vw, 3.5em);
`;

export const Emblem = styled.div`
  grid-area: emblem;
  margin: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover > img, svg {
    /* transform: scale(1.3) rotate(360deg); */
    transform: translateY(0.5em) scale(0.9);
  }

  img, svg {
    height: clamp(1rem, 7vw, 3rem);
    width: auto;
    transition: transform 500ms cubic-bezier(0,1.69,.26,1.81);
  }
`;

export const Description = styled.h3`
  grid-area: description; 
  margin: 1em 0em;
  text-align: center;
  font-weight: 600;
  font-size: clamp(0.7em, 1.6vw, 0.9em);
`;

export const Price = styled.div`
  grid-area: price; 
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border-top: solid 3px ${colors.accent};
  border-bottom: solid 1px ${colors.accent};
  padding: 1em 0px;
`;

export const OptionRow = styled.div`
  grid-column-end: span 3;
  display: grid; 
  grid-template-columns: 0.7fr 1.6fr 0.7fr; 
  grid-template-areas: "prompt choices note"; 
  margin-top: 0.5em;
`;

export const OptionPrompt = styled.span`
  grid-area: prompt; 
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

export const OptionChoices = styled.span`
  grid-area: choices; 
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

export const OptionNote = styled.button`
  grid-area: note; 
  width: max-content;
  margin-left: auto;
  text-transform: uppercase;
`;

export const OptionButton = styled.button`
  position: relative;
  color: ${colors.primary};
  cursor: pointer;
  font-weight: bold;
  padding: 4px 5px;
  margin-left: 4px;
  margin-right: 4px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: ${colors.primary};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 250ms ease-in;
  }

  &.selected::after, &:hover:not(.selected)::after {
    transform-origin: left;
    transform: scaleX(1);
  }

  .colors__choice-swatch {
    border: 2px solid ${colors.accent};
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin-bottom: 0.2em;
  }
`;

export const addToCartButtonStyles = css`
  grid-column-end: span 3;
  place-self: center;
  margin-top: 1em;
`;
