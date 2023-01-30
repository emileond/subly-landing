import { Box, Button, Container, Heading, Spacer } from '@chakra-ui/react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import fs from 'fs'
import { useRouter } from 'next/router'
import matter from 'gray-matter'
import md from 'markdown-it'
import Head from 'next/head'
import Nav from '../../components/Nav'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'

export default function PostPage({ frontmatter, content }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Container pt={12} maxW="3xl">
        <Box pb={2}>
          <Button
            variant="link"
            colorScheme="blue"
            leftIcon={<BiArrowBack fontSize="1rem" />}
            onClick={() => router.push('/releases')}
          >
            Back
          </Button>
        </Box>
        <Heading pt={2} pb={4}>
          {frontmatter.title}
        </Heading>
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
        <Prose dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        <Spacer py={8} />
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync('_releases')

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
  const fileName = fs.readFileSync(`_releases/${slug}.md`, 'utf-8')
  const { data: frontmatter, content } = matter(fileName)
  return {
    props: {
      frontmatter,
      content,
    },
  }
}
