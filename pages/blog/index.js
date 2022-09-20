import React, { Fragment } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
// import Link from 'next/link'
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
  Link,
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
} from '@chakra-ui/react'

const Posts = ({ posts }) => {
  const tagColor = useColorModeValue('blackAlpha', 'gray')
  const hoverBg = useColorModeValue('gray.200', 'gray.700')
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
      <Container maxW="2xl">
        <Heading py={8} size="xl" lineHeight={1.2} fontWeight="bold" w="100%">
          Blog
        </Heading>
        <VStack spacing={8} w="100%" pb={8}>
          {posts.map(({ slug, frontmatter }, index) => (
            <Fragment key={slug}>
              <Box
                pos="relative"
                w="100%"
                h="240px"
                borderRadius={12}
                overflow="hidden"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  alt="cover"
                  src="/release-notes/demo.png"
                />
              </Box>
              <VStack align="start" w="100%" spacing={4} px={4} pb={8}>
                <HStack spacing={2} mb={1}>
                  {frontmatter?.tags?.map((cat) => (
                    <Tag key={cat} colorScheme={tagColor} borderRadius="full">
                      {cat}
                    </Tag>
                  ))}
                </HStack>
                <VStack align="start" textAlign="left" spacing={2}>
                  <Heading size="lg" _hover={{ color: 'blue.500' }}>
                    {frontmatter?.title}
                  </Heading>
                  <Text fontSize="lg" noOfLines={2} lineHeight="normal">
                    {frontmatter?.metaDesc}
                  </Text>
                </VStack>
                <HStack w="100%" justify="space-between" pt={4} pb={8}>
                  <HStack align="start">
                    <Avatar
                      name="Ryan Florence"
                      src={frontmatter?.userAvatar}
                      size="sm"
                    />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="bold">
                        {frontmatter?.author}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {frontmatter?.date}
                      </Text>
                    </VStack>
                  </HStack>
                </HStack>
                {posts.length - 1 !== index && <Divider />}
              </VStack>
            </Fragment>
          ))}
        </VStack>
      </Container>
    </>
  )
}

export default Posts

export async function getStaticProps() {
  const files = fs.readdirSync('_posts')

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
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
