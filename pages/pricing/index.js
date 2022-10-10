import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import {
  Box,
  Button,
  Heading,
  Icon,
  VStack,
  Text,
  HStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import Pricing from '../../components/Pricing'
import { BiCheck } from 'react-icons/bi'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Subly - Pricing</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Pricing />
      <Box id="comparison" maxW="3xl" m="0 auto" py={20} px={2}>
        <HStack
          w="100%"
          justify="space-between"
          py={4}
          pos="sticky"
          top={0}
          bg={useColorModeValue('white', 'gray.800')}
          zIndex={1}
        >
          <VStack>
            <Heading w={['100%', '100%', '400px']}>
              Feature <br /> comparison
            </Heading>
          </VStack>
          <HStack spacing={4}>
            <VStack>
              <Heading size="lg">Basic</Heading>
              <Text>Free</Text>
              <Button
                as="a"
                rounded="full"
                w="full"
                href="https://web.subly.app/signup"
              >
                Choose
              </Button>
            </VStack>
            <VStack>
              <Heading size="lg">Pro</Heading>
              <Text>$29 / year</Text>
              <Button
                as="a"
                rounded="full"
                w="full"
                colorScheme="purple"
                bg="#4A00E0"
                href="https://web.subly.app/signup"
              >
                Choose
              </Button>
            </VStack>
          </HStack>
        </HStack>
        <Divider />
        <VStack align="start" py={6}>
          <Heading size="md">Core features</Heading>
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Unlimited subscriptions</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>One-time purchases (LTDs)</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Monthly email reports</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Android & iOS Apps</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Data export</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Projects</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>
              Multi-factor authentication
            </Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Bank account linking</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
        </VStack>
        <VStack align="start" py={6}>
          <Heading size="md">Collaboration</Heading>
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Invite collaborators</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Activity feed</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
        </VStack>
        <VStack align="start" py={6}>
          <Heading size="md">Integrations</Heading>
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Dropbox & Google Drive</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Telegram</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Slack</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Quickbooks</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Xero</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Zapier, Make, Pabbly</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>API Access</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
        </VStack>
        <VStack align="start" py={6}>
          <Heading size="md">Support</Heading>
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Email support</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text>5-7 days</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text>1-2 days</Text>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="100%">
            <Text w={['100%', '100%', '400px']}>Chat support</Text>
            <HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Text color="gray.500">-</Text>
              </HStack>
              <HStack minW="98px" justify="center" spacing={4}>
                <Icon as={BiCheck} w={6} h={6} color="green.500"></Icon>
              </HStack>
            </HStack>
          </HStack>
          <Divider />
        </VStack>
      </Box>
      <Footer />
    </div>
  )
}
