import {
  Box,
  Button,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Flex,
  Tag,
  useColorModeValue,
  HStack,
  VStack,
  Heading,
  IconButton,
} from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'

export default function LargeWithLogoCentered() {
  const currentYear = new Date().getFullYear()
  return (
    <Box
      as="footer"
      color={useColorModeValue('gray.700', 'gray.200')}
      bg="#F1F5F9"
    >
      <Container as={Stack} maxW={'6xl'} py={16}>
        <SimpleGrid
          columns={[2, 2, 4, 4]}
          spacing={[16, 24, 24]}
          alignSelf="center"
        >
          <VStack align="left">
            <HStack>
              <Image src="./logo.svg" alt="Logo" width="20px" height="30px" />
              <Heading size="md" ml={2}>
                Subly
              </Heading>
            </HStack>
            <Text>
              All your subscriptions and recurring payments in one place.
            </Text>
            <HStack>
              <IconButton
                as="a"
                aria-label="twitter"
                size="lg"
                borderRadius="full"
                icon={<FaTwitter />}
                href="https://twitter.com/sublyweb"
                target="_blank"
                rel="noopener noreferrer"
              ></IconButton>
              <IconButton
                as="a"
                aria-label="buy me a coffee"
                size="lg"
                borderRadius="full"
                icon={<SiBuymeacoffee />}
                href="https://www.buymeacoffee.com/emiliosanchez"
                target="_blank"
                rel="noopener noreferrer"
              ></IconButton>
            </HStack>
          </VStack>
          <Stack>
            <Heading size="md">About Subly</Heading>
            <Button
              as="a"
              href="/manifesto"
              variant="link"
              fontWeight="400"
              colorScheme="black"
              justifyContent="start"
            >
              Manifesto
            </Button>
            <Button
              as="a"
              href="https://web.subly.app/signup"
              variant="link"
              fontWeight="400"
              colorScheme="black"
              justifyContent="start"
            >
              Get Started
            </Button>
            <Button
              as="a"
              href={'/#features'}
              variant="link"
              fontWeight="400"
              colorScheme="black"
              justifyContent="start"
            >
              Features
            </Button>
            <Button
              as="a"
              href={'/#faq'}
              variant="link"
              fontWeight="400"
              colorScheme="black"
              justifyContent="start"
            >
              FAQ
            </Button>
          </Stack>
          <Stack>
            <Heading size="md">Legal</Heading>
            <Button
              as="a"
              href={'https://audaxly.com/privacy-policy?code=kvrat5atan8jj7'}
              variant="link"
              target="_blank"
              rel="noopener noreferrer"
              fontWeight="400"
              colorScheme="black"
              justifyContent="start"
            >
              Terms & Privacy Policy
            </Button>
          </Stack>
          <Stack>
            <Heading size="md">Support Subly</Heading>
            <Box
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.buymeacoffee.com/emiliosanchez"
            >
              <Image maxW="80%" src="./bmac-yellow.png" alt="Buy me a coffee" />
            </Box>
            {/* <Stack direction={'row'} align={'center'} spacing={2}>
              <Link href={'#'}>Donate</Link>
              <Tag
                size={'sm'}
                bg={useColorModeValue('green.300', 'green.800')}
                ml={2}
                color={'white'}
              >
                New
              </Tag>
            </Stack> */}
          </Stack>
        </SimpleGrid>
      </Container>
      <Divider />
      <Box py={4} bg="gray.200">
        <Text pt={2} fontSize={'sm'} textAlign={'center'}>
          Subly - © {currentYear}
        </Text>
      </Box>
    </Box>
  )
}
