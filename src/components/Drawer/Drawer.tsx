import { IGNORE_OUTSIDE_CLICK } from "@utils/constants";
import { breakpoints } from "@utils/theme";
import type { FunctionComponent, JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useOnClickOutside } from "usehooks-ts";

import { DrawerDiv } from "./Drawer.styles";

interface DrawerProps {
  isOpen: boolean,
  onClose: () => void,
  closeElement: JSX.Element,
  className: string,
}

// https://github.com/Andarist/use-onclickoutside/issues/1#issuecomment-456182603
const hasIgnoredClass = (element: HTMLElement, ignoredClass: string) => {
  return (
    element.correspondingElement // TODO: check if correspondingElement is required
      ? element.correspondingElement
      : element
  ).classList.contains(ignoredClass);
};

const isInIgnoredElement = (element: HTMLElement, ignoredClass: string) => {
  do {
    if (hasIgnoredClass(element, ignoredClass)) {
      return true;
    }
  } while ((element = element.parentElement as HTMLElement));

  return false;
};

const Drawer: FunctionComponent<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  closeElement,
  className,
}) => {
  const topElRef = useRef<HTMLElement>(null);

  const [animate, setAnimate] = useState<"animate" | "">("animate");

  useEffect(() => {
    const timeoutId = setTimeout(() => setAnimate(""), 750);
    return () => clearTimeout(timeoutId);
  }, []);

  useOnClickOutside(topElRef, e => {
    if (window.innerWidth < breakpoints.sm) { return; }

    if (isInIgnoredElement(e.target as HTMLElement, IGNORE_OUTSIDE_CLICK.DRAWER)) {
      return;
    }

    onClose();
  });

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <DrawerDiv ref={topElRef} className={`drawer ${className} ${animate} ${isOpen ? "visible" : "hidden"}`}>
      <div className="drawer__close">
        {closeElement}
      </div>
      <div className="drawer__content">
        {children}
      </div>
    </DrawerDiv>
  );
};

export default Drawer;
