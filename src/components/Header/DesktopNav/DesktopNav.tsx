import type { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { FaTimes } from "react-icons/fa";

import type { LinkData } from "@utils/types/shopify";

import storeContext from "@utils/context";

import { Nav } from "./DesktopNav.styles";

import RawEntities, { ReactComponent as Entities } from "@images/entities.svg";

export interface DesktopNavProps {
  links: LinkData[],
  logo: string,
  // entities?: string,
  className: string,
}

const DesktopNav: FunctionComponent<DesktopNavProps> = ({
  links,
  // entities,
  className
}) => {
  const { historyUrl: { url }, cart } = useContext(storeContext);

  // TODO: consider adding entities as nav indicator
  // const linkActiveClass = useMemo(
  //   () => entities !== undefined
  //     ? "active-entities"
  //     : "active",
  //   [entities]
  // );
  const linkActiveClass = "active";

  return (
    <Nav
      className={className}
      aria-label="primary"
    >
      <ul className="nav__list">
        {links.map((link, i) => (
          <li
            key={i}
            className={`
                nav__list-item 
                ${url.pathname === link.url && link.url !== "/" && !cart.open.state ? linkActiveClass : ""}
              `}
          >
            <a href={link.url}>
              {link.title}
            </a>
            {/* <Entities /> */}
          </li>
        ))}
        <li className={`nav__list-item cart ${cart.open.state ? linkActiveClass : ""}`}>
          <button onClick={cart.open.toggle}>
            {cart.open.state ? <FaTimes /> : "Cart"}
          </button>
          {/* <Entities /> */}
        </li>
      </ul>
    </Nav>
  );
};

export default DesktopNav;
