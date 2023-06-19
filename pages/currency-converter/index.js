import { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Text,
  Card,
  Icon,
  Image,
  Divider,
  NumberInput,
  NumberInputField,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Flex,
  Stack,
} from '@chakra-ui/react'
import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { BiChart, BiChevronDown, BiSortAlt2, BiTimeFive } from 'react-icons/bi'
import { amountConversion } from '../../utils/amountConversion'
import dynamic from 'next/dynamic'

export default function CurrencyConverter() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bg = useColorModeValue('white', 'gray.800')

  // dynamic import components
  const LoadingComponent = () => (
    <HStack w="100%" justify="center" py={8}>
      <CircularProgress isIndeterminate />
    </HStack>
  )

  // dynamic currenciesList
  const CurrenciesList = dynamic(
    () => import('../../components/CurrenciesList'),
    {
      ssr: false,
      loading: LoadingComponent,
    }
  )

  const [firstCurrency, setFirstCurrency] = useState({ cc: 'USD' })
  const [secondCurrency, setSecondCurrency] = useState({ cc: 'EUR' })
  const [sourceAmount, setSourceAmount] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')

  // useEffect to trigger amountConversion from 100 of first currency to second currency
  useEffect(() => {
    const convertedValue = amountConversion(
      100,
      firstCurrency?.cc,
      secondCurrency?.cc
    )
    setSourceAmount(100)
    setTargetAmount(convertedValue !== null ? convertedValue.toString() : '')

    const date = new Date(Date.now() - 3600000)
    setLastUpdated(date.toLocaleString())
  }, [])

  const handleFirstInputChange = (value) => {
    setSourceAmount(value)
    const convertedValue = amountConversion(
      value,
      firstCurrency?.cc,
      secondCurrency?.cc
    )
    setTargetAmount(convertedValue !== null ? convertedValue.toString() : '')
  }

  const handleSecondInputChange = (value) => {
    setTargetAmount(value)
    const convertedValue = amountConversion(
      value,
      secondCurrency?.cc,
      firstCurrency?.cc
    )
    setSourceAmount(convertedValue !== null ? convertedValue.toString() : '')
  }

  const [currencyUpdating, setCurrencyUpdating] = useState(0)

  const handleCurrencyChange = (currency) => {
    if (currency === 1) {
      setCurrencyUpdating(1)
      onOpen()
    } else if (currency === 2) {
      setCurrencyUpdating(2)
      onOpen()
    }
  }

  const updateCurrency = (currency) => {
    if (currencyUpdating === 1) {
      setFirstCurrency(currency)
      const convertedValue = amountConversion(
        sourceAmount,
        currency?.cc,
        secondCurrency?.cc
      )
      setTargetAmount(convertedValue !== null ? convertedValue.toString() : '')
    } else if (currencyUpdating === 2) {
      setSecondCurrency(currency)
      const convertedValue = amountConversion(
        targetAmount,
        currency?.cc,
        firstCurrency?.cc
      )
      setSourceAmount(convertedValue !== null ? convertedValue.toString() : '')
    }
    onClose()
  }

  // calculate rate
  const rate = amountConversion(
    1,
    firstCurrency?.cc,
    secondCurrency?.cc
  ).toString()

  return (
    <Box maxW="100vw">
      <Head>
        <title>Subly - Currency Converter</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Container maxW="100%" minH="calc(100vh - 64px)" px={0} bg="gray.50">
        <VStack
          align="center"
          py={[16, 24]}
          mb={['6vh', '3vh', '0']}
          bg="linear-gradient(0deg, #02b2bc 0%, #06bebe 100%)"
        >
          <VStack align="center" spacing={4} px={4}>
            <Heading size="2xl" color="blackAlpha.900">
              Currency Converter
            </Heading>
            <Text fontSize="2xl" color="blackAlpha.800">
              Convert any currency amount to real exchange rates.
            </Text>
          </VStack>
          <Box h={['4vh', '6vh']} px={4}>
            <Card
              p={[4, 4, 8]}
              boxShadow="2xl"
              pos="relative"
              zIndex={1}
              bottom={['-2vh', '-3vh', '-6vh']}
              maxW={['100%', '100%', 'container.lg']}
            >
              <VStack align="start" spacing={10}>
                <Stack
                  w="100%"
                  justify="space-between"
                  align="center"
                  direction={{ base: 'column', md: 'row' }}
                >
                  <HStack>
                    <NumberInput
                      value={sourceAmount}
                      onChange={(value) => handleFirstInputChange(value)}
                      min={0.01}
                      max={100000000}
                      size="lg"
                    >
                      <NumberInputField />
                    </NumberInput>
                    <Button
                      size="lg"
                      onClick={() => handleCurrencyChange(1)}
                      rightIcon={<BiChevronDown size={21} />}
                    >
                      <Avatar
                        src={`/flags/${firstCurrency?.cc.toLowerCase()}.svg`}
                        size="xs"
                        mr={2}
                      />
                      <Text mr={2}>{firstCurrency?.cc}</Text>
                    </Button>
                  </HStack>
                  <Box p={4}>
                    <Icon
                      as={BiSortAlt2}
                      transform="rotate(90deg)"
                      fontSize="3xl"
                      color="gray.600"
                    />
                  </Box>
                  <HStack>
                    <NumberInput
                      value={targetAmount}
                      onChange={(value) => handleSecondInputChange(value)}
                      min={0.01}
                      max={100000000}
                      size="lg"
                    >
                      <NumberInputField />
                    </NumberInput>
                    <Button
                      size="lg"
                      onClick={() => handleCurrencyChange(2)}
                      rightIcon={<BiChevronDown size={21} />}
                    >
                      <Avatar
                        src={`/flags/${secondCurrency?.cc?.toLowerCase()}.svg`}
                        size="xs"
                        mr={2}
                      />
                      <Text mr={2}>{secondCurrency?.cc}</Text>
                    </Button>
                  </HStack>
                </Stack>
                <Stack
                  w="100%"
                  justify="space-between"
                  direction={{ base: 'column', md: 'row' }}
                  spacing={4}
                >
                  <HStack align="center">
                    <BiChart size={24} color="#06bebe" />
                    <Heading size="md" color="gray.700">
                      {`1 ${firstCurrency?.cc} `}
                    </Heading>
                    <Heading size="md" color="gray.500">
                      =
                    </Heading>
                    <Heading size="md" color="gray.700">
                      {`${rate} ${secondCurrency?.cc}`}
                    </Heading>
                  </HStack>
                  <HStack>
                    <BiTimeFive size={20} />
                    <Heading size="xs" color="gray.600">
                      Last Updated
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      {lastUpdated}
                    </Text>
                  </HStack>
                </Stack>
              </VStack>
            </Card>
          </Box>
        </VStack>
        <VStack align="center" spacing={4} pt="12vh" pb="4vh" px={4}>
          <Heading size="lg" mt={12} mb={4}>
            Want to manage multi-currency expenses?
          </Heading>
          <Text fontSize="lg">
            {`Subly brings all your business expenses in a single place so you
            never lose track of what you're paying for.`}
          </Text>
          <Button
            size="lg"
            colorScheme="gray"
            bg="#06BEBE"
            variant="solid"
            as="a"
            href="https://web.subly.app"
            _hover={{
              bg: '#06AFBE',
            }}
          >
            Get Started
          </Button>
        </VStack>
        <Divider py={8} />
        <Container maxW="container.lg" align="start" spacing={4} py={12}>
          <Heading size="md">Convert between +100 currencies</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/usd.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>United States Dollar (USD)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/eur.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>Euro (EUR)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/gbp.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>British Pound (GBP)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/inr.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>Indian Rupee (INR)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/aud.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>Australian Dollar (AUD)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/cad.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>Canadian Dollar (CAD)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/sgd.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>Singapore Dollar (SGD)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/chf.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>

              <VStack align="start" spacing={0}>
                <Text>Swiss Franc (CHF)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/myr.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>Malaysian Ringgit (MYR)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/jpy.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>Japanese Yen (JPY)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/cny.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>Chinese Yuan (CNY)</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} py={3}>
              <Box w="28px" h="28px" minW="28px" minH="28px" pos="relative">
                <Image
                  src={`/flags/aed.svg`}
                  placeholder="blur"
                  layout="fill"
                  alt="Currency flag"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text>UAE Dirham (AED)</Text>
              </VStack>
            </HStack>
          </SimpleGrid>
        </Container>
      </Container>
      <Footer />
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        h={'100vh'}
      >
        <ModalOverlay />
        <ModalContent borderRadius={12}>
          <ModalHeader textAlign="center" borderRadius={12} pt={6}>
            Change Currency
            <Box />
          </ModalHeader>
          <Divider />
          <ModalBody bg={bg} pt={0}>
            <CurrenciesList selectedCurrency={updateCurrency} />
          </ModalBody>
          <ModalFooter bg={bg} borderRadius={12} />
        </ModalContent>
      </Modal>
    </Box>
  )
}
