import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import Nav from '../../components/Nav'
import { BiArrowBack } from 'react-icons/bi'
import ProsConsCard from '../../components/ProsConsCard'
import BlogPostHighlightCard from '../../components/BlogPostHighlightCard'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'

export default function PostPage({ data, content }) {
  console.log(data, content)
  const router = useRouter()
  const components = {
    ProsConsCard,
    BlogPostHighlightCard,
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
      <Container pt="5vh" pb="10vh" maxW="800px">
        <Box pb={2}>
          <Button
            variant="ghost"
            colorScheme="blue"
            leftIcon={<BiArrowBack fontSize="1rem" />}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>
        <Heading pb={6}>{data?.title}</Heading>
        <Image
          borderRadius="2xl"
          overflow="hidden"
          src={`/blog/${data?.coverImage}`}
          alt={data?.title}
        />
        <Prose>{content}</Prose>
        <VStack>
          <Text>
            <strong>Author:</strong> {data?.author?.name}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {data?.publishedAt}
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
