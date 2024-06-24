import { createElement, Fragment, FunctionComponent, JSX } from "preact";
import { useMemo } from "preact/hooks";

import type { Collection, Product as ProductType } from "@utils/types/shopify";

import { productStyles } from "./Product.styles";

interface ProductProps extends
  Pick<JSX.HTMLAttributes<HTMLElement>, "className">,
  Pick<ProductType, "images" | "title">,
  Partial<Pick<ProductType, "url" | "collections">> {
}

const containsKey = (
  array: Collection[],
  key: string,
) => {
  return array.filter(
    obj => obj.handle === key
  ).length > 0;
};

const Product: FunctionComponent<ProductProps> = ({
  className,
  images,
  title,
  url,
  collections,
}) => {
  const hoverAction = useMemo(() => {
    if (!collections) {
      return "";
    }

    // if artwork then spin
    if (containsKey(collections, "artwork")) {
      return "product--rotate";
    }

    // if clothes and has second image, then flip
    if (containsKey(collections, "artwear") && images?.[1] !== undefined) {
      return "product--flip";
    }

    return "";
  }, [collections, images]);

  const Wrapper: FunctionComponent<{ className: string }> = useMemo(() => {
    return ({ children, ...props }) => {
      const innerElement = createElement("div", { className: "product__motion-container" }, children);

      const isAnchor = url !== undefined;

      return createElement(
        isAnchor ? "a" : "div",
        Object.assign(props, isAnchor ? { href: url } : {}),
        innerElement
      );
    };
  }, [url]);

  return (
    <Wrapper className={`product ${hoverAction} ${productStyles} ${className ?? ""}`}>
      <img className={`product__front`} src={images[0]} alt={title} />
      {hoverAction === "product--flip" && <img className={`product__back`} src={images[1]} alt={title} />}
    </Wrapper>
  );
};

export default Product;
