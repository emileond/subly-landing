import {
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconProps,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import useScript from '../hooks/useScript'

export default function Hero() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading fontWeight={600} fontSize="5xl">
          All of your subscriptions in one place
        </Heading>
        <Text fontSize="xl" color={'gray.700'} maxW={'3xl'}>
          Subly helps you take control over your subscriptions.
        </Text>
        <Stack spacing={6} direction={'row'} align="center">
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'blue'}
            bg={'blue.400'}
            _hover={{ bg: 'blue.500' }}
          >
            Get started for free
          </Button>
          <Button as="a" href="#features" rounded={'full'} px={6}>
            Learn more
          </Button>
        </Stack>
        {/* <Flex w={'full'}> */}
        <Image
          src="./main.png"
          alt="App preview"
          boxShadow="0px 0px 15px rgba(0, 0, 0, 0.1)"
        />
        {/* </Flex> */}
      </Stack>
    </Container>
  )
}
