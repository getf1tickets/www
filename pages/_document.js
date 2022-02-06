import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import palette from '../theme/palette';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <link rel="apple-touch-icon" sizes="180x180" href="https://s3.getf1tickets.com/public/logo.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="https://s3.getf1tickets.com/public/logo.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="https://s3.getf1tickets.com/public/logo.ico" />

          <meta name="theme-color" content={palette.light.primary.main} />
          {/* <link rel="manifest" href="/manifest.json" /> */}

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
