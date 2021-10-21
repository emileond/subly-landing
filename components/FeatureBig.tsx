import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import { ReactElement } from 'react'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function FeatureBig({ heading, desc, inverted, id }) {
  return (
    <Container id={id} maxW={'6xl'} py={32}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        rows={{ base: 2, md: 1 }}
        spacing={10}
        alignItems="center"
      >
        <Stack spacing={4} gridArea={[1, 1, inverted ? '1/2' : 1]}>
          {/* <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            Our Story
          </Text> */}
          <Heading>{heading}</Heading>
          <Text color={'gray.700'} fontSize={'lg'}>
            {desc}
          </Text>
          <Box>
            <Button
              as="a"
              rounded="full"
              px={8}
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
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            {/* <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Business Planning'}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Financial Planning'}
            />
            <Feature
              icon={
                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Market Analysis'}
            /> */}
          </Stack>
        </Stack>
        <Flex justify={inverted ? 'start' : 'end'} pos="relative">
          <Image
            rounded={'md'}
            alt="feature image"
            src="./feature.png"
            objectFit="cover"
          />
          {inverted ? (
            <Image
              rounded={'md'}
              alt="background shape"
              src="./shape1.svg"
              pos="absolute"
              top="-25%"
              left="0"
              zIndex={-1}
            />
          ) : (
            <Image
              rounded={'md'}
              alt="background shape"
              src="./shape3.svg"
              pos="absolute"
              top="-50%"
              right="0"
              zIndex={-1}
            />
          )}
        </Flex>
      </SimpleGrid>
    </Container>
  )
}
