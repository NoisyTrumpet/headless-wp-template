import { Main } from "features/Main"; // SEO
import {
  AcfLink,
  Acf_GoogleMap,
  MediaItem,
  MenuItem,
  PostTypeSeo,
  RootQueryToMenuItemConnection,
} from "graphql";
import { SEO } from "features/SEO";

import { Header, Footer } from "components";

export interface LayoutProps {
  children: React.ReactNode;
  headerMenuItems: RootQueryToMenuItemConnection;
  footerMenuItems: RootQueryToMenuItemConnection;
  title: string;
  description: string;
  logo: MediaItem;
  logoAlt: MediaItem;
  logoWhite: MediaItem;
  seo: PostTypeSeo;
  cta: AcfLink;
  phoneNumber: AcfLink;
  address: Acf_GoogleMap;
  email: AcfLink;
}

const Layout = ({
  children,
  headerMenuItems,
  footerMenuItems,
  cta,
  title,
  description,
  seo,
  logo,
  logoAlt,
  logoWhite,
  phoneNumber,
  address,
  email,
}: LayoutProps) => {
  return (
    <>
      <SEO seo={seo} />
      <Header
        menuItems={headerMenuItems.nodes}
        logo={logo}
        logoAlt={logoAlt}
        cta={cta}
      />
      <Main className={`main`}>{children}</Main>
      <Footer
        menuItems={footerMenuItems.nodes}
        cta={cta}
        phoneNumber={phoneNumber}
        logo={logoWhite}
        address={address}
        email={email}
      />
    </>
  );
};

export default Layout;
