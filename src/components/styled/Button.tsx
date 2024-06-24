import { styled } from "@linaria/react";
import { colors } from "@utils/theme";
import { FunctionComponent, JSX } from "preact";

const StyledButton = styled.button`
  --main-color: ${colors.primary};
  --secondary-color: ${colors.bg};

  color: var(--main-color);
  min-width: var(--button-width, 12em);
  height: fit-content; /* TODO: find out why this is needed */
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 0.8rem;
  text-transform: uppercase;
  animation: fadeIn 500ms ease-out;
  position: relative;
  z-index: 1;
  /* transition-delay: 100ms; */
  transition: color 200ms ease-in;

  &.primary {
    outline: var(--main-color) solid 1px;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--main-color);
      z-index: -1;
      transition: transform 200ms ease-in;
      transform: scaleX(0);
      transform-origin: right;
    }

    &:active {
      transform: translateY(0.5em);
    }

    &:hover {
      color: var(--secondary-color);
      &::after {
        transform: scaleX(1.2); // due to firefox bug
        transform-origin: left;
      }
    }
  }

  &.underline {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 100%;
      background-color: ${colors.primary};
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 250ms ease-in;
    }

    &:hover::after {
      transform-origin: left;
      transform: scaleX(1);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:active { transform: none; }
    &:hover { color: var(--main-color); }
    &:hover::after { content:none; }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(2vh);
    }

    100% {
      opacity: 1;
    }
  }
`;

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "underline"
  width?: number | "auto";
}

interface HTMLProps {
  htmlProps: Partial<Omit<JSX.HTMLAttributes<HTMLButtonElement>, "style">>,
}

const StyledButtonWithProps: FunctionComponent<ButtonProps & HTMLProps> = ({
  width = "12em",
  variant = "primary",
  children,
  htmlProps: { className, ...htmlProps }
}) => {
  return (
    <StyledButton
      {...htmlProps}
      className={`${variant} ${className}`}
      style={{
        ...(width !== undefined ? { "--button-width": `${width}${typeof width === "number" ? "em" : ""}` } : {})
      }}
    >
      {children}
    </StyledButton>
  );
};

export default StyledButtonWithProps;
