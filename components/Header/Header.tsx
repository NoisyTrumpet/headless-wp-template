import { AcfLink, MediaItem, MenuItem } from "graphql";

export interface HeaderProps {
  menuItems: MenuItem[];
  logo: MediaItem;
  logoAlt: MediaItem;
  cta: AcfLink;
}

const Header = ({ menuItems, logo, logoAlt, cta }: HeaderProps) => {
  return <header>Header</header>;
};

export default Header;
