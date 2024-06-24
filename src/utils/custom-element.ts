import { h, render, FunctionComponent } from "preact";

const createCustomElement = (Component: FunctionComponent<any>) => {
  return class extends HTMLElement {
    private readonly root = document.body;
    private readonly props: Record<string, any> = {};

    // TODO: accept paths
    setProp(prop: string, value: any) {
      this.props[prop] = value;
    }

    render() { render(h(Component, this.props, []), this.root); }
  };
};

const registerCustomElement = (Component: FunctionComponent<any>, tagName = "x-root") => (
  customElements.define(tagName, createCustomElement(Component))
);

export default registerCustomElement;
