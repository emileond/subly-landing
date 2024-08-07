import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import splitbee from '@splitbee/web'
import dynamic from 'next/dynamic'
import Script from 'next/script'

const CrispWithNoSSR = dynamic(() => import('../components/CrispChat'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  splitbee.init({
    token: 'SLLB2C20R4FI',
  })

  return (
    <ChakraProvider theme={theme}>
      {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && (
        <>
          <Script
            id="umami-script"
            defer
            src="https://umami.subly.app/script.js"
            data-website-id="985b3243-3bb3-4213-9561-381cde5f2d85"
          />
          <Script
            id="partnero-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(p,t,n,e,r,o){ p['__partnerObject']=r;function f(){
            var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
            f.q=f.q||[];p[r]=p[r]||f.bind(f.q);p[r].q=p[r].q||f.q;o=t.createElement(n);
            var _=t.getElementsByTagName(n)[0];o.async=1;o.src=e+'?v'+(~~(new Date().getTime()/1e6));
            _.parentNode.insertBefore(o,_);})(window, document, 'script', 'https://app.partnero.com/js/universal.js', 'po');
            po('settings', 'assets_host', 'https://assets.partnero.com');
            po('program', 'NZCCAGAZ', 'load');`,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
