import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react'

export default function CTA({ headline, text, cta }) {
  return (
    <Box
      w="100%"
      py={14}
      bg="linear-gradient(
      45deg,#8E2DE2,#4A00E0)"
      borderRadius={32}
      shadow="xl"
      data-aos="fade-up"
    >
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading color="white" fontSize={'4xl'}>
          {headline || 'Get started today'}
        </Heading>
        <Text color="whiteAlpha.900" fontSize={'xl'}>
          {text || 'Signup now and take back control over your subscriptions.'}
        </Text>
        <Box>
          <Button
            as="a"
            href="https://web.subly.app/signup"
            size="lg"
            rounded="full"
            px={6}
            bg={'white'}
            color="blackAlpha.800"
          >
            {cta || 'Get started for free'}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
