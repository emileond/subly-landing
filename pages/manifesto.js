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
            The Manifesto
          </Heading>
          <VStack align="center" py={8} px={8} maxW="700px">
            <Text fontSize="xl">
              In business, we say the customer comes first. The reality today is
              that stakeholders come first. Most large companies answer to
              investors: The bank. Their board. The customer has become the
              user, a number on the wall.
            </Text>
            <br />
            <Text fontSize="xl">
              Subly started with the mission of developing free and accesible
              tools to empower people to control their financial life.
            </Text>
            <br />
            <Text fontSize="xl">
              We support independent companies to make business personal.
              Because we want to see our community thrive. Because we believe in
              an idea.
            </Text>
            <br />
            <Text fontSize="xl">
              By supporting an independent project like Subly, you support a
              product that answers to its users. Your feedback will likely turn
              into a feature. The numbers are important to a self-funded
              business, but so are the names.
            </Text>
            <br />
            <Text fontSize="xl">
              And as an independent and bootstrapped business, we wear our story
              with pride.
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
