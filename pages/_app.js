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
  useEffect(() => {
    ;(function (w, r) {
      w._rwq = r
      w[r] =
        w[r] ||
        function () {
          ;(w[r].q = w[r].q || []).push(arguments)
        }
    })(window, 'rewardful')

    let s = document.createElement('script')
    s.async = true
    s.src = 'https://r.wdfl.co/rw.js'
    s.setAttribute('data-rewardful', 'c5808b')
    document.head.appendChild(s)
    rewardful('ready', function () {
      console.log('Rewardful Ready!')
    })
  }, [])

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
