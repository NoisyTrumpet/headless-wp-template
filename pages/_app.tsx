import "../faust.config.js";
import "styles/globals.css";
import { GTM_ID, gtmVirtualPageView } from "lib/gtm";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { asPath: path } = router || {
    asPath: "",
  };
  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };

    gtmVirtualPageView(mainDataLayer);
  }, [pageProps, router.pathname]);
  return (
    <FaustProvider pageProps={pageProps}>
      <Script
        id="gtag-base"
        strategy="worker"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <Component {...pageProps} key={path} />
    </FaustProvider>
  );
}
