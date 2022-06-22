import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'

export default function CTA() {
  return (
    <Container maxW={'6xl'} pb={8}>
      <Box
        py="4rem"
        bg="linear-gradient(
      45deg,#8E2DE2,#4A00E0)"
        borderRadius={32}
        shadow="xl"
        data-aos="fade-up"
      >
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading color="white" fontSize={'4xl'}>
            Get started today
          </Heading>
          <Text color="whiteAlpha.900" fontSize={'xl'}>
            Signup now and take back control over your subscriptions.
          </Text>
          <Box>
            <Button
              as="a"
              href="https://web.subly.app/signup"
              size="lg"
              rounded="full"
              px={6}
              colorScheme="blue"
              bg={'#6F55FF'}
              _hover={{ bg: '#5842d8' }}
            >
              Get started for free
            </Button>
          </Box>
        </Stack>
      </Box>
      <Divider />
    </Container>
  )
}
