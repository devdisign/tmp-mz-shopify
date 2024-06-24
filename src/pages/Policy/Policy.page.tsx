import type { FunctionComponent } from "preact";

import { Content, Title } from "./Policy.styles";

import { withTemplate } from "@components/Layout";

import register from "@utils/custom-element";

interface PolicyProps {
  title: string,
  content: string,
}

const Policy: FunctionComponent<PolicyProps> = ({ title, content }) => (
  <>
    <Title className="policy__title">{title}</Title>
    <Content className="policy__content" dangerouslySetInnerHTML={{ __html: content }} />
  </>
);

const PolicyWithTemplate = withTemplate(Policy);

register(PolicyWithTemplate);
