import React from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import Nav from '../../components/Nav'
import {
  Container,
  Heading,
  VStack,
  Text,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react'
import BlogPostCard from '../../components/BlogPostCard'
import Footer from '../../components/Footer'

const Posts = ({ posts }) => {
  const tagColor = useColorModeValue('blackAlpha', 'gray')
  const hoverBg = useColorModeValue('gray.200', 'gray.700')
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
      <Container maxW="container.xl" minH="80vh">
        <VStack align="start" spacing={3} py={20}>
          <Heading size="xl">Subly Blog</Heading>
          <Text fontSize="lg">
            Finance Tips, In-Depth Tool Reviews, and Success Stories Tailored
            for Businesses.
          </Text>
        </VStack>
        <VStack spacing={8} w="100%" pb={8}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {posts
              .filter((post) => post.status === 'published')
              .map(
                (
                  { slug, title, description, publishedAt, coverImage },
                  index
                ) => (
                  <BlogPostCard
                    coverImage={`/blog/${coverImage}`}
                    title={title}
                    desc={description}
                    date={publishedAt}
                    slug={slug}
                    key={index}
                  />
                )
              )}
          </SimpleGrid>
        </VStack>
      </Container>
      <Footer />
    </>
  )
}

export default Posts

export async function getStaticProps() {
  const files = fs.readdirSync('outstatic/content/posts')

  // Filter out unwanted files
  const mdFiles = files.filter((file) => file.endsWith('.md'))

  const posts = mdFiles.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(
      `outstatic/content/posts/${fileName}`,
      'utf-8'
    )
    const { data: frontmatter } = matter(readFile)

    return {
      slug,
      author: frontmatter.author,
      coverImage: frontmatter.coverImage,
      description: frontmatter.description,
      publishedAt: frontmatter.publishedAt,
      status: frontmatter.status,
      title: frontmatter.title,
    }
  })

  return {
    props: {
      posts,
    },
  }
}
