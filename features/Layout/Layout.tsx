import { Main } from "features/Main"; // SEO
import { MediaItem, MenuItem } from "graphql";

// import { Header, Footer} from "components"

export interface LayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  footerMenuItems: MenuItem[];
  title: string;
  description: string;
  logo: MediaItem;
}

const Layout = ({
  children,
  menuItems,
  footerMenuItems,
  title,
  description,
}: LayoutProps) => {
  return (
    <>
      {/* <SEO /> */}
      {/* <Header menuItems={menuItems} /> */}
      <Main className={`main`}>{children}</Main>
      {/* <Footer menuItems={footerMenuItems} /> */}
    </>
  );
};

export default Layout;
