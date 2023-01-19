import { gql } from "@apollo/client";

export const SEO_FRAGMENT = gql`
  fragment SEOFragment on PostTypeSEO {
    twitterTitle
    twitterImage {
      mediaItemUrl
    }
    twitterDescription
    title
    schema {
      raw
      pageType
      articleType
    }
    readingTime
    opengraphUrl
    opengraphType
    opengraphTitle
    opengraphSiteName
    opengraphPublisher
    opengraphPublishedTime
    opengraphModifiedTime
    opengraphImage {
      mediaItemUrl
    }
    opengraphDescription
    opengraphAuthor
    metaRobotsNoindex
    metaRobotsNofollow
    metaKeywords
    metaDesc
    fullHead
    focuskw
    cornerstone
    canonical
    breadcrumbs {
      text
      url
    }
  }
`;
