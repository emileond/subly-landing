import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import MarkdownIt from 'markdown-it'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi'

const md = new MarkdownIt()

const TestimonialCard = ({ logo, quote, company, name, url }) => {
  const renderedQuote = md.render(quote)

  return (
    <Card
      variant="outline"
      bg="gray.50"
      borderRadius="2xl"
      _hover={{
        background: 'white',
      }}
    >
      <CardHeader pb={0}>
        <VStack justify="center" align="start" w="100px" h="60px">
          {logo && (
            <Image src={logo} alt={`${company} logo`} objectFit="contain" />
          )}
        </VStack>
      </CardHeader>
      <CardBody>
        {renderedQuote && (
          <Box
            display="flex"
            flexDir="column"
            gap={4}
            dangerouslySetInnerHTML={{ __html: renderedQuote }}
          />
        )}
      </CardBody>
      <CardFooter>
        <HStack>
          <Text fontSize="sm">{name}</Text>
          <Link
            fontWeight="bold"
            href={`https://${url}`}
            isExternal
            fontSize="sm"
            color="#4A00E0"
          >
            {company}
          </Link>
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default TestimonialCard
