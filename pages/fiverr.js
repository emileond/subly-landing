import Head from 'next/head'
// import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

import { Box, Flex, Heading, Image, VStack, Text } from '@chakra-ui/react'

export default function Home() {
  const iframePath = 'https://www.buymeacoffee.com/widget/page/emiliosanchez'
  return (
    <div>
      <Head>
        <title>Subly - Manifesto</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Box as="main" minH="80vh" py={24}>
        <Flex
          direction="column"
          w={['100%', '100%', '100%', '100%']}
          mx="auto"
          justifyContent="center"
          alignItems="center"
        >
          <Heading fontSize="4xl" textAlign="center" pt="2rem" pb={12}>
            Proof of Ownership
          </Heading>
          <VStack align="center" py={8} px={8} maxW="700px">
            <Text fontSize="xl">
              This is just a simple page to provide proof of ownership on Fiverr
              for @amiraslang. Will be deleted soon.
            </Text>
            <br />
            <Image src="./logo.svg" alt="Logo" width="30px" height="40px" />
          </VStack>
        </Flex>
      </Box>
      <Footer />
    </div>
  )
}
