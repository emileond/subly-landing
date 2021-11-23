import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Divider,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'

export default function LargeWithLogoCentered() {
  const currentYear = new Date().getFullYear
  return (
    <Box
      as="footer"
      color={useColorModeValue('gray.700', 'gray.200')}
      bg="#F1F5F9"
    >
      <Container as={Stack} maxW={'6xl'} py={24}>
        <SimpleGrid
          columns={[2, 2, 4, 4]}
          spacing={[16, 24, 32]}
          alignSelf="center"
        >
          <Stack>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Product
            </Text>
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
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Social
            </Text>
            <Button
              as="a"
              href="https://twitter.com/sublyweb"
              variant="link"
              target="_blank"
              rel="noopener noreferrer"
              fontWeight="400"
              colorScheme="black"
              justifyContent="start"
            >
              <a>Twitter</a>
            </Button>
          </Stack>
          <Stack>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Legal
            </Text>
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
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Support Subly
            </Text>
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
          Subly - Created by{' '}
          <Button
            as="a"
            href="https://twitter.com/emileond"
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="blue"
            variant="link"
          >
            Emilio
          </Button>
          . © {currentYear} 2021
        </Text>
      </Box>
    </Box>
  )
}
