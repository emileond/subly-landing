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
  return (
    <div>
      <Head>
        <title>Subly - Subscriptions Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Box as="main" minH="80vh">
        <Heading fontWeight={600} fontSize="3xl" textAlign="center" py={12}>
          Donate to Subly
        </Heading>
        <Flex
          direction={['column', 'column', 'column', 'row']}
          w={['100%', '100%', '100%', '70%']}
          mx="auto"
          justifyContent="space-evenly"
        >
          <Box p={20} bg="gray.400" w="400px">
            AAA
          </Box>
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
              Every bit of support helps us improve Subly and tackle more
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