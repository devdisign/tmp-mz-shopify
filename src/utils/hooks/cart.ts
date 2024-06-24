import { useCallback, useMemo, useState } from "preact/hooks";

import type { UseBoolean, UseHistoryUrl } from "@utils/types/hooks";
import type { Cart, CartData, CartUpdater } from "@utils/types/shopify";
import { AsyncLock } from "@utils/utils";

interface Updates {
  [variantId: number]: number,
}

interface UpdateCart {
  updates: Updates,
  note?: string,
  attributes?: Record<string, string>,
}

const modifyCartApi = async (
  variantId: number,
  quantity: number,
  action: "add" | "update",
) => {
  const actionData = {
    add: (variantId: number, quantity: number) => ({
      url: "/cart/add.js",
      data: {
        items: [{
          id: variantId,
          quantity,
        }],
      },
    }) as const,
    update: (variantId: number, quantity: number) => ({
      url: "/cart/update.js",
      data: {
        updates: {
          [variantId]: quantity,
        },
      } as UpdateCart,
    }) as const,
  } as const;

  const { url, data } = actionData[action](variantId, quantity);

  try {
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return [await response.json() as CartData, undefined] as const;
  } catch (error: any) {
    return [undefined, new Error(error.message)] as const;
  }
};

const useCart = (initialCart: CartData): Omit<Cart, "open"> => {
  const lock = useMemo(() => new AsyncLock(), []);

  const [cart, setCart] = useState(initialCart);

  const modifyCart = useCallback(async (
    variantId: number,
    quantity: number,
    action: "add" | "update",
  ) => {
    lock.enable();

    const [data, err] = await modifyCartApi(variantId, quantity, action);

    if (err === undefined) { setCart(data as CartData); }

    lock.disable();

    return err;
  }, [lock]);

  const incrementItem: CartUpdater = useCallback(
    (variantId: number, amount = 1) => {
      const item = cart.items.find(item => item.id === variantId);
      return modifyCart(variantId, (item?.quantity ?? 0) + amount, "update");
    },
    [cart.items, modifyCart]
  );

  const decrementItem: CartUpdater = useCallback(
    (variantId: number, amount = 1) => {
      const item = cart.items.find(item => item.id === variantId);
      if (!item) {
        return Promise.resolve(
          new Error(`[CartData] VariantId (${variantId}) not in cart!.`)
        );
      }
      return modifyCart(variantId, item.quantity - amount, "update");
    },
    [cart.items, modifyCart]
  );

  // const
  // TODO: respond to cart changes in browser from other tab
  // useEffect(() => {
  //   window.addEventListener("storage", () => {
  //     // setCart({} as CartType);
  //   });
  // }, []);

  return {
    data: cart,
    incrementItem,
    decrementItem,
  };
};


export const useCartOpen = ({ history, url }: UseHistoryUrl): UseBoolean => {
  const [cartOpen, setCartOpen] = useState(url.searchParams.get("cart") !== null);

  const on = () => {
    url.searchParams.set("cart", "1");
    history.push(url.href);
    setCartOpen(true);
  };

  const off = () => {
    url.searchParams.delete("cart");
    history.push(url.href);
    setCartOpen(false);
  };

  const toggle = () => {
    if (url.searchParams.get("cart") === null) {
      on();
    } else {
      off();
    }
  };

  return {
    state: cartOpen,
    on,
    off,
    toggle,
  };
};

export default useCart;
