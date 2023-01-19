import React from "react";
import { m, LazyMotion, Transition, SVGMotionProps } from "framer-motion";
const loadFeatures = () =>
  import("utilities/framerFeatures.js").then((res) => res.default);

interface Props extends SVGMotionProps<{}> {
  isOpen?: boolean;
  color?: string;
  strokeWidth?: string | number;
  transition?: Transition;
  lineProps?: any;
  width?: string | number;
  height?: string | number;
  className?: string;
  onClick?: () => void;
}

const MenuButton = ({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 1,
  color = "#000",
  transition,
  lineProps = null,
  className,
  onClick,
  ...props
}: Props) => {
  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * (width as number)) / (height as number);

  return (
    <div className={`${className}`}>
      <LazyMotion features={loadFeatures}>
        <m.svg
          viewBox={`0 0 ${unitWidth} ${unitHeight}`}
          overflow="visible"
          preserveAspectRatio="none"
          width={width}
          height={height}
          onClick={onClick}
          {...props}
        >
          <m.line
            x1="0"
            x2={unitWidth}
            y1="0"
            y2="0"
            variants={top}
            {...lineProps}
          />
          <m.line
            x1="0"
            x2={unitWidth}
            y1="2"
            y2="2"
            variants={center}
            {...lineProps}
          />
          <m.line
            x1="0"
            x2={unitWidth}
            y1="4"
            y2="4"
            variants={bottom}
            {...lineProps}
          />
        </m.svg>
      </LazyMotion>
    </div>
  );
};

export { MenuButton };
