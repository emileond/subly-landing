import React, { Fragment } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../../components/Nav'
import dayjs from 'dayjs'
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
} from '@chakra-ui/react'

const Posts = ({ posts }) => {
  const tagColor = useColorModeValue('blackAlpha', 'gray')
  const hoverBg = useColorModeValue('gray.200', 'gray.700')
  const primaryText = useColorModeValue('blackAlpha.900', 'whiteAlpha.900')
  const secondaryText = useColorModeValue('blackAlpha.700', 'whiteAlpha.700')

  const sortedPosts = posts.sort((a, b) => {
    const aDate = dayjs(a.frontmatter.date).format('MMM DD, YYYY')
    const bDate = dayjs(b.frontmatter.date).format('MMM DD, YYYY')
    return dayjs(bDate).isAfter(dayjs(aDate)) ? 1 : -1
  })

  return (
    <>
      <Head>
        <title>Subly - Release notes</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Container maxW="2xl">
        <Heading py={8} size="xl" lineHeight={1.2} fontWeight="bold" w="100%">
          Release Notes
        </Heading>
        <VStack
          spacing={8}
          w="100%"
          pb={8}
          _hover={{ cursor: 'pointer' }}
          role="group"
        >
          {sortedPosts?.map(({ slug, frontmatter }, index) => (
            <Link key={slug} href={`/releases/${slug}`}>
              <a>
                <Box
                  pos="relative"
                  w="100%"
                  h="280px"
                  borderRadius={12}
                  overflow="hidden"
                  _groupHover={{ boxShadow: 'lg' }}
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt="cover"
                    src={`/release-notes/covers/${frontmatter?.cover}`}
                  />
                </Box>
                <VStack align="start" w="100%" spacing={4} px={4} pb={6}>
                  <HStack spacing={2} pb={1} pt={6}>
                    {frontmatter?.tags?.map((cat) => (
                      <Tag key={cat} borderRadius="full">
                        {cat}
                      </Tag>
                    ))}
                  </HStack>
                  <VStack align="start" textAlign="left" spacing={2}>
                    <Heading size="lg" _groupHover={{ color: 'purple.800' }}>
                      {frontmatter?.title}
                    </Heading>
                    <Text
                      color={secondaryText}
                      fontSize="lg"
                      noOfLines={2}
                      lineHeight="normal"
                      _groupHover={{ color: primaryText }}
                    >
                      {frontmatter?.metaDesc}
                    </Text>
                  </VStack>
                  <HStack w="100%" justify="space-between" pt={4} pb={8}>
                    <Text fontSize="md" color="gray.600">
                      {frontmatter?.date}
                    </Text>
                  </HStack>
                  {posts.length - 1 !== index && <Divider />}
                </VStack>
              </a>
            </Link>
          ))}
        </VStack>
      </Container>
    </>
  )
}

export default Posts

export async function getStaticProps() {
  const files = fs.readdirSync('_releases')

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(`_releases/${fileName}`, 'utf-8')
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
