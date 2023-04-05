import * as SELECTORS from "constants/selectors";

export interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export default function Main({ children, className, ...props }: MainProps) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={`${className}`}
      {...props}
    >
      {children}
    </main>
  );
}
