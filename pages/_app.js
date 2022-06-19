import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import splitbee from '@splitbee/web'
import './styles.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // here you can add your aos options
    AOS.init({
      offset: 100,
    })
  }, [])
  splitbee.init({
    token: 'SLLB2C20R4FI',
  })
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
