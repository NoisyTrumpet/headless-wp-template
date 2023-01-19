import { gql } from "@apollo/client";

export const NAVIGATION_MENU_ITEM_FRAGMENT = gql`
  fragment NavigationMenuItemFragmentParent on MenuItem {
    id
    label
    url
    uri
    childItems {
      nodes {
        id
        label
        url
        uri
      }
    }
  }
`;
