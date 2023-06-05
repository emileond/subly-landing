import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import AOS from 'aos'
import 'aos/dist/aos.css'
import splitbee from '@splitbee/web'
import './styles.css'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // here you can add your aos options
    AOS.init({
      offset: 100,
    })
  }, [])

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
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  )
}

export default MyApp
