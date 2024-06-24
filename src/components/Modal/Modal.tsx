import type { FunctionComponent, JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { FaTimes } from "react-icons/fa";
import { useOnClickOutside } from "usehooks-ts";

import { ModalDiv, ModalContentDiv } from "./Modal.styles";

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
}

const Modal: FunctionComponent<ModalProps & JSX.HTMLAttributes<HTMLDivElement>> = ({
  children,
  isOpen,
  onClose,
  className,
  ...props
}) => {
  const [visibility, setVisibility] = useState<"visible" | "hidden">();

  useEffect(() => {
    setVisibility(isOpen ? "visible" : "hidden");
  }, [isOpen]);

  useEffect(() => setVisibility(undefined), []);

  const topElRef = useRef<HTMLElement>(null);

  useOnClickOutside(topElRef, onClose);

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <ModalDiv ref={topElRef} {...props} className={`modal ${className} ${visibility}`}>
        <FaTimes className="modal__close" onClick={onClose} />
        <ModalContentDiv className="modal__content">
          {children}
        </ModalContentDiv>
      </ModalDiv>
    </>
  );
};

export default Modal;
