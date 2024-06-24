import type { FunctionComponent } from "preact";

import Redirecting from "@components/Redirecting";

import { withTemplate } from "@components/Layout";

import register from "@utils/custom-element";

interface CartProps { }

const Cart: FunctionComponent<CartProps> = () => <Redirecting location="/?cart=1" />;

const CartWithTemplate = withTemplate(Cart);

register(CartWithTemplate);
