import styles from "./Content.module.css";

interface ContentProps {
  content?: string | null;
  className?: string;
}

const Content = ({ content, className }: ContentProps) => {
  return content ? (
    <div
      className={`${className} ${styles[`content-wrapper`]}`}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  ) : null;
};

export default Content;
