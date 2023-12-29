import React, { Fragment } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../../components/Nav'
import {
  Button,
  Container,
  Heading,
  Box,
  HStack,
  VStack,
  Stack,
  Text,
  Icon,
  Tag,
  Divider,
  Avatar,
  AvatarGroup,
  useColorModeValue,
  Tabs,
  Tab,
  TabPanels,
  TabList,
  TabPanel,
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
            {posts.map(({ slug, frontmatter }, index) => (
              <BlogPostCard
                coverImage={`/blog/${frontmatter.cover}`}
                title={frontmatter.title}
                desc={frontmatter.metaDesc}
                date={frontmatter.date}
                slug={slug}
                key={index}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
      <Footer />
    </>
  )
}

export default Posts

export async function getStaticProps() {
  const files = fs.readdirSync('_posts')

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '')
    const readFile = fs.readFileSync(`_posts/${fileName}`, 'utf-8')
    const { data: frontmatter } = matter(readFile)

    return {
      slug,
      frontmatter,
    }
  })
  return {
    props: {
      posts,
    },
  }
}
