import {
  Box,
  Container,
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
  return (
    <Box
      as="footer"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={[2, 3, 5, 5]} spacing={8} alignSelf="center">
          <Link href={'#'}>Get Started</Link>
          <Link href={'#'}>Features</Link>
          <Stack direction={'row'} align={'center'} spacing={2}>
            <Link href={'#'}>Donate</Link>
            <Tag
              size={'sm'}
              bg={useColorModeValue('green.300', 'green.800')}
              ml={2}
              color={'white'}
            >
              New
            </Tag>
          </Stack>
          <Link href={'#'}>FAQ</Link>
          <Link href={'#'}>Terms & Privacy Policy</Link>
        </SimpleGrid>
      </Container>
      <Box pb={10}>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          Subly - Created by Emilio. © 2021 All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}
