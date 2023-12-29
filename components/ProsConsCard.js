import {
  Text,
  List,
  ListItem,
  useColorModeValue,
  Card,
  SimpleGrid,
  CardBody,
  ListIcon,
  VStack,
} from '@chakra-ui/react'
import { FaCheckCircle, FaTimes } from 'react-icons/fa'

const ProsConsCard = ({ title, pros, cons }) => {
  const IconColor = useColorModeValue('gray.500', 'whiteAlpha.700')
  const cardBg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Card variant="filled" bg={cardBg}>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <VStack justify="start" align="start">
            <Text style={{ fontWeight: 'bold', margin: 0 }}>Pros:</Text>
            <List spacing={3} style={{ listStyle: 'none', padding: 0 }}>
              {pros?.map((pro, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaCheckCircle} color={IconColor} />
                  {pro}
                </ListItem>
              ))}
            </List>
          </VStack>
          <VStack justify="start" align="start">
            <Text style={{ fontWeight: 'bold', margin: 0 }}>Cons:</Text>
            <List spacing={3} style={{ listStyle: 'none', padding: 0 }}>
              {cons?.map((con, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaTimes} color={IconColor} />
                  {con}
                </ListItem>
              ))}
            </List>
          </VStack>
        </SimpleGrid>
      </CardBody>
    </Card>
  )
}

export default ProsConsCard
