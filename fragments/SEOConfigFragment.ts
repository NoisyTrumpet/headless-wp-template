import { gql } from "@apollo/client";

export const SEO_CONFIG_FRAGMENT = gql`
  fragment SEOConfigFragment on SEOConfig {
    webmaster {
      baiduVerify
      googleVerify
      msVerify
      yandexVerify
    }
    social {
      otherSocials
      facebook {
        url
      }
      instagram {
        url
      }
      linkedIn {
        url
      }
      mySpace {
        url
      }
      pinterest {
        url
      }
      twitter {
        username
      }
      wikipedia {
        url
      }
      youTube {
        url
      }
    }
    schema {
      wordpressSiteName
      siteUrl
      siteName
      personName
      logo {
        mediaItemUrl
        mediaDetails {
          width
          height
        }
      }
      inLanguage
      homeUrl
      companyOrPerson
      companyName
      companyLogo {
        mediaItemUrl
        mediaDetails {
          width
          height
        }
      }
    }
    redirects {
      format
      origin
      target
      type
    }
    openGraph {
      frontPage {
        title
        description
        image {
          mediaItemUrl
          mediaDetails {
            width
            height
          }
        }
      }
      defaultImage {
        mediaItemUrl
        mediaDetails {
          width
          height
        }
      }
    }
    meta {
      notFound {
        breadcrumb
        title
      }
      homepage {
        description
        title
      }
      config {
        separator
      }
      author {
        description
        title
      }
    }
    breadcrumbs {
      archivePrefix
      boldLast
      enabled
      homeText
      notFoundText
      prefix
      showBlogPage
      separator
      searchPrefix
    }
  }
`;
