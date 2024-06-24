import type { FunctionComponent } from "preact";
import { FaEnvelope, FaLock } from "react-icons/fa";

import { colors } from "@utils/theme";

import { MainForm } from "./Form.styles";

interface FormProps {
  type: "signup" | "password",
  emailPlaceholder?: string,
  className?: string,
}

const Form: FunctionComponent<FormProps> = ({
  type,
  emailPlaceholder,
  className,
}) => {
  if (type === "password") {
    return (
      <MainForm
        method="post"
        id="login_form"
        action="/password"
        accept-charset="UTF-8"
        className={`form ${className ?? ""}`}
      >
        <input type="hidden" name="form_type" value="storefront_password" />
        <input type="hidden" name="utf8" value="✓" />
        {/* <label for="password">Enter store using password: </label> */}
        <input
          className="form__field"
          type="text"
          name="password"
          id="password"
          placeholder="password"
        // autofocus
        />
        <button className="form__submit" type="submit" value="Enter">
          <FaLock color={colors.primary} />
        </button>
      </MainForm>
    );
  }

  return (
    <MainForm
      method="post"
      id="contact_form"
      action="/contact#contact_form"
      className={`form ${className ?? ""}`}
    >
      <input type="hidden" name="form_type" value="customer" />
      <input type="hidden" name="utf8" value="✓" />
      <input type="hidden" name="contact[tags]" value="newsletter" />
      <input
        className="form__field"
        type="email"
        name="contact[email]"
        // autoFocus
        autoCorrect="off"
        autoCapitalize="none"
        autoComplete="email"
        placeholder={emailPlaceholder ?? ""}
        aria-required="true"
        required
      />
      <button className="form__submit" type="submit">
        <FaEnvelope color={colors.primary} />
      </button>
    </MainForm>
  );
};

export default Form;
