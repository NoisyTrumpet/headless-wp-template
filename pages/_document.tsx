import { GTM_ID } from "lib/gtm";
import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

const resolveUrl = (url: { hostname: string; href: string }) => {
  if (
    url.hostname === "www.google-analytics.com" ||
    url.hostname === "connect.facebook.net" ||
    url.hostname === "analytics.tiktok.com" ||
    url.hostname === "www.googletagmanager.com" ||
    url.hostname === "www.googleadservices.com" ||
    url.hostname === "googleads.g.doubleclick.net" ||
    url.hostname === "static.ads-twitter.com" ||
    url.hostname === "vars.hotjar.com"
  ) {
    var proxyUrl = new URL(
      `https://proxy.noisy-trumpet.workers.dev/?${url.href}`
    );
    // proxyUrl.searchParams.append('', )
    return proxyUrl;
  }
  return url;
};

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_WORDPRESS_URL} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_WORDPRESS_URL} />
        {/* PartyTown */}
        <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
              partytown = {
                lib: "/_next/static/~partytown/",
                debug: ${process.env.NODE_ENV === "development"},
                forward: ["dataLayer", "dataLayer.push", "gtag", "ga"],
                resolveUrl: ${resolveUrl},
              };
            `,
          }}
        />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Mono&display=swap"
            rel="stylesheet"
          ></link> */}
      </Head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
