import type { FunctionComponent } from "preact";

import Footer, { FooterProps } from "@components/Footer";
import Header, { HeaderProps } from "@components/Header";
import Cart from "@components/Cart";

export { default as GlobalCss } from "@utils/theme";
import { useBreakpoint, useCart, useHistoryUrl } from "@utils/hooks";
import { useCartOpen } from "@utils/hooks/cart";
import StoreContext from "@utils/context";

import { BgIconDiv, headerStyles, StyledMain, drawerStyles } from "./Layout.styles";
import type { CartData } from "@utils/types/shopify";
import Drawer from "@components/Drawer";
import { Button } from "@components/styled";
import { breakpoints } from "@utils/theme";

import DogsInitialFrame from "@images/dogs-initial-frame.gif";
import Dogs from "@images/dogs.gif";

export interface TemplateProps {
  header: HeaderProps,
  footer: FooterProps,
  centerImage?: string,
  password?: string,
  cartData: CartData,
  content: FunctionComponent<any>,
  animationBreakpoint: number | false,
}

const Template: FunctionComponent<TemplateProps> = ({
  header,
  footer,
  centerImage,
  animationBreakpoint,
  cartData,
  children,
}) => {
  const { history, url } = useHistoryUrl();

  const openCart = useCartOpen({ history, url });
  const cart = useCart(cartData);

  const breakpointExceed = useBreakpoint(animationBreakpoint !== false ? animationBreakpoint : 0);

  return (
    <>
      <StoreContext.Provider
        value={{
          historyUrl: { history, url },
          cart: Object.assign({}, cart, { open: openCart })
        }}
      >
        <Header className={headerStyles} {...header} />
        <StyledMain>
          {children}
        </StyledMain>
        <Footer {...footer} />
        {centerImage && (
          <BgIconDiv
            onClick={() => window.location.pathname = "/"}
            className="bg-animation-container"
            aria-hidden
            display={breakpointExceed ? "flex" : "none"}
          >
            <img
              className="bg-animation"
              src={Dogs}
              alt="animated dogs breathing fire"
            />
            <img
              className="bg-animation-freeze-frame"
              src={DogsInitialFrame}
              alt="animated dogs breathing fire"
              aria-hidden
            />
          </BgIconDiv>
        )}
        <Drawer
          className={drawerStyles}
          isOpen={openCart.state}
          closeElement={(
            <Button
              htmlProps={{
                onClick: openCart.off
              }}
              variant="underline"
              width="auto"
            >
              Continue Shopping
            </Button>
          )}
          onClose={openCart.off}
        >
          <Cart />
        </Drawer>
      </StoreContext.Provider>
    </>
  );
};

export const withTemplate = <T,>(
  Component: FunctionComponent<T>,
  animationBreakpoint: number | false = breakpoints.lg
) => {
  // TODO: check empty strings
  const displayName = Component.displayName ?? Component.name ?? "Component";

  const ComponentWithTemplate: FunctionComponent<T & { template: TemplateProps }> = ({
    template,
    ...props
  }) => <Template {...template} animationBreakpoint={animationBreakpoint}><Component {...props as T} /></Template>;

  ComponentWithTemplate.displayName = `withTemplate(${displayName})`;

  return ComponentWithTemplate;
};

export default Template;
