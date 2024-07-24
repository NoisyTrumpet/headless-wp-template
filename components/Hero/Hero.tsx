import { gql } from "@apollo/client";
import { FlexibleContentBlocksHeroLayout } from "graphql";
import { MEDIA_ITEM_FRAGMENT } from "fragments";
import clsx from "clsx";
import { FeaturedImage } from "components/FeaturedImage";
import { Content } from "components/Content";
interface HeroProps extends FlexibleContentBlocksHeroLayout {
  className?: string;
}

const Hero = ({
  className,
  title,
  isH1,
  variant,
  ctas,
  video,
  image,
  content,
  icon,
}: HeroProps) => {
  let wrapperClass = clsx("py-24");

  let innerWrapperClass = clsx(
    `items-center`,
    image
      ? `container mx-auto flex flex-col md:flex-row`
      : `container mx-auto flex flex-col`,
  );

  let innerItemClass = clsx(
    `flex flex-col gap-4`,
    image ? `md:w-1/2` : `md:w-full`,
  );

  return (
    <section className={`${className ? className : ``} ${wrapperClass}`}>
      <div className={innerWrapperClass}>
        <div className={innerItemClass}>
          {title ? <Title title={title} isH1={isH1} /> : null}
          <Content className={`font-sans text-lg`} content={content} />
        </div>
        {image ? (
          <div className={innerItemClass}>
            <FeaturedImage image={image} />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;

const Title = ({ title, isH1 }: HeroProps) => {
  return isH1 ? (
    <h1 className={`font-sans text-5xl font-bold`}>{title}</h1>
  ) : (
    <h2>{title}</h2>
  );
};

Hero.fragments = {
  entry: gql`
    fragment HeroFragment on FlexibleContentBlocksHeroLayout {
      __typename
      title
      isH1
      variant
      content
      ctas {
        link {
          title
          url
          target
        }
        type
      }
      image {
        node {
          ...MediaItemFragment
        }
      }
      video {
        node {
          ...MediaItemFragment
          mediaItemUrl
          mimeType
        }
      }
    }
    ${MEDIA_ITEM_FRAGMENT}
  `,
};
