import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconProps,
  Link,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react'

export default function Home() {
  const iframePath = 'https://www.buymeacoffee.com/widget/page/emiliosanchez'
  return (
    <div>
      <Head>
        <title>Subly - Subscriptions Tracker</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Box as="main" minH="80vh" py={24}>
        <Heading
          fontWeight={600}
          fontSize="3xl"
          textAlign="center"
          pt="2rem"
          pb={12}
        >
          Donate to Subly
        </Heading>
        <Flex
          direction={['column', 'column', 'column', 'row']}
          w={['100%', '100%', '100%', '70%']}
          mx="auto"
          justifyContent="center"
          alignItems={['center', 'center', 'center', 'start']}
        >
          <Box
            as="iframe"
            src={iframePath}
            p={0}
            bg="gray.400"
            w="400px"
            h="520px"
          ></Box>
          <VStack align="start" py={8} px={8} maxW="700px">
            <Text>
              Subly was developed with the mission of developing free and
              accesible tools to empower people to control their financial life.
            </Text>
            <br />
            <Text>
              Your donation helps pay for the development, servers, and
              bandwidth of the app.
            </Text>
            <br />
            <Text>
              Every bit of support helps to improve Subly and tackle more
              ambitious problems.
            </Text>
            <br />
          </VStack>
        </Flex>
      </Box>
      <Footer />
    </div>
  )
}
