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
    <>
      <Box
        pt={32}
        pb={32}
        bg="linear-gradient(
      45deg,#fffbf2,#edfffd)"
      >
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={'4xl'}>Get started today</Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            Signup now and take back control over your subscriptions.
          </Text>
          <Box>
            <Button
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
    </>
  )
}
