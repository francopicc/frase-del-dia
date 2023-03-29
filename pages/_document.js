import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=PT+Serif&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Script src="https://kit.fontawesome.com/e80c9c3cc8.js"></Script>
        <Script src="javascript/home.js"></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
