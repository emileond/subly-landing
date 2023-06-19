import { currencies } from '../data/currencies'
import { useForm } from 'react-hook-form'
import {
  Box,
  Divider,
  Input,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import { rgbDataURL } from '../utils/rgbDataURL'

const CurrenciesList = ({ selectedCurrency }) => {
  // Color mode values
  const bg = useColorModeValue('white', 'gray.800')
  const secondaryHeading = useColorModeValue('blackAlpha.800', 'whiteAlpha.800')
  const inputBorder = useColorModeValue('gray.200', 'gray.600')
  const inputVariant = useColorModeValue('filled', 'outline')
  const secondaryText = useColorModeValue('blackAlpha.700', 'whiteAlpha.700')
  const tertiaryText = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')
  const listHover = useColorModeValue('blackAlpha.50', 'gray.700')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const searchQuery = watch('search')
  const filteredData = searchQuery?.length
    ? currencies.filter((currency) =>
        (currency.name + currency.cc)
          .toLocaleLowerCase()
          .includes(searchQuery?.toLocaleLowerCase())
      )
    : currencies

  return (
    <>
      <Box position="sticky" top={0} zIndex={1} bg="inherit" py={4}>
        <FormControl isInvalid={errors.search}>
          <FormLabel htmlFor="search" display="none">
            Search
          </FormLabel>
          <Input
            autoFocus
            autoComplete="off"
            id="search"
            {...register('search', { min: 2, max: 40, pattern: /^ *$/ })}
            variant="filled"
            placeholder="Search currency"
            borderColor={inputBorder}
          />
          <FormErrorMessage>
            {errors.search && errors.search.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Divider />
      <List>
        {filteredData.length ? (
          <>
            <Text fontSize="sm" color={tertiaryText} py={1} casing="uppercase">
              Currencies
            </Text>
            {filteredData.map((currency) => (
              <ListItem
                key={currency.cc}
                px={4}
                borderRadius={8}
                onClick={() => selectedCurrency(currency)}
                _hover={{ background: listHover, cursor: 'pointer' }}
              >
                <Flex justifyContent="space-between" align="center">
                  <HStack spacing={4} py={3}>
                    <Box
                      w="28px"
                      h="28px"
                      minW="28px"
                      minH="28px"
                      pos="relative"
                    >
                      <Image
                        src={`/flags/${currency.cc.toLocaleLowerCase()}.svg`}
                        placeholder="blur"
                        blurDataURL={rgbDataURL(2, 129, 210)}
                        layout="fill"
                        alt="Currency flag"
                      />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text color={secondaryHeading}>
                        {currency.name} ({currency.cc})
                      </Text>
                    </VStack>
                  </HStack>
                </Flex>
                <Divider />
              </ListItem>
            ))}
          </>
        ) : (
          <>
            <Box py={4} textAlign="center">
              <Heading>No results found</Heading>
            </Box>
          </>
        )}
      </List>
    </>
  )
}

export default CurrenciesList
