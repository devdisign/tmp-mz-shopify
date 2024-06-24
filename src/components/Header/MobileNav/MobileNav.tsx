import type { FunctionComponent } from "preact";
import { useContext, useEffect, useRef } from "preact/hooks";

import { useBoolean, useBreakpoint } from "@utils/hooks";
import type { LinkData } from "@utils/types/shopify";

import { Nav } from "./MobileNav.styles";
import { breakpoints } from "@utils/theme";
import storeContext from "@utils/context";
import { useOnClickOutside } from "usehooks-ts";
import { IGNORE_OUTSIDE_CLICK } from "@utils/constants";

export interface MobileNavProps {
  links: LinkData[],
  logo: string,
  entities?: string,
  className: string,
}

const hambugesa = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50.25" height="50.25" viewBox="0 0 50.25 50.25">
    <g id="Hamburger_Menu" data-name="Hamburger Menu" transform="translate(0 1.25)">
      <path id="long_bar" data-name="Path 389" d="M0,0H50" fill="#fff" stroke="#fff" stroke-width="2.5" />
    </g>
    <g id="Hamburger_Menu-2" data-name="Hamburger Menu" transform="translate(19 11.25)">
      <path id="short_bar" data-name="Path 389" d="M0,0H31.25" fill="#fff" stroke="#fff" stroke-width="2.5" />
    </g>
  </svg>
);

const MobileNav: FunctionComponent<MobileNavProps> = ({
  children: _,
  links,
  entities,
  className,
}) => {
  const { state: hambugesaOpen, ...handleHambugesaOpen } = useBoolean(false);
  const breakpointExceeded = useBreakpoint(breakpoints.md);

  const { historyUrl: { url }, cart } = useContext(storeContext);

  const linkActiveClass = "active";

  useEffect(() => {
    if (breakpointExceeded) { handleHambugesaOpen.off(); }
  }, [breakpointExceeded, handleHambugesaOpen]);

  const topElRef = useRef(null);
  useOnClickOutside(topElRef, handleHambugesaOpen.off);

  return (
    <Nav
      className={`${className} ${hambugesaOpen ? "nav--open" : "nav--closed"}`}
      aria-label="primary"
    >
      <div
        ref={topElRef}
        className="nav__hambugesa-container"
      >
        <button
          style={{ "--n-max": links.length + 2 }}
          className={`nav__hambugesa ${IGNORE_OUTSIDE_CLICK.DRAWER}`}
          onClick={handleHambugesaOpen.toggle}
        // ref={toggleHambugesa}
        >
          {hambugesa}
        </button>
        <ul className="nav__list">
          {links.map((link, i) => (
            <li key={i}>
              <a
                style={{ "--n": i + 1, "--n-max": links.length + 2 }}
                className={`nav__list-item 
                ${url.pathname === link.url && !cart.open.state ? linkActiveClass : ""}
              `}
                onClick={handleHambugesaOpen.off}
                href={link.url}
              >
                {link.title}
              </a>
            </li>
          ))}
          <li>
            <button
              style={{ "--n": links.length + 1, "--n-max": links.length + 2 }}
              className={`nav__list-item ${cart.open.state ? linkActiveClass : ""}`}
              onClick={() => {
                cart.open.toggle();
                handleHambugesaOpen.off();
              }}>
              Cart
            </button>
          </li>
        </ul>
      </div>
    </Nav>
  );
};

export default MobileNav;
