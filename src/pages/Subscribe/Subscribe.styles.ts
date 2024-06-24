import { styled } from "@linaria/react";
import { breakpoints } from "@utils/theme";

export const ContainerContent = styled.div`
  display: grid;
  grid-template-rows: repeat(2, max(35vh, 400px));
  grid-template-areas: 
    "artwork-left stack ."
    "passage boy artwork-right";

  .stack {
    grid-area: stack;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .text-container {
    text-align: center;
  }

  .passage {
    display: none;
    grid-area: passage;
    place-self: center;
  }
    
  .boy {
    grid-area: boy;
  }
  
  .artwork {
    width: clamp(5em, 50%, 15em);
    height: auto;
  }
  
  .artwork-left {
    display: none;
    grid-area: artwork-left;
    align-self: flex-end;
  }
  
  .artwork-right {
    display: none;
    grid-area: artwork-right;
    justify-self: flex-end;
    align-self: flex-end;
  }

  .text-container {
    padding-left: 2em;
    padding-right: 2em;
    min-height: 6ex; 
  }

  @media only screen and (min-width: ${breakpoints.lg}px) {
    grid-template-columns: repeat(3, max(33vw, 300px));

    .passage, .artwork-left, .artwork-right {
      display: block;
    }
  }
`;

export const BoyDiv = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  place-items: center;
  justify-content: center;

  .animation,
  .animation-freeze-frame {
    max-height: 100%;
  }

  .animation {
    display: none;
  }

  .animation-freeze-frame {
    display: block;
  }

  &:hover {
    .animation {
      /* display: block; */
    }

    .animation-freeze-frame {
      /* display: none; */
    }
  }
`;
