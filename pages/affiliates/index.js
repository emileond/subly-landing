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
} from '@chakra-ui/react'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Hero from '../../components/Hero'
import Nav from '../../components/Nav'
import { RiCalendar2Fill, RiDashboard2Fill, RiPaypalFill } from 'react-icons/ri'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <Box maxW="100vw">
      <Head>
        <title>Subly - Join our Affiliate Program</title>
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
            Join our affiliate program, earn 30% commission.
          </Heading>
          <Text fontSize="lg">
            Partner with us to earn a recurring 30% commission per referral.
          </Text>
          <HStack>
            <Link href="https://sublyapp.getrewardful.com/signup" isExternal>
              <Button
                as="span"
                size="lg"
                rounded="full"
                px={6}
                colorScheme="blue"
                bg={'#6F55FF'}
                _hover={{ bg: '#5842d8' }}
              >
                Join Now
              </Button>
            </Link>
            <Link href="https://sublyapp.getrewardful.com/login" isExternal>
              <Button
                as="span"
                variant="outline"
                size="lg"
                rounded="full"
                px={6}
              >
                Affiliate login
              </Button>
            </Link>
          </HStack>
        </VStack>
        <Spacer h="10vh" />
        <SimpleGrid minChildWidth="200px" spacing={4}>
          <Card variant="outline">
            <CardHeader>
              <Box
                borderRadius="full"
                bg="#364fc7"
                color="white"
                p={4}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={12}
                h={12}
                mb={2}
              >
                <Icon fontSize="1.8rem" as={RiPaypalFill} />
              </Box>
              <Heading size="md">Paypal Payouts</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Text>Monthly payout via PayPal. No minimum threshold.</Text>
            </CardBody>
          </Card>
          <Card variant="outline">
            <CardHeader>
              <Box
                borderRadius="full"
                bg="#364fc7"
                color="white"
                p={4}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={12}
                h={12}
                mb={2}
              >
                <Icon fontSize="1.8rem" as={RiCalendar2Fill} />
              </Box>
              <Heading size="md">60-day cookie</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Text>
                Get credit for all sales made within 60 days of a referral.
              </Text>
            </CardBody>
          </Card>
          <Card variant="outline">
            <CardHeader>
              <Box
                borderRadius="full"
                bg="#364fc7"
                color="white"
                p={4}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={12}
                h={12}
                mb={2}
              >
                <Icon fontSize="1.8rem" as={RiDashboard2Fill} />
              </Box>
              <Heading size="md">Sales dashboard</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Text>
                Track your sales in our affiliate dashboard. Powered by
                Rewardful.
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
        <Spacer h="10vh" />
        <Box>
          <Heading size="xl" mb={4}>
            How it works
          </Heading>
          <List spacing={6}>
            <ListItem>
              <Heading size="md">1. Sign up for our affiliate program</Heading>
            </ListItem>
            <ListItem>
              <Heading size="md">
                2. Share your referral link with your audience
              </Heading>
              <Text>
                Share your link with friends, family, clients, social media,
                blogs, etc.
              </Text>
            </ListItem>
            <ListItem>
              <Heading size="md">
                3. Get paid 30% commission for every referral
              </Heading>
              <Text>
                Receive 30% recurring commission for every successful referral
              </Text>
            </ListItem>
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
              Join our affiliate program
            </Heading>
            <Text color="whiteAlpha.900" fontSize={'xl'}>
              Partner with us to earn a recurring 30% commission per referral.
            </Text>
            <Box>
              <Link href="https://sublyapp.getrewardful.com/signup" isExternal>
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
        <Spacer h="10vh" />
        <VStack textAlign="center">
          <Heading>Affiliate Program Terms</Heading>
          <Text fontSize="lg">
            We have a few simple rules to ensure that our partnership is
            mutually beneficial. <br /> No hidden tricks or surprises, just some
            straightforward guidelines to follow.
          </Text>
          <UnorderedList textAlign="left" py={8} spacing={4} maxW="lg">
            <ListItem>
              Self-referrals are not allowed (i.e. signing up for Testimonial
              through your own affiliate link)
            </ListItem>
            <ListItem>
              Abuse, gaming, or attempting to mislead (i.e. posting fake
              discounts to coupon-sharing websites) will result in your account
              being permanently banned.
            </ListItem>
            <ListItem>
              No search engine ads (especially on branded terms or domain
              names), Facebook ads or other ads that would compete with our own
              marketing and cause potential confusion for customers.
            </ListItem>
            <ListItem>
              No spamming, including sending unsolicited emails, posting spam on
              social media, or other forms of spam.
            </ListItem>
            <ListItem>
              No pretending to be acting on behalf of us (ie. as an employee).
            </ListItem>
            <ListItem>
              In some cases, we can give credit to an affiliate even if the
              customer didn’t sign up through an affiliate link or coupon code.
              If you have a case like this, please contact us and we’ll do our
              best to help.
            </ListItem>
          </UnorderedList>
        </VStack>
      </Container>
      <Footer />
    </Box>
  )
}
