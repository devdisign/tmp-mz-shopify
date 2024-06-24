import { FunctionComponent, toChildArray, JSX } from "preact";

import { ProductsDiv } from "./Products.styles";
import Product from "./Product";

const Products: FunctionComponent<Pick<JSX.HTMLAttributes<HTMLDivElement>, "className">> & { Product: typeof Product } = ({
  children,
  className,
}) => (
  <ProductsDiv className={`product__container ${className}`}>
    {toChildArray(children)}
  </ProductsDiv>
);

Products.Product = Product;

export default Products;
