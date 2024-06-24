import { styled } from "@linaria/react";
import { colors } from "@utils/theme";

export const ParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;

  height: 100%;

  .cart__items {
    display: flex;

    flex: 1 1 0;

    padding: 0 2em 0;

    flex-direction: column;
    gap: 3em;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }

  &.cart--not-empty .cart__items {
    padding: 0 2em 3em;
  }

  &.cart--empty .cart__items {
    justify-content: center;
    align-items: center;
  }

  .cart__item-image {
    max-width: clamp(10em, 40vw, 100%);
    margin: 0 auto;
  }

  .cart__item-image + .cart__item-details {
    padding-top: 1em;
  }
`;

export const OptionBar = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-areas: "title quantity price"; 
`;

export const TitlePrompt = styled.div`
  grid-area: title; 
  display: flex;
  align-items: center;
`;

export const QuantityPrompt = styled.div`
  grid-area: quantity; 
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
`;

export const PricePrompt = styled.div`
  grid-area: price; 
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const ChangeQuantity = styled.button`
  margin: 0 0.3em;
	display: inline-block;
	cursor: pointer;
	/* padding: 4px 5px; */
`;

export const TotalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid ${colors.primary};
  border-bottom: 2px solid ${colors.primary};
  padding: 0.5em 2em;
  width: 100%;
`;

export const CheckoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 1em;
`;
