import * as SELECTORS from "constants/selectors";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export default function Main({ children, className, ...props }: MainProps) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={`${className} ${inter.className}`}
      {...props}
    >
      {children}
    </main>
  );
}
