import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=PT+Serif&display=swap" rel="stylesheet"/>
        <link rel="manifest" href="manifest.json" />
        <meta name="theme-color" content="#f9f5f5"/>
        <link rel="apple-touch-icon" href="icon-192x192.png" />
        <meta property="og:title" content="La frase del día" />
        <meta property="og:type" content="web.phrase" />
        <meta property="og:url" content="https://www.frase-del-dia.vercel.app/" />
        <meta property="og:image" content="template-background.jpg" />
        <meta name="twitter:title" content="La frase del día"/>
        <meta name="twitter:description" content="Persevera y alcanza tu objetivo con frases dedicadas sobre el día a día."/>
        <meta name="twitter:image" content="template-background.jpg"/>
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
