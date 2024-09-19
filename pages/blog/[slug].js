import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  OrderedList,
  Tag,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react'
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import Nav from '../../components/Nav'
import { BiArrowBack } from 'react-icons/bi'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { readingTime } from 'reading-time-estimator'
import CTA from '../../components/CTA'

export default function PostPage({ data, content }) {
  const router = useRouter()

  const readingTimeEstimate = readingTime(content, 220)

  const newTheme = {
    p: (props) => {
      const { children } = props
      return (
        <Text mb={8} fontSize={{ base: '16px', md: '18px' }} lineHeight="1.8">
          {children}
        </Text>
      )
    },
    h2: (props) => {
      const { children } = props
      return (
        <Heading as="h3" fontSize="2xl" mb={4}>
          {children}
        </Heading>
      )
    },
    h3: (props) => {
      const { children } = props
      return (
        <Heading as="h3" fontSize="xl" mb={4}>
          {children}
        </Heading>
      )
    },
    h4: (props) => {
      const { children } = props
      return (
        <Heading as="h4" fontSize="18px" mb={4}>
          {children}
        </Heading>
      )
    },
    ul: (props) => {
      const { children } = props
      return (
        <UnorderedList pl={8} mb={8}>
          {children}
        </UnorderedList>
      )
    },
    ol: (props) => {
      const { children } = props
      return (
        <OrderedList pl={8} mb={8}>
          {children}
        </OrderedList>
      )
    },
    li: (props) => {
      const { children } = props
      return (
        <ListItem mb={3}>
          <Text fontSize={{ base: '16px', md: '18px' }} lineHeight="1.8">
            {children}
          </Text>
        </ListItem>
      )
    },
    hr: (props) => {
      return <Divider my={8} />
    },
  }

  return (
    <>
      <Head>
        <title>Subly Blog</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Container pt="4vh" pb="10vh" maxW="container.md">
        <Box pb={8}>
          <Button
            variant="ghost"
            size="xs"
            leftIcon={<BiArrowBack fontSize="1rem" />}
            onClick={() => router.back()}
          >
            Back to blog
          </Button>
        </Box>

        <VStack mb={6} align="start">
          <Tag
            colorScheme="blue"
            variant="subtle"
            py={1}
            px={2}
            borderRadius="full"
            mb={1}
          >
            {data?.tags[0]?.label}
          </Tag>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            lineHeight="shorter"
            letterSpacing="tight"
          >
            {data?.title}
          </Heading>
          <HStack w="100%" justify="start" py={4}>
            <Avatar
              src={data?.author?.picture}
              name={data?.author?.name}
              size="sm"
            />
            <Text fontSize="sm">{data?.author?.name}</Text>
            <HStack>
              <Text fontSize="sm">
                {dayjs(data?.publishedAt).format('MMMM D, YYYY')} •
              </Text>
              <Text fontSize="sm">{readingTimeEstimate?.text} </Text>
            </HStack>
          </HStack>
        </VStack>
        <Image
          borderRadius="3xl"
          overflow="hidden"
          src={data?.coverImage}
          alt={data?.title}
          mb={8}
        />
        <ReactMarkdown components={ChakraUIRenderer(newTheme)}>
          {content}
        </ReactMarkdown>
        <CTA
          headline={data?.ctaHeadline}
          text={data?.ctaText}
          cta={data?.ctaButtonLabel}
        />
        <Divider my={8} />
        <VStack>
          <Avatar
            src={data?.author?.picture}
            name={data?.author?.name}
            size="md"
          />
          <Text>{data?.author?.name}</Text>
          <Text fontSize="sm" color="gray.600">
            {dayjs(data?.publishedAt).format('MMMM D, YYYY')}
          </Text>
        </VStack>
      </Container>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync('outstatic/content/posts')

  const mdFiles = files.filter((file) => file.endsWith('.md'))

  const paths = mdFiles.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(
    `outstatic/content/posts/${slug}.md`,
    'utf-8'
  )
  const { data, content } = matter(fileName)

  return {
    props: {
      data,
      content,
    },
  }
}
