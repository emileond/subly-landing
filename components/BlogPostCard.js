import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

function BlogPostCard({ title, desc, date, slug, coverImage }) {
  const router = useRouter()
  return (
    <Card
      borderRadius="lg"
      overflow="hidden"
      maxW="600px"
      cursor="pointer"
      onClick={() => router.push(`/blog/${slug}`)}
      shadow="xs"
      _hover={{ shadow: 'lg', transform: 'translateY(-6px)' }}
      transition="all 0.12s"
    >
      <Image src={coverImage} alt={title} />
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{desc}</Text>
      </CardBody>
      <CardFooter>
        <Text>{date}</Text>
      </CardFooter>
    </Card>
  )
}

export default BlogPostCard
