import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  List,
  ListItem,
  ListIcon,
  Text,
  VStack,
  Badge,
  Card,
  CardBody,
  Skeleton,
} from '@chakra-ui/react'
import { BiCheck, BiX } from 'react-icons/bi'

export default function PlanCard({ plan, landing, onSale, interval }) {
  return (
    <Card
      key={plan.id}
      variant="outline"
      textAlign="left"
      minW="300px"
      maxW="340px"
      borderRadius="lg"
      h="100%"
      overflow="hidden"
    >
      {onSale && (
        <Box
          bg="linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%)"
          color="white"
          textAlign="center"
          p={3}
        >
          <Heading size="sm" color="white">
            Limited time offer: <Badge colorScheme="red">20% off</Badge>
          </Heading>
        </Box>
      )}
      <VStack
        align="start"
        pt={8}
        pb={4}
        px={12}
        bgGradient={
          plan?.product === 'Team Plan'
            ? 'linear(to-r, #8E2DE2, #4A00E0)'
            : 'none'
        }
        color={plan?.product === 'Team Plan' ? 'white' : null}
      >
        <VStack align="start">
          <Skeleton isLoaded={plan}>
            <HStack align="center">
              <Heading
                color={plan?.product === 'Team Plan' ? 'white' : null}
                size={landing ? 'lg' : 'md'}
              >
                {plan?.product}
              </Heading>
            </HStack>
          </Skeleton>
          <Skeleton isLoaded={plan}>
            <Text size={landing ? 'lg' : 'md'} pb={4}>
              {plan?.description}
            </Text>
          </Skeleton>
        </VStack>
        <Skeleton isLoaded={plan}>
          <HStack align="center" w="100%">
            <Text fontSize={landing ? '2xl' : 'xl'} fontWeight="600">
              $
            </Text>
            <Heading
              color={plan?.product === 'Team Plan' ? 'white' : null}
              size={landing ? '4xl' : 'xl'}
            >
              {plan?.product === 'Free' ? '0' : null}
              {interval === 'month' ? plan?.monthlyPrice : plan?.yearlyPrice}
            </Heading>
            <Text fontSize={landing ? '2xl' : 'xl'}>
              / {plan.product === 'Free' ? 'forever' : interval}
            </Text>
          </HStack>
        </Skeleton>
      </VStack>
      <Divider />
      <CardBody>
        <VStack>
          {plan?.product === 'Team Plan' && (
            <Skeleton isLoaded={plan}>
              <List
                spacing={4}
                textAlign="left"
                fontSize={landing ? 'lg' : 'md'}
              >
                <ListItem fontWeight="bold">
                  <ListIcon as={BiCheck} color="green.500" />
                  Everything in Pro, plus:
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  10 team members
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  10 Gb of storage
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  All integrations
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  API Access <Badge colorScheme="green">Soon</Badge>
                </ListItem>
                {/* <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  Bank account linking <Badge colorScheme="green">Soon</Badge>
                </ListItem> */}
              </List>
            </Skeleton>
          )}
          {plan?.product === 'Pro Plan' && (
            <Skeleton isLoaded={plan}>
              <List
                spacing={4}
                textAlign="start"
                px={8}
                fontSize={landing ? 'lg' : 'md'}
              >
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  <Text as="span" fontWeight="bold">
                    Unlimited Subscriptions
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />3 team members
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />1 Gb of storage
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  Projects
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  Ad-free experience
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  Integrations
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  Webhooks
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  Two-factor authentication
                </ListItem>
              </List>
            </Skeleton>
          )}
          {plan?.product === 'Free' && (
            <Skeleton isLoaded={plan}>
              <List
                spacing={4}
                textAlign="start"
                px={8}
                fontSize={landing ? 'lg' : 'md'}
              >
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  Up to 10 subscriptions
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />1 team member
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheck} color="green.500" />
                  500 Mb of storage
                </ListItem>
                <ListItem>
                  <ListIcon as={BiX} color="gray.500" />
                  Ad-free experience
                </ListItem>
              </List>
            </Skeleton>
          )}
        </VStack>
      </CardBody>
      <Box w="100%" p={6}>
        <a href="https://web.subly.app/signup">
          <Button
            variant="solid"
            rounded="full"
            w="100%"
            bg={plan?.product === 'Team Plan' ? '#4A00E0' : 'blackAlpha.800'}
            color="white"
            _hover={{}}
          >
            Get started with {plan?.product}
          </Button>
        </a>
      </Box>
    </Card>
  )
}
