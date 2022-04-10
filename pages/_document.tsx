import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return(
    <Html>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
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