import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Icon,
  SimpleGrid,
  Spacer,
  List,
  ListItem,
  ListIcon,
  UnorderedList,
  Link,
  Divider,
  Badge,
} from '@chakra-ui/react'
import Head from 'next/head'

import Nav from '../../components/Nav'
import { RiCalendar2Fill, RiDashboard2Fill, RiPaypalFill } from 'react-icons/ri'
import Footer from '../../components/Footer'
import { BiCaretRight, BiRightArrow, BiRightArrowAlt } from 'react-icons/bi'

export default function Roadmap() {
  const items = [
    {
      title: 'Cashflow report',
      type: 'New feature',
      color: 'green',
      status: 'now',
    },
    {
      title: 'Webhooks for reminders',
      type: 'Bug fix',
      color: 'red',
      status: 'now',
    },
    {
      title: 'Show past trasnactions for subscriptions',
      type: 'Enhancement',
      color: 'purple',
      status: 'now',
    },
    {
      title: 'Year calendar view',
      type: 'New feature',
      color: 'green',
      status: 'now',
    },
    {
      title: 'Logos API',
      type: 'Enhancement',
      color: 'purple',
      status: 'next',
    },
    {
      title: 'Bulk edit reminders',
      type: 'Enhancement',
      color: 'purple',
      status: 'next',
    },
    {
      title: 'Connect bank accounts',
      type: 'New feature',
      color: 'green',
      status: 'next',
    },
    {
      title: 'API',
      type: 'New feature',
      color: 'green',
      status: 'next',
    },
    {
      title: 'User mentions and assignees',
      type: 'Enhancement',
      color: 'purple',
      status: 'later',
    },
    {
      title: 'Invoice generator for recurring revenue',
      type: 'New feature',
      color: 'green',
      status: 'later',
    },
    {
      title: 'Files explorer',
      type: 'New feature',
      color: 'green',
      status: 'later',
    },
    {
      title: 'AI powered insights',
      type: 'New feature',
      color: 'green',
      status: 'later',
    },
  ]
  return (
    <Box maxW="100vw">
      <Head>
        <title>Subly - Roadmap</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Container maxW="4xl" py={12}>
        <VStack textAlign="center" spacing={8}>
          <Heading size="2xl" lineHeight="1.2">
            Roadmap
          </Heading>
          <Text fontSize="lg">What’s on the horizon for Subly</Text>
          <Link href="https://web.subly.app/signup">
            <Button
              as="span"
              variant="outline"
              size="lg"
              rounded="full"
              px={6}
              rightIcon={<Icon as={BiRightArrowAlt} />}
            >
              Get started for free
            </Button>
          </Link>
        </VStack>
        <Spacer h="10vh" />
        <Box>
          <VStack spacing={4} mb={8} align="start">
            <Heading size="xl">Now</Heading>
            <Text>
              A quick look at what the Subly team is actively working on right
              now.
            </Text>
          </VStack>
          <List spacing={6}>
            {items
              .filter((el) => el.status === 'now')
              .map((item, index) => (
                <>
                  <ListItem key={index}>
                    <HStack>
                      <Text fontSize="lg" fontWeight="500">
                        {item.title}
                      </Text>
                      <Badge
                        colorScheme={item.color}
                        borderRadius="full"
                        py={0.5}
                        px={2}
                      >
                        {item.type}
                      </Badge>
                    </HStack>
                  </ListItem>
                  <Divider />
                </>
              ))}
          </List>
        </Box>
        <Spacer h="10vh" />
        <Box>
          <VStack spacing={4} mb={8} align="start">
            <Heading size="xl">Next</Heading>
            <Text>
              A sneak peek at what we’re stirring up next. We’ll get to this in
              the next 3 months.
            </Text>
          </VStack>
          <List spacing={6}>
            {items
              .filter((el) => el.status === 'next')
              .map((item, index) => (
                <>
                  <ListItem key={index}>
                    <HStack>
                      <Text fontSize="lg" fontWeight="500">
                        {item.title}
                      </Text>
                      <Badge
                        colorScheme={item.color}
                        borderRadius="full"
                        py={0.5}
                        px={2}
                      >
                        {item.type}
                      </Badge>
                    </HStack>
                  </ListItem>
                  <Divider />
                </>
              ))}
          </List>
        </Box>
        <Divider my={20} />
        <Box>
          <VStack spacing={4} mb={8} align="start">
            <Heading size="xl">Later</Heading>
            <Text>
              A glance at where we're going in the future. We'll get to this in
              approximately 6 months.
            </Text>
          </VStack>
          <List spacing={6}>
            {items
              .filter((el) => el.status === 'later')
              .map((item, index) => (
                <>
                  <ListItem key={index}>
                    <HStack>
                      <Text fontSize="lg" fontWeight="500">
                        {item.title}
                      </Text>
                      <Badge
                        colorScheme={item.color}
                        borderRadius="full"
                        py={0.5}
                        px={2}
                      >
                        {item.type}
                      </Badge>
                    </HStack>
                  </ListItem>
                  <Divider />
                </>
              ))}
          </List>
        </Box>
        <Spacer h="10vh" />
        <Box
          py="3rem"
          bg="linear-gradient(
        45deg,#8E2DE2,#364fc7)"
          borderRadius={32}
          shadow="xl"
          data-aos="fade-up"
        >
          <VStack spacing={4} textAlign="center">
            <Heading color="white" fontSize={'4xl'}>
              Get started today
            </Heading>
            <Text color="whiteAlpha.900" fontSize={'xl'}>
              Signup now and experience a new era of financial transparency for
              your business.
            </Text>
            <Box>
              <Link href="https://web.subly.app/signup" isExternal>
                <Button
                  as="span"
                  size="lg"
                  rounded="full"
                  px={6}
                  bg={'white'}
                  color="blackAlpha.800"
                >
                  Join Now
                </Button>
              </Link>
            </Box>
          </VStack>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
