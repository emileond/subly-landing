import { useEffect } from 'react'
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
        <Script
          id="umami-script"
          defer
          src="https://umami.trysubly.com/script.js"
          data-website-id="f176b6d8-eb97-4ba3-b10e-e5176f947eb9"
        />
      )}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
