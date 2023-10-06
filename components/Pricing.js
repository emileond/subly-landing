import React from 'react'
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
import PlansDisplay from './PlansDisplay'

function PriceWrapper(props) {
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
      {props.children}
    </Box>
  )
}

export default function Pricing() {
  return (
    <VStack pt="6rem" pb="4rem" bg="#F1F5F9" id="pricing">
      <PlansDisplay
        heading="Affordable plans, priceless insights"
        landing={false}
      />
      {/* <Box>
        <Button
          as="a"
          href="/pricing#comparison"
          variant="link"
          colorScheme="blue"
          rightIcon={<BiRightArrowAlt />}
        >
          Compare all features
        </Button>
      </Box> */}
    </VStack>
  )
}
