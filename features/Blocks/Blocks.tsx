import dynamic from "next/dynamic";
// Hero: (Non dynamic import) Above the fold content
import { Hero } from "components";
// Dynamic Imports: Below the fold content
import { FORM_BLOCK_FRAGMENT } from "components/Form/Form";
const Form = dynamic(() => import("components/Form/Form"), {
  ssr: true,
});

import {
  Page_Flexiblecontent_Blocks,
  Page_Flexiblecontent_Blocks_Hero,
  Page_Flexiblecontent_Blocks_Form,
} from "graphql";
import { gql } from "@apollo/client";

interface BlocksProps {
  blocks: Page_Flexiblecontent_Blocks[];
}

interface BlockProps {
  block: Page_Flexiblecontent_Blocks;
}

const prefix = "Page_Flexiblecontent_Blocks_";

const Block = ({ block }: BlockProps) => {
  const { __typename } = block;

  let name = __typename && __typename.replace(prefix, "");

  switch (name) {
    // Hero
    case "Hero": {
      return <Hero {...(block as Page_Flexiblecontent_Blocks_Hero)} />;
    }
    // Form
    case "Form": {
      return <Form {...(block as Page_Flexiblecontent_Blocks_Form)} />;
    }

    default: {
      return null;
    }
  }
};

const Blocks = ({ blocks = [] }: BlocksProps): JSX.Element => {
  return (
    <>
      {blocks &&
        blocks.map((block, index) => (
          <Block block={block} key={`block-${index}`} />
        ))}
    </>
  );
};

export default Blocks;

Blocks.fragments = {
  entry: gql`
    fragment BlocksFragment on Page_Flexiblecontent {
      blocks {
        ... on Page_Flexiblecontent_Blocks_Hero {
          ...HeroFragment
        }
        ... on Page_Flexiblecontent_Blocks_Form {
          ...FormBlockFragment
        }
      }
    }
    ${Hero.fragments.entry}
    ${FORM_BLOCK_FRAGMENT}
  `,
};
