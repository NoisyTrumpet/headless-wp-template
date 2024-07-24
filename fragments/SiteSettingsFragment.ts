import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";

export const SITE_SETTINGS_FRAGMENT = gql`
  fragment SiteSettingsFragment on ThemeSettings {
    siteSettings {
      turnOnAnnouncements
      customAddressLabel
      announcements {
        backgroundColor
        content
        ctaType
        cta {
          target
          title
          url
        }
      }
      email {
        target
        title
        url
      }
      cta {
        target
        title
        url
      }
      address {
        city
        country
        latitude
        longitude
        placeId
        stateShort
        streetAddress
        streetName
        streetNumber
        postCode
        state
      }
      customAddressLabel
      phoneNumber {
        target
        title
        url
      }
      logo {
        node {
          ...MediaItemFragment
        }
      }
      logoAlt {
        node {
          ...MediaItemFragment
        }
      }
      logoWhite {
        node {
          ...MediaItemFragment
        }
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;
