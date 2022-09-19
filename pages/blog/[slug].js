import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'
import Head from 'next/head'
import Nav from '../../components/Nav'
import { BiArrowBack } from 'react-icons/bi'

export default function PostPage({ frontmatter, content }) {
  return (
    <>
      <Head>
        <title>Subly - Blog</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Container pt={12} maxW="4xl">
        <Box pb={2}>
          <Button
            variant="ghost"
            colorScheme="blue"
            leftIcon={<BiArrowBack fontSize="1rem" />}
          >
            Back
          </Button>
        </Box>
        <Heading>{frontmatter.title}</Heading>

        <Prose dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync('_posts')

  const paths = files.map((fileName) => ({
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
  const fileName = fs.readFileSync(`_posts/${slug}.md`, 'utf-8')
  const { data: frontmatter, content } = matter(fileName)
  return {
    props: {
      frontmatter,
      content,
    },
  }
}
