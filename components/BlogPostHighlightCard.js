import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react'
import { BiBookmark } from 'react-icons/bi'

function BlogPostHighlightCard({ title, desc }) {
  return (
    <Card variant="outline">
      <CardHeader>
        <HStack>
          <Icon as={BiBookmark} fontSize="1.6rem" />
          <Heading size="sm" style={{ fontSize: '23px', margin: 0 }}>
            {title}
          </Heading>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <Text style={{ margin: 0 }}>{desc}</Text>
      </CardBody>
    </Card>
  )
}

export default BlogPostHighlightCard
