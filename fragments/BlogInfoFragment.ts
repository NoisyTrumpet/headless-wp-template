import { gql } from "@apollo/client";

export const BLOG_INFO_FRAGMENT = gql`
  fragment BlogInfoFragment on GeneralSettings {
    title
    description
  }
`;
