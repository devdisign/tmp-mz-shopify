export interface Image {
  readonly alt: null
  readonly created_at: string,
  readonly height: number,
  readonly id: number,
  readonly position: number,
  readonly product_id: number,
  readonly src: string,
  readonly updated_at: string,
}

export interface Variant {
  readonly available: boolean,
  readonly barcode: string,
  readonly compare_at_price: null,
  readonly featured_image: Image,
  readonly id: number,
  readonly inventory_quantity: number,
  readonly name: string,
  readonly options: string[],
  readonly price: number, // in pence
  readonly public_title: string,
  readonly requires_shipping: boolean,
  readonly url: string,
  readonly sku: string,
  readonly taxable: boolean,
  readonly title: string,
  readonly weight: number,
}

export interface Product {
  readonly id: number,
  readonly url: string,
  readonly title: string,
  readonly description: string,
  readonly price: number,
  readonly selected_or_first_available_variant: Variant,
  readonly variants: Variant[],
  // TODO: investigate why not an object
  // readonly featured_image: FeaturedImage,
  readonly featured_image: string,
  readonly options: string[],
  readonly images: string[],
}

export interface LineItem extends Product {
  readonly variant_id: number,
  readonly quantity: number,
  readonly image: string,
  readonly final_price: number,
  readonly final_line_price: number,
}

export interface OptionWithValues {
  readonly name: string,
  readonly position: number,
  readonly values: string[],
}

export interface OptionWithValue {
  readonly name: string,
  readonly position: number,
  readonly value: string,
}

export interface Routes {
  readonly cart_add_url: string,
}

export interface CartData {
  readonly items: LineItem[],
  readonly total_price: number,
  readonly currency: string,
}

export type CartUpdater = (variantId: number, quantity?: number) => Promise<Error | undefined>;

export interface UseBoolean {
  readonly state: boolean,
  readonly toggle: () => void;
  readonly off: () => void;
  readonly on: () => void;
}

export interface Cart {
  readonly data: CartData,
  readonly incrementItem: CartUpdater,
  readonly decrementItem: CartUpdater,
  readonly open: UseBoolean,
}

export interface History {
  readonly back: () => Promise<void>;
  readonly replace: (pathname: string, state?: Record<string, string>) => void;
  readonly push: (pathname: string, state?: Record<string, string>) => void;
  readonly length: number;
  readonly state: Record<string, string>;
}

export interface HistoryUrl {
  readonly url: URL;
  readonly history: History;
}
