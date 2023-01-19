import { gql } from "@apollo/client";

export const MEDIA_ITEM_FRAGMENT = gql`
  fragment MediaItemFragment on MediaItem {
    sourceUrl
    altText
    caption
    description
    srcSet
    sizes
    id
    caption
    mediaDetails {
      width
      height
    }
    mimeType
  }
`;
