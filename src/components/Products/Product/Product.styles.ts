import { css } from "@linaria/core";

export const productStyles = css`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  /* width: max-content; */
  /* height: max-content; */

  perspective: 1000px;
  /* max-width: (40vw, 500px); */

  .product__motion-container {
    position: relative;
  }

  .product__front, .product__back {
    /* max-width: (40vw, 500px); */
    width: 100%;
    height: auto;
  }

  .product__back {
    top: 0;
    position: absolute;
    transform: rotateY(180deg);
  }

  &.product--flip {
    .product__motion-container {
      transition: transform 1000ms 10ms;
      transform-style: preserve-3d;
    }

    .product__front, .product__back {
      backface-visibility: hidden;
    }
  }

  &.product--flip:hover .product__motion-container {
    transform: rotateY(180deg);
  }

  &.product--rotate:hover .product__motion-container {
    animation: rotate 10s linear infinite;

    @keyframes rotate {
      from {
        transform: rotateY(0deg);
      }

      to {
        transform: rotateY(360deg);
      }
    }
  }
`;
