import { ChakraProvider } from '@chakra-ui/react'
// import splitbee from '@splitbee/web'

function MyApp({ Component, pageProps }) {
  // splitbee.init()
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
