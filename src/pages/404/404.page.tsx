import type { FunctionComponent } from "preact";

import register from "@utils/custom-element";

import Redirecting from "@components/Redirecting";

import { withTemplate } from "@components/Layout";

const My404: FunctionComponent = () => (
  <Redirecting location="/" />
);

const My404WithTemplate = withTemplate(My404);

register(My404WithTemplate);
