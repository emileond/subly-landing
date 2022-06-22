import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useEffect } from 'react'

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
  const iframePath = 'https://subly.olvy.co'

  return (
    <div>
      <Head>
        <title>Subly - Releases</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Box
        as="iframe"
        src={iframePath}
        p={0}
        bg="gray.400"
        w="100%"
        h="100vh"
      ></Box>
      <Footer />
    </div>
  )
}
