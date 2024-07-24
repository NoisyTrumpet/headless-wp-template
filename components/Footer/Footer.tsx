import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { NavigationMenu } from "components/NavigationMenu";
import { AcfLink, AcfGoogleMap, MenuItem, AcfMediaItemConnectionEdge } from "graphql";
import Link from "next/link";
import Logo from "public/logo.svg";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

export interface FooterProps {
  logo: AcfMediaItemConnectionEdge;
  menuItems: MenuItem[];
  phoneNumber: AcfLink;
  address: AcfGoogleMap;
  email: AcfLink;
  cta: AcfLink;
}

const Footer = ({
  logo,
  menuItems,
  phoneNumber,
  address,
  email,
  cta,
}: FooterProps) => {
  return (
    <footer className={`bg-primary font-sans text-gray-100`}>
      <div
        className={`container mx-auto flex flex-col flex-wrap py-8 md:flex-row md:justify-between`}
      >
        {/* Logo */}
        <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          {logo ? (
            <FeaturedImage image={logo.node} className={`mb-4 w-32 md:mb-0`} />
          ) : (
            <a
              href="https://noisytrumpet.com"
              className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
            >
              {`NT Headless Site Template`}
            </a>
          )}
        </div>
        {/* Menu */}
        <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          <NavigationMenu menuItems={menuItems} className={`text-white`} />
          {cta ? (
            <Button className={`ml-4`} type="secondary" href={cta.url ?? ``}>
              {cta.title}
            </Button>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
