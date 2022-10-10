import { ReactNode } from 'react'
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Badge,
} from '@chakra-ui/react'
import { BiCheck, BiRightArrowAlt, BiX } from 'react-icons/bi'

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      textAlign="left"
      py={0}
      overflow="hidden"
      maxW="360px"
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'lg'}
    >
      {children}
    </Box>
  )
}

export default function Pricing() {
  return (
    <VStack pt="6rem" pb="4rem" bg="#F1F5F9" id="pricing">
      <VStack spacing={3} textAlign="center">
        <Heading as="h1" fontSize="4xl" mb={1}>
          Simplified Pricing
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Pay once a year, cancel anytime
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <VStack pt={8} pb={4} px={12}>
            <VStack align="start">
              <Heading>Basic</Heading>
              <Text>Recommended for personal use</Text>
            </VStack>
            <HStack align="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                0
              </Text>
              <Text fontSize="2xl" color="gray.600">
                forever
              </Text>
            </HStack>
          </VStack>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
          >
            <List spacing={3} textAlign="start" px={12} fontSize="lg">
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Track 10 subscriptions
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Payment alerts
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Email Support 3-5 days
              </ListItem>
              <ListItem>
                <ListIcon as={BiX} color="gray.500" />
                Ad-free experience
              </ListItem>
              <ListItem>
                <ListIcon as={BiX} color="gray.500" />
                Projects
              </ListItem>
              <ListItem>
                <ListIcon as={BiX} color="gray.500" />
                Integrations
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button
                as="a"
                size="lg"
                rounded="full"
                w="full"
                colorScheme="grey"
                variant="outline"
                href="https://web.subly.app/signup"
              >
                Get started for free
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
        <PriceWrapper>
          <VStack
            pt={8}
            pb={4}
            px={12}
            bgGradient="linear(to-r, #8E2DE2, #4A00E0)"
            color="white"
          >
            <VStack align="start">
              <HStack align="center">
                <Heading>Pro</Heading>
              </HStack>
              <Text>Best for individuals with multiple projects and SMBs</Text>
            </VStack>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                29
              </Text>
              <Text fontSize="2xl">/ year</Text>
            </HStack>
          </VStack>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
          >
            <List spacing={3} textAlign="start" px={12} fontSize="lg">
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Track 100 subscriptions
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Payment alerts
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Priority Support
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Ad-free experience
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Projects
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                Integrations
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                API Access <Badge colorScheme="green">Soon</Badge>
              </ListItem>
              <ListItem>
                <ListIcon as={BiCheck} color="green.500" />
                2FA / MFA <Badge colorScheme="green">Soon</Badge>
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button
                size="lg"
                as="a"
                rounded="full"
                w="full"
                colorScheme="purple"
                bg="#4A00E0"
                href="https://web.subly.app/signup"
              >
                Get started with Pro
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
      <Box>
        <Button
          as="a"
          href="/pricing#comparison"
          variant="link"
          colorScheme="blue"
          rightIcon={<BiRightArrowAlt />}
        >
          Compare all features
        </Button>
      </Box>
    </VStack>
  )
}
