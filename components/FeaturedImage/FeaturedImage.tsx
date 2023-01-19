import Image from "next/image";
import { forwardRef } from "react";
import SVG, { Props as SVGProps } from "react-inlinesvg";
import styles from "./FeaturedImage.module.css";

interface Props {
  title?: string;
  image: any;
  width?: string | number;
  height?: string | number;
  className?: string;
  priority?: boolean;
  imgClassName?: string;
  type?: string;
  style?: any;
}

const SVGAsset = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG innerRef={ref} title={props?.title ?? ``} {...props} />
));

const FeaturedImage = ({
  className,
  image,
  width,
  height,
  priority,
  title,
  imgClassName,
  type,
  style,
  ...props
}: Props) => {
  const { sourceUrl, mediaDetails, altText, caption, description } = image;
  let src;
  let sizes;
  if (image?.sourceUrl instanceof Function) {
    src = sourceUrl();
  } else {
    src = sourceUrl;
  }
  if (image?.sizes instanceof Function) {
    sizes = image?.sizes() || `100vw`;
  } else {
    sizes = image?.sizes;
  }

  const sWidth = width || mediaDetails?.width;
  const sHeight = height || mediaDetails?.height;

  if (image?.mimeType === "image/svg+xml") {
    SVGAsset.displayName = altText;
    return (
      <SVGAsset {...props} src={src} title={altText} className={className} />
    );
  }

  const isSlider = type === "slider";

  return src ? (
    <figure
      className={`${styles[`featured-image`]} ${className}`}
      style={style}
    >
      <Image
        src={src}
        width={sWidth}
        height={sHeight}
        alt={altText}
        sizes={sizes}
        className={imgClassName}
        // placeholder={src}
        // blurDataURL={src ?`data:image/svg+xml;base64,${toBase64(
        //   shimmer(sWidth, sHeight)
        // )}` : ``}
        // placeholder="blur"
        // blurDataURL={dataUrl}
        priority={priority ?? false}
        {...props}
      />
    </figure>
  ) : null;
};

export default FeaturedImage;
