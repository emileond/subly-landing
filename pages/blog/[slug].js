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
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import ProsConsCard from '../../components/ProsConsCard'
import BlogPostHighlightCard from '../../components/BlogPostHighlightCard'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'

export default function PostPage({ frontmatter, content }) {
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
        <Heading pb={6}>{frontmatter.title}</Heading>
        <Image
          borderRadius="2xl"
          overflow="hidden"
          src={`/blog/${frontmatter.cover}`}
          alt={frontmatter.title}
        />
        <Prose>
          <MDXRemote {...content} components={components} />
        </Prose>
        <VStack>
          <Text>
            <strong>Author:</strong> {frontmatter.author}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {frontmatter.date}
          </Text>
        </VStack>
      </Container>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync('_posts')

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`_posts/${slug}.mdx`, 'utf-8')
  const { data: frontmatter, content } = matter(fileName)
  const mdxSource = await serialize(content)
  return {
    props: {
      frontmatter,
      content: mdxSource,
    },
  }
}
