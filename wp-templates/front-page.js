import { useQuery, gql } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout } from "features"; // Blocks eventually
import { NavigationMenu } from "components";
import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_FRAGMENT,
} from "fragments";

export default function Component() {
  const { data, loading, error } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { page, headerMenuItems, footerMenuItems, siteSettings } = data;
  const { seo, title } = page;
  const {
    address,
    customAddressLabel,
    phoneNumber,
    logo,
    logoWhite,
    logoAlt,
    cta,
    email,
  } = siteSettings.siteSettings;

  return (
    <Layout
      headerMenuItems={headerMenuItems}
      footerMenuItems={footerMenuItems}
      siteSettings={siteSettings}
      seo={seo}
      logo={logo}
      logoWhite={logoWhite}
      logoAlt={logoAlt}
      cta={cta}
    >
      <div className="container relative mx-auto flex h-screen w-full flex-col justify-center">
        <div clasName={`grid text-center h-fit relative w-full`}>
          <h1 className="text-center text-4xl font-bold">
            Noisy Trumpet Headless WordPress Starter
          </h1>
        </div>
      </div>
    </Layout>
  );
}

Component.query = gql`
  query HomePage(
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
    $asPreview: Boolean = false
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    siteSettings {
      ...SiteSettingsFragment
    }
    page(id: "/", idType: URI, asPreview: $asPreview) {
      id
      title
      seo {
        ...SEOFragment
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
  ${SEO_FRAGMENT}
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
