import {
  Box,
  Button,
  Container,
  Image,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'

export default function FeatureBig({
  heading,
  desc,
  inverted,
  id,
  img,
  width,
  maxW,
}) {
  return (
    <Box bg={inverted ? 'none' : '#F1F5F9'}>
      <Container id={id} maxW={'7xl'} py={24}>
        <Flex
          direction={{ base: 'column', md: inverted ? 'row-reverse' : 'row' }}
          align="center"
          justify="space-around"
          wrap={{ base: 'nowrap', md: 'wrap' }}
          mb={4}
        >
          <VStack spacing={4} align="start" w={{ base: '100%', md: '45%' }}>
            <Heading size="xl">{heading}</Heading>
            <Text color={'gray.700'} fontSize={'lg'}>
              {desc}
            </Text>
            <Box>
              <Button
                as="a"
                rounded="full"
                px={6}
                colorScheme="purple"
                variant="ghost"
                color="#6F55FF"
                cursor="pointer"
                rightIcon={<FiArrowRight />}
                href="https://web.subly.app/signup"
              >
                Get started for free
              </Button>
            </Box>
          </VStack>
          <Image
            rounded={'md'}
            alt="feature image"
            src={img ? `./${img}.png` : './feature.png'}
            objectFit="cover"
            w={width}
            maxW={maxW ? maxW : '500px'}
            zIndex={2}
            mt={{ base: 4, md: 0 }}
          />
        </Flex>
      </Container>
    </Box>
  )
}
