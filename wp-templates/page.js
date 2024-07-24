import React from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_FRAGMENT,
} from "fragments";
import { MenuItem, Page, SiteSettings } from "graphql";
import { NavigationMenu } from "components";
import { Layout, Blocks } from "features";

const Component = (props) => {
  const { data, loading, error } = props;

  if (loading) {
    return <Loading type="page" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { page, headerMenuItems, footerMenuItems, themeSettings } = data;
  const { seo, title, flexibleContent } = page;
  const { blocks } = flexibleContent;
  const {
    address,
    customAddressLabel,
    phoneNumber,
    logo,
    logoWhite,
    logoAlt,
    cta,
    email,
  } = themeSettings.siteSettings;

  return (
    <Layout
      headerMenuItems={headerMenuItems}
      footerMenuItems={footerMenuItems}
      siteSettings={themeSettings}
      seo={seo}
      logo={logo}
      logoWhite={logoWhite}
      logoAlt={logoAlt}
      cta={cta}
    >
      <Blocks blocks={blocks} />
    </Layout>
  );
};

Component.query = gql`
  query PageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
    $asPreview: Boolean = false
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    themeSettings {
      ...SiteSettingsFragment
    }

    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      title
      seo {
        ...SEOFragment
      }
      flexibleContent {
        ...BlocksFragment
      }
    }
    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: 50
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(
      where: { location: $footerLocation }
      first: 50
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
  ${BLOG_INFO_FRAGMENT}
  ${SITE_SETTINGS_FRAGMENT}
  ${NavigationMenu.fragments.entry}
  ${Blocks.fragments.entry}
  ${SEO_FRAGMENT}
`;

export default Component;

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};
