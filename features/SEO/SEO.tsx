import { PostTypeSeo } from "graphql";
import { NextSeo } from "next-seo";

export interface SEOProps {
  seo: PostTypeSeo;
}

const SEO = ({ seo }: SEOProps) => {
  const { title, metaDesc } = seo;
  return (
    <NextSeo
      title={title ?? `Headless Noisy Trumpet Starter`}
      description={metaDesc ?? `Headless Noisy Trumpet Starter`}
    />
  );
};

export default SEO;
