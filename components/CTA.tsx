import {
  Box,
  Button,
  Container,
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
    <Box px={4} pt={14} pb={32}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Get started today</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Signup now and take back control over your subscriptions.
        </Text>
        <Box>
          <Button
            size="lg"
            rounded="full"
            px={6}
            colorScheme="blue"
            bg="blue.400"
            _hover={{ bg: 'blue.500' }}
          >
            Get started for free
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
