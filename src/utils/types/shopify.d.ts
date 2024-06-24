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
  readonly id: number,
  readonly inventory_policy: "continue" | "deny",
  readonly inventory_quantity: number,
  readonly name: string,
  readonly options: string[],
  readonly price: number, // in pence
  readonly public_title: string,
  readonly title: string,
  readonly url: string,
  readonly my_fields: VariantMyFields,
}

interface VariantMyFields {
  readonly restock_date: string,
}

export interface Product {
  readonly collections: Collection[],
  readonly description: string,
  // TODO: investigate why not an object
  // readonly featured_image: FeaturedImage,
  readonly id: number,
  readonly images: string[],
  readonly options: string[],
  readonly price: number,
  readonly title: string,
  readonly url: string,
  readonly variants: Variant[],
  readonly my_fields: ProductMyFields,
}

interface ProductMyFields {
  readonly layers: string, // url to SVG
}

export interface ProductWithOptionsWithValues {
  readonly product: Product,
  readonly optionsWithValues: OptionWithValues[],
}

export interface LineItem {
  readonly final_line_price: number,
  readonly final_price: number,
  readonly id: number,
  readonly image: string,
  readonly original_price: number,
  readonly product: Product,
  readonly quantity: number,
  readonly title: string,
  readonly url: string,
  readonly variant: Variant,
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

export interface CartData {
  readonly items: LineItem[],
  readonly total_price: number,
  readonly original_total_price: number,
  readonly currency: string,
}

export type CartUpdater = (variantId: number, quantity?: number) => Promise<Error | undefined>;

export interface Cart {
  readonly data: CartData,
  readonly incrementItem: CartUpdater,
  readonly decrementItem: CartUpdater,
  readonly open: UseBoolean,
}

export interface LinkData {
  readonly title: string,
  readonly url: string,
}

export interface Collection {
  readonly id: number,
  readonly handle: string,
}
