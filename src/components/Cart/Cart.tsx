import type { FunctionComponent } from "preact";
import { useCallback, useContext } from "preact/hooks";
import { FaMinus, FaPlus } from "react-icons/fa";

import {
  ChangeQuantity,
  CheckoutDiv,
  OptionBar,
  QuantityPrompt,
  ParentDiv,
  PricePrompt,
  TitlePrompt,
  TotalDiv,
} from "./Cart.styles";

import { Button } from "@components/styled";
import Products from "@components/Products";

import { toPriceString } from "@utils/utils";
import StoreContext from "@utils/context";
import { useBoolean } from "@utils/hooks";

interface CartProps { }

const Cart: FunctionComponent<CartProps> = () => {
  const { cart } = useContext(StoreContext);
  const { state: cartUpdating, ...handleCartUpdating } = useBoolean(false);

  const updateCart = useCallback(
    async (result: Promise<Error | undefined>) => {
      handleCartUpdating.on();
      // FIXME: handle err
      const err = await result;
      handleCartUpdating.off();
    },
    [handleCartUpdating]
  );

  return (
    <ParentDiv className={`cart ${cart.data.items.length === 0 ? "cart--empty" : "cart--not-empty"}`}>
      <div className="cart__items">
        {
          cart.data.items.length === 0
            ? <p className="cart__message">Cart Empty</p>
            : cart.data.items.map(item => (
              <div key={item.id} className="cart__item">
                <Products.Product
                  className="cart__item-image"
                  title={item.image}
                  images={[item.image]}
                  url={item.url}
                />
                <OptionBar className="cart__item-details">
                  <TitlePrompt>{item.title}</TitlePrompt>
                  <QuantityPrompt>
                    <ChangeQuantity
                      disabled={cartUpdating}
                      onClick={() => updateCart(cart.decrementItem(item.id))}>
                      <FaMinus />
                    </ChangeQuantity>
                    {item.quantity}
                    <ChangeQuantity
                      disabled={cartUpdating}
                      onClick={() => updateCart(cart.incrementItem(item.id))}>
                      <FaPlus />
                    </ChangeQuantity>
                  </QuantityPrompt>
                  <PricePrompt>
                    {toPriceString(item.final_price, cart.data.currency)}
                  </PricePrompt>
                </OptionBar>
              </div>
            ))
        }
      </div>
      <div className="cart__checkout">
        <TotalDiv>
          <span>Total</span>
          <span>{toPriceString(cart.data.total_price, cart.data.currency)}</span>
        </TotalDiv>
        <CheckoutDiv>
          <form action="/cart" method="post">
            <Button
              htmlProps={{
                disabled: cart.data.items.length === 0 || cartUpdating,
                type: "submit",
                name: "checkout",
              }}
            >
              Checkout
            </Button>
          </form>
        </CheckoutDiv>
      </div>
    </ParentDiv>
  );
};

export default Cart;
