import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

function BlogPostCard({ title, desc, date, slug, coverImage, tags, tagColor }) {
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
        <Tag mb={2} colorScheme={tagColor}>
          {tags[0]?.label}
        </Tag>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{desc}</Text>
      </CardBody>
      <CardFooter>
        <Text>{dayjs(date).format('MMMM D, YYYY')}</Text>
      </CardFooter>
    </Card>
  )
}

export default BlogPostCard
