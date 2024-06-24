import { createContext } from "preact";

import { UseHistoryUrl } from "@utils/types/hooks";
import { Cart } from "@utils/types/shopify";

interface StoreContext {
  historyUrl: UseHistoryUrl,
  cart: Cart,
}

const StoreContext = createContext<StoreContext>({} as StoreContext);

export default StoreContext;
