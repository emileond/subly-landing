import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import splitbee from '@splitbee/web'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import AnnouncementBanner from '../components/AnnouncementBanner'

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
      {process.env.NODE_ENV === 'production' && (
        <Script
          src="https://app.abralytics.com/assets/tracker/index.js"
          data-domain="subly.app"
        />
      )}
      <AnnouncementBanner />
      <Component {...pageProps} />
      <CrispWithNoSSR />
    </ChakraProvider>
  )
}

export default MyApp
