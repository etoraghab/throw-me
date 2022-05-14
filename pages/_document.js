import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="throw-me" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="throw-me" />
          <meta
            name="description"
            content="a decent url shortener made with nextjs and postgresql database"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="teal" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="teal" />

          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="167x167" href="/favicon.ico" />

          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/favicon.ico" color="teal" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://throw-me.vercel.app/" />
          <meta name="twitter:title" content="throw-me" />
          <meta
            name="twitter:description"
            content="a decent url shortener made with nextjs and postgresql database"
          />
          <meta
            name="twitter:image"
            content="https://throw-me.vercel.app/favicon.ico"
          />
          <meta name="twitter:creator" content="@volcareso" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="throw-me" />
          <meta
            property="og:description"
            content="a decent url shortener made with nextjs and postgresql database"
          />
          <meta property="og:site_name" content="throw-me" />
          <meta property="og:url" content="https://throw-me.vercel.app/" />
          <meta
            property="og:image"
            content="https://throw-me.vercel.app/favicon.ico"
          />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8140175087839604"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
