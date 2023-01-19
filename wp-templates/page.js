import { useQuery, gql } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout } from "features"; // Blocks eventually
import { NavigationMenu } from "components";
import {
    BLOG_INFO_FRAGMENT,
    SITE_SETTINGS_FRAGMENT,
    SEO_FRAGMENT,
} from "fragments";

export default function Component(props) {
    const { data, loading, error } = props

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
                <div className={`relative grid h-fit w-full text-center`}>
                    <h1 className="text-center font-heading text-4xl font-bold">
                        {title}
                    </h1>
                </div>
            </div>
        </Layout>
    );
}

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
    siteSettings {
      ...SiteSettingsFragment
    }
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      title
      content
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

Component.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        headerLocation: MENUS.PRIMARY_LOCATION,
        footerLocation: MENUS.FOOTER_LOCATION,
        asPreview: ctx?.asPreview,
    };
};
