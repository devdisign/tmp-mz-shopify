import { styled } from "@linaria/react";
import { colors } from "@utils/theme";

export const MainForm = styled.form`
  --h: 1.7em;
  --button-width: 3em;
  --transition: transform 250ms ease-in-out;

  display: flex;
  flex-direction: row;
  border: 1px solid ${colors.primary};
  line-height: var(--h);
  width: min(25rem, 70vw);
  /* margin: auto; */
  transform: translateX(calc(var(--button-width) / 2));

  &, & > * {
    transition: var(--transition);
  }

  &:focus, & > *:focus {
    outline: none;
  }

  &:hover, &:focus-within {
    --scale: 1.1
    transform: scale(var(--scale)) translate(calc(var(--button-width) * var(--scale) / 2));
    
    & > .form__field, .form__submit {
      transform: scale(1.1)
    }
  }

  & > .form__field {
    line-height: var(--h);
    overflow: scroll;
    color: ${colors.primary};
    padding-left: 1em;
    border-radius: 0;
    text-align: center;
    text-transform: uppercase;
    flex: 1;
  }

  & > .form__submit {
    color: ${colors.bg};
    background-color: transparent;
    height: var(--h);
    width: var(--button-width);
    /* border-left: 1px solid ${colors.primary}; */
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: ${colors.opacity};
    }

    /* & > svg {
      width: auto;
      height: var(--h);
    } */
  }
`;
