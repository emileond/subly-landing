import { useState } from 'react'
import {
  VStack,
  HStack,
  Button,
  Heading,
  Badge,
  ButtonGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import PlanCard from './PlanCard'

export default function PlansDisplay({ heading, landing }) {
  const [interval, setInterval] = useState('year')

  const displayPlans = [
    {
      id: '2',
      product: 'Pro Plan',
      monthlyPrice: 4,
      yearlyPrice: 39,
      description: 'Best for freelancers and small teams',
    },
    {
      id: '3',
      product: 'Team Plan',
      monthlyPrice: 19,
      yearlyPrice: 190,
      description: 'Best for startups, agencies, and SMBs',
    },
  ]

  return (
    <VStack spacing={6} w="100%">
      <VStack w="100%" py={3} spacing={6}>
        <Heading
          as="h2"
          size={landing ? 'xl' : 'xl'}
          fontWeight="bold"
          textAlign="center"
        >
          {heading || 'Simple, transparent pricing'}
        </Heading>
        <Text>
          Quality financial management shouldn&apos;t break the bank. Choose a
          plan that scales with your needs.
        </Text>
        <HStack>
          <ButtonGroup isAttached>
            <Button
              size={landing ? 'md' : 'sm'}
              variant={interval === 'month' ? 'solid' : 'outline'}
              onClick={() => setInterval('month')}
              colorScheme="gray"
            >
              Monthly
            </Button>
            <Button
              size={landing ? 'md' : 'sm'}
              variant={interval === 'year' ? 'solid' : 'outline'}
              onClick={() => setInterval('year')}
              colorScheme={interval === 'year' ? 'purple' : 'gray'}
            >
              Yearly
            </Button>
          </ButtonGroup>
          <Badge colorScheme="teal">Save 20%</Badge>
        </HStack>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={4}
      >
        <PlanCard
          landing={landing}
          plan={{
            product: 'Free',
            price: 0,
            description: 'For basic needs',
          }}
          interval={interval}
        />
        {displayPlans?.map((plan) => (
          <PlanCard
            landing={landing}
            key={plan.id}
            plan={plan}
            interval={interval}
          />
        ))}
      </Stack>
    </VStack>
  )
}
