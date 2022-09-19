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

const articles = [
  {
    id: 1,
    tags: ['News'],
    title: 'Build a Modern User Interface with Chakra UI',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. simply dummy text...`,
    userAvatar:
      'https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    usernames: 'Danilo, Sam, Olivier, and more.',
    created_at: 'Apr 06, 2022',
    author: 'Emilio',
  },
  {
    id: 2,
    tags: ['Web Development', 'Video'],
    title: 'The Complete Guide to Ruby on Rails Encrypted Credentials',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    userAvatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
    usernames: 'Timo Delangle, Olivier, and more.',
    created_at: 'Apr 03, 2022',
    author: 'Emilio',
  },
]

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
        <Tabs>
          <TabList>
            <Tab>Articles</Tab>
            <Tab>Release notes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing={8} w="100%" pb={8}>
                {posts.map(({ slug, frontmatter }, index) => (
                  <Fragment key={slug}>
                    <Box
                      pos="relative"
                      w="100%"
                      h="200px"
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
                          <Tag
                            key={cat}
                            colorScheme={tagColor}
                            borderRadius="full"
                          >
                            {cat}
                          </Tag>
                        ))}
                      </HStack>
                      <VStack align="start" textAlign="left" spacing={2}>
                        <Heading size="lg" _hover={{ color: 'blue.400' }}>
                          {frontmatter?.title}
                        </Heading>
                        <Text
                          fontSize="md"
                          color="gray.500"
                          noOfLines={2}
                          lineHeight="normal"
                        >
                          {frontmatter?.metaDesc}
                        </Text>
                      </VStack>
                      <HStack w="100%" justify="space-between" pb={8}>
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
            </TabPanel>
          </TabPanels>
        </Tabs>
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
