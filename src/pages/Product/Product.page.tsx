import type { FunctionComponent } from "preact";
import { useCallback, useMemo, useState, useContext } from "preact/hooks";
import { FaBitcoin } from "react-icons/fa";

import type {
  ProductWithOptionsWithValues,
  OptionWithValue,
  Variant,
  Product as ProductType,
  OptionWithValues
} from "@utils/types/shopify";
import { toPriceString } from "@utils/utils";
import { Button } from "@components/styled";
import { useBoolean } from "@utils/hooks";

import GloryIsInGod from "@images/glory-is-in-god.svg";

import {
  Title,
  DetailsDiv,
  Description,
  Price,
  ProductDiv,
  OptionRow,
  OptionPrompt,
  OptionChoices,
  OptionButton,
  OptionNote,
  Emblem,
  addToCartButtonStyles,
} from "./Product.styles";
import { findVariantByOptions, findOptionIndexCaseInsensitive, getSelectedOptions } from "./Product.utils";

import { withTemplate } from "@components/Layout";

import register from "@utils/custom-element";
import StoreContext from "@utils/context";
import Products from "@components/Products";
import Modal from "@components/Modal";

interface ProductProps {
  productData: ProductWithOptionsWithValues;
  colors?: { [color: string]: ProductWithOptionsWithValues }
}

const Product: FunctionComponent<ProductProps> = ({
  productData: {
    product: initialProduct,
    optionsWithValues: initialOptionsWithValues,
  },
  colors,
}) => {
  const { cart } = useContext(StoreContext);
  const { state: cartUpdating, ...handleCartUpdating } = useBoolean(false);

  const [curProduct, setCurProduct] = useState<ProductType>(() => {
    if (colors === undefined) { return initialProduct; }

    try {
      return Object.values(initialOptionsWithValues)
        .filter(optionWithValues => optionWithValues.name.toLowerCase() === "color")
        // "color" should always have only one option
        .map(optionWithValues => colors[optionWithValues.values[0]])[0].product;
    } catch (err) {
      // TODO: report bad product listing
    }

    return initialProduct;
  });

  const [curOptionsWithValues, setCurOptionsWithValues] = useState(initialOptionsWithValues);

  // FIXME: check why this is working!!!!!!
  // used to determine variant within cur product
  const [selectedOptions, setSelectedOptions] = useState(getSelectedOptions(initialOptionsWithValues));

  // used to add variant to cart
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(() => {
    if (
      initialProduct.variants.length === 1
      && colors === undefined
    ) { return initialProduct.variants[0]; }

    return undefined;
  });

  // creates options obj to be mapped over for display purposes
  const options = useMemo(() => {
    const sizeIndex = findOptionIndexCaseInsensitive("size", curOptionsWithValues);
    const colorIndex = findOptionIndexCaseInsensitive("color", curOptionsWithValues);
    return {
      size: sizeIndex !== -1 ? [curOptionsWithValues[sizeIndex]] : undefined,
      others: curOptionsWithValues.filter(
        (option, index) => index !== sizeIndex && index !== colorIndex && option.name.toLowerCase() !== "null"
      )
    };
  }, [curOptionsWithValues]);

  // update selected options when product changes (i.e. use selects a new color), 
  // or user selects an option (other than color), however use getSelectedOptions
  // to try and preserve previous options if available
  const selectOption = useCallback((
    product: ProductType,
    optionsWithValues: OptionWithValues[],
    selectedOptionWithValue?: OptionWithValue
  ) => {
    setSelectedOptions(curSelectedOptions => {
      const newSelectedOptions = {
        // required so that when curProduct changes options are updated
        ...getSelectedOptions(optionsWithValues, curSelectedOptions),
        // needed because when color changes no optionWithValue is passed in
        ...(selectedOptionWithValue !== undefined ? { [selectedOptionWithValue.name]: selectedOptionWithValue } : {})
      };

      const variant = findVariantByOptions(product.variants, Object.values(newSelectedOptions));
      setSelectedVariant(variant);

      return newSelectedOptions;
    });
  }, []);

  // used to disable interactions and open cart when adding items to cart
  // and to add items to cart
  const addToCart = useCallback(async () => {
    if (selectedVariant) {
      handleCartUpdating.on();

      // FIXME: handle err
      const err = await cart.incrementItem(selectedVariant.id);

      if (err === undefined) { cart.open.on(); }

      handleCartUpdating.off();
    }
  }, [cart, handleCartUpdating, selectedVariant]);

  const addToCartLabel = useMemo(() => {
    if (selectedVariant === undefined) {
      return "Add to Cart" as const;
    }

    if (selectedVariant.inventory_quantity > 0) {
      return "Add to Cart" as const;
    }

    if (selectedVariant.inventory_policy === "continue") {
      return "Pre-order" as const;
    }

    if (
      selectedVariant.inventory_policy === "deny"
      && selectedVariant.my_fields.restock_date !== ""
      && new Date(selectedVariant.my_fields.restock_date) > new Date()
    ) {
      return "Coming Soon" as const;
    }

    if (
      selectedVariant.inventory_policy === "deny"
    ) {
      return "Sold Out" as const;
    }

    return "Add to Cart" as const;
  }, [selectedVariant]);

  const price = useMemo(() => {
    const curPrice = selectedVariant !== undefined ? selectedVariant.price : initialProduct.price;
    return curPrice === 0 ? <FaBitcoin /> : toPriceString(curPrice);
  }, [initialProduct, selectedVariant]);

  const { state: showSizeGuide, ...handleShowSizeGuide } = useBoolean(true);

  return (
    <>
      <ProductDiv className="container">
        <Products.Product
          className="product-page__images"
          images={curProduct.images}
          title={curProduct.title}
          collections={curProduct.collections}
        />
        {/*  */}
        <DetailsDiv className="product-page__details">
          <Title>{curProduct.title}</Title>
          <Emblem>
            <img src={GloryIsInGod} alt="" aria-label="store emblem" />
          </Emblem>
          <Description>{curProduct.description}</Description>
          <Price>{price}</Price>

          {/* Size options */}
          {options.size && (
            options.size.map(option => (
              <OptionRow key={option.name}>
                <OptionPrompt>{option.name}</OptionPrompt>
                <OptionChoices>
                  {option.values.map(optionValue => (
                    <OptionButton
                      key={optionValue}
                      onClick={() => selectOption(
                        curProduct,
                        curOptionsWithValues,
                        { name: option.name, position: option.position, value: optionValue },
                      )}
                      className={selectedOptions[option.name]?.value.valueOf() === optionValue.valueOf() ? "selected" : ""}
                    >
                      {optionValue}
                    </OptionButton>
                  ))}
                </OptionChoices>
                {/* <OptionNote onClick={handleShowSizeGuide.on}>Size Guide</OptionNote> */}
              </OptionRow>
            ))
          )}

          {/* Color options */}
          {colors && (
            <OptionRow className="colors">
              <OptionPrompt className="colors__prompt">Color</OptionPrompt>
              <OptionChoices className="colors__choices">
                {Object.entries(colors).map(([color, { product, optionsWithValues }]) => (
                  <OptionButton
                    key={color}
                    onClick={() => {
                      setCurProduct(product);
                      setCurOptionsWithValues(optionsWithValues);
                      selectOption(product, optionsWithValues);
                    }}
                    className={`colors__choice ${curProduct === product ? "selected" : ""}`}
                  >
                    <div className="colors__choice-swatch" style={{ backgroundColor: color }} />
                  </OptionButton>
                ))}
              </OptionChoices>
            </OptionRow>
          )}

          {/* Other options */}
          {options.others.map(option => (
            <OptionRow key={option.name}>
              <OptionPrompt>{option.name}</OptionPrompt>
              <OptionChoices>
                {option.values.map(optionValue => (
                  <OptionButton
                    key={optionValue}
                    onClick={() => selectOption(
                      curProduct,
                      curOptionsWithValues,
                      { name: option.name, position: option.position, value: optionValue },
                    )}
                    className={selectedOptions[option.name]?.value === optionValue ? "selected" : ""}
                  >
                    {optionValue}
                  </OptionButton>
                ))}
              </OptionChoices>
            </OptionRow>
          ))}

          {/* Add to Cart / Pre-order / Sold Out */}
          <Button
            htmlProps={{
              onClick: addToCart,
              disabled: selectedVariant === undefined
                || (selectedVariant.inventory_quantity < 1 && selectedVariant.inventory_policy === "deny")
                || cartUpdating,
              className: addToCartButtonStyles,
            }}
          >
            {addToCartLabel}
          </Button>

        </DetailsDiv>
      </ProductDiv>
      <Modal isOpen={showSizeGuide} onClose={handleShowSizeGuide.off} >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, asperiores nihil velit tenetur aspernatur temporibus labore iusto. Ipsam quo nobis incidunt deleniti temporibus. Optio, maiores! Alias necessitatibus natus quisquam odit.
      </Modal>
    </>
  );
};

const ProductWithTemplate = withTemplate(Product);

register(ProductWithTemplate);
