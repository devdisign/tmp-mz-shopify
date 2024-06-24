import { styled } from "@linaria/react";
import { colors } from "@utils/theme";

export const Title = styled.h1`
  font-size: 2rem;
  margin: 2em;
`;

export const Content = styled.section`
  margin: 2rem;

  max-width: max(35vw, 20rem);
  white-space: pre-line;
  text-align: right;

  table {
    text-align: left;
  }

  th, td {
    padding: 15px;
  }

  table, th, tr, td {
    border: 1px solid ${colors.primary};
  }

  strong {
    font-weight: bold;
  }

  a {
    text-decoration: underline dotted;
    /* white-space: nowrap; */
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
`;
