import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { BiCheck, BiCustomize, BiPieChartAlt2, BiPlug } from 'react-icons/bi'

// Replace test data with your own
const features = [
  {
    id: 1,
    title: 'Project budgets',
    text: 'Set financial limits, ensure cost control and avoid overspending.',
    icon: BiPieChartAlt2,
  },
  {
    id: 2,
    title: 'Seamless Integrations',
    text: 'Subly fits in your business by integrating with your daily tools.',
    icon: BiPlug,
  },
  {
    id: 3,
    title: 'Notes, tags, & categories',
    text: 'Tailor your dashboard; manage spending your way.',
    icon: BiCustomize,
  },
]

export default function FeaturesList() {
  return (
    <Container maxW="container.lg" py={20}>
      <VStack w="100%" textAlign="center" spacing={8}>
        <VStack spacing={4}>
          <Heading textAlign="center" fontSize="3xl">
            Essential tools for smart spending
          </Heading>
          {/* <Text color="gray.600">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </Text> */}
        </VStack>
        <HStack w="100%" spacing={8} flexDir={['column', 'column', 'row']}>
          {features.map((feature) => (
            <VStack key={feature.id} py={10} w="100%">
              <Icon color="gray.400" as={feature.icon} fontSize="2.4rem" />
              <VStack textAlign="center" w="100%" spacing={4}>
                <Heading size="md">{feature.title}</Heading>
                <Text>{feature.text}</Text>
              </VStack>
            </VStack>
          ))}
        </HStack>
      </VStack>
    </Container>
  )
}
