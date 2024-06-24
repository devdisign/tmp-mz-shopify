import { styled } from "@linaria/react";

export const ProductsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: clamp(1em, 10vw, 10em);
  margin: 0 2em;

  .product {
    width: clamp(4em, 35vw, 40em);
    margin: auto;
  }
`;
