import type { FunctionComponent } from "preact";

interface RedirectingProps {
  location: string;
}

const Redirecting: FunctionComponent<RedirectingProps> = ({ location }) => {
  window.location.replace(location);
  return null;
};

export default Redirecting;
