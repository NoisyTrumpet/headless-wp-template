import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { NavigationMenu } from "components/NavigationMenu";
import { useCycle, useScroll } from "framer-motion";
import { AcfLink, AcfMediaItemConnectionEdge, MediaItem, MenuItem } from "graphql";
import { useEffect, useRef, useState } from "react";
import flatListToHierarchical from "utilities/flatListToHierarchical";

export interface HeaderProps {
  menuItems: MenuItem[];
  logo: AcfMediaItemConnectionEdge;
  logoAlt: AcfMediaItemConnectionEdge;
  cta: AcfLink;
}

const Header = ({ menuItems, logo, logoAlt, cta }: HeaderProps) => {
  const [open, cycleOpen] = useCycle(false, true);
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // If latest is greater than height of header, set isScrolledPast to true
      if (latest > 0) {
        setIsScrolledPast(true);
      } else {
        setIsScrolledPast(false);
      }
    });
  }, [scrollY]);

  return (
    <header
      className={`${
        isScrolledPast ? `shadow-md` : ``
      } body-font sticky top-0 z-30 max-h-fit bg-white font-sans text-gray-600 transition-shadow`}
      ref={ref}
    >
      <div className="container mx-auto flex flex-row flex-wrap items-center justify-center py-4 md:justify-between">
        <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          {/* Logo */}
          {logo ? (
            <FeaturedImage
              image={logo.node}
              className={`mb-4 w-32 md:mb-0`}
            />
          ) : (
            <a
              href="https://noisytrumpet.com"
              className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
            >
              {`NT Headless Site Template`}
            </a>
          )}
        </div>
        {/* CTA */}
        <div className={`flex flex-row flex-wrap items-center justify-center`}>
          {/* Navigation Menu */}
          <NavigationMenu
            menuItems={flatListToHierarchical(menuItems)}
            isOpen={open}
            type="secondary"
            toggleOpen={() => cycleOpen()}
          />
          {cta ? (
            <Button type={`primary`} className={`ml-4`} href={cta.url ?? ``}>
              {cta.title}
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
