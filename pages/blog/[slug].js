import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Image,
  IconButton,
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
import { BiArrowBack, BiLink } from 'react-icons/bi'
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

  // Function to generate a slug from text
  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -

  // Function to extract text content from children
  const extractText = (children) => {
    return React.Children.toArray(children)
      .map((child) => {
        if (typeof child === 'string') {
          return child
        } else if (child.props && child.props.children) {
          return extractText(child.props.children)
        } else {
          return ''
        }
      })
      .join('')
  }

  const newTheme = {
    p: (props) => {
      const { children } = props
      return <Text my={6}>{children}</Text>
    },
    h2: (props) => {
      const { children } = props
      const text = extractText(children)
      const id = slugify(text)

      return (
        <HStack id={id} align="center" pb={3} pt={12} role="group">
          <Heading as="h2" fontSize="24px">
            {children}
          </Heading>
          <IconButton
            opacity={0}
            size="sm"
            variant="ghost"
            color="gray.500"
            icon={<BiLink fontSize="18px" />}
            aria-label="Link to this section"
            onClick={() => {
              // Update the URL in the address bar
              window.location.hash = id

              // Optionally scroll to the element smoothly
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: 'smooth' })

              // Copy the new URL to the clipboard
              const url = window.location.href
              navigator.clipboard.writeText(url)
            }}
            _hover={{ color: 'gray.700', bg: 'gray.50' }}
            _groupHover={{ opacity: 1 }}
          />
        </HStack>
      )
    },
    h3: (props) => {
      const { children } = props
      return (
        <Heading as="h3" fontSize="lg" mb={4}>
          {children}
        </Heading>
      )
    },
    h4: (props) => {
      const { children } = props
      return (
        <Heading as="h4" size="sm" my={6}>
          {children}
        </Heading>
      )
    },
    ul: (props) => {
      const { children } = props
      return (
        <UnorderedList pl={3} my={6}>
          {children}
        </UnorderedList>
      )
    },
    ol: (props) => {
      const { children } = props
      return (
        <OrderedList pl={3} my={6}>
          {children}
        </OrderedList>
      )
    },
    li: (props) => {
      const { children } = props
      return (
        <ListItem mb={2}>
          <Text>{children}</Text>
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
        <title>{data?.title}- Subly</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Container
        pt="4vh"
        pb="10vh"
        maxW="container.md"
        fontSize={{ base: '16px', xl: '17px' }}
        lineHeight="1.75"
      >
        <Box pb={8}>
          <Button
            variant="ghost"
            size="xs"
            leftIcon={<BiArrowBack fontSize="1rem" />}
            onClick={() => router.push('/blog')}
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
