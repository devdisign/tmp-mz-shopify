import type { FunctionComponent, JSX } from "preact";

import type { LinkData } from "@utils/types/shopify";

import { Header as StyledHeader } from "./Header.styles";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

import GiigImg, { ReactComponent as GiigLogo } from "@images/giig-logo.svg";
import { useEffect, useState } from "preact/hooks";

export interface HeaderProps {
  links: LinkData[],
  logo: string,
  entities?: string,
}

const Header: FunctionComponent<HeaderProps & Pick<JSX.HTMLAttributes<HTMLHeadElement>, "className">> = ({
  children: _,
  links,
  logo,
  entities,
  className,
  ...props
}) => {
  const [animate, setAnimate] = useState<"animate" | "">("animate");

  useEffect(() => {
    const timeoutId = setTimeout(() => setAnimate(""), 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    // TODO: fix styled components JSX source
    <StyledHeader {...props} className={`${className} ${animate}`}>
      <a href="/"><img className="header__logo" src={logo} alt="" /></a>
      {/* <a href="/"><img className="header__logo" src={GiigImg} alt="" /></a> */}
      {/* <a href="/"><GiigLogo className="header__logo" /></a> */}
      <DesktopNav
        {...{ links, logo, entities }}
        className="header__nav-desktop"
      />
      <MobileNav
        {...{ links, logo, entities }}
        className="header__nav-mobile"
      />
    </StyledHeader>
  );
};

export default Header;
