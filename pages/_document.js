import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://app.getterms.io/cookie-consent/embed/fe9ce7ea-2b79-4c36-9276-c1514bc42c61"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
