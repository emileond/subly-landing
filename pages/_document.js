import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Script
            id="reditus"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w, d, s, p, t) { w.gr = w.gr || function() { w.gr.q = w.gr.q || []; w.gr.q.push(arguments); }; p = d.getElementsByTagName(s)[0]; t = d.createElement(s); t.async = true; t.src = "https://app.getreditus.com/gr.js?_ce=60"; p.parentNode.insertBefore(t, p); })(window, document, "script"); gr("track", "pageview");
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
