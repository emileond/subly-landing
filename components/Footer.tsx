import {
  Box,
  Button,
  Container,
  Divider,
  Image,
  Link,
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
    <Box as="footer" color={useColorModeValue('gray.700', 'gray.200')}>
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
            <Link href="https://web.subly.app/signup">Get Started</Link>
            <Link href={'/#features'}>Features</Link>
            <Link href={'/#faq'}>FAQ</Link>
          </Stack>
          <Stack>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Social
            </Text>
            <Link href={'#'}>Twitter</Link>
          </Stack>
          <Stack>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Legal
            </Text>
            <Link href={'#'}>Terms & Privacy Policy</Link>
          </Stack>
          <Stack>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Support Subly
            </Text>
            <Box
              as="a"
              target="_blank"
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
      <Box py={6} bg="gray.50">
        <Text pt={2} fontSize={'sm'} textAlign={'center'}>
          Subly - Created by{' '}
          <Button color="#5842d8" colorScheme="blue" variant="link">
            {' '}
            Emilio{' '}
          </Button>
          . © {currentYear} 2021
        </Text>
      </Box>
    </Box>
  )
}
