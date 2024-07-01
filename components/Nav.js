import Link from 'next/link'
import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Image,
  Text,
  IconButton,
  Stack,
  VStack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { BiMenu, BiX } from 'react-icons/bi'

export default function Nav() {
  const { isOpen, onToggle } = useDisclosure()

  const MobileNav = () => {
    return (
      <VStack
        spacing={12}
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem
            key={navItem.label}
            label={navItem.label}
            href={navItem.href}
          ></MobileNavItem>
        ))}
      </VStack>
    )
  }

  const MobileNavItem = ({ label, children, href }) => {
    return (
      <Stack
        spacing={4}
        onClick={onToggle}
        _hover={{ cursor: 'pointer', color: 'purple.600' }}
      >
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text
            fontWeight={600}
            // color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
        </Flex>
      </Stack>
    )
  }
  return (
    <>
      <Box
        as="nav"
        // bg={useColorModeValue('white', 'gray.800')}
        backdropFilter="saturate(180%) blur(15px)"
        backgroundColor="rgba(255, 255, 255, .7)"
        color={useColorModeValue('gray.600', 'white')}
        py={{ base: 3 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor="gray.100"
        h="100%"
        w="100%"
        zIndex={8}
      >
        <Flex w={['100%', '100%', '75%']} align={'center'} mx="auto">
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <BiX /> : <BiMenu />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: 'center', md: 'start' }}
            align="center"
          >
            <HStack
              as="a"
              size="lg"
              variant="link"
              href="/"
              fontWeight="bold"
              justify="start"
              gap={3}
              color={useColorModeValue('gray.800', 'white')}
              _hover={{ textDecoration: 'none' }}
            >
              <Box>
                <Image
                  src="/logo.svg"
                  alt="subly logo"
                  width="20px"
                  height="30px"
                />
              </Box>
              <Text>Subly</Text>
            </HStack>

            <Flex display={{ base: 'none', md: 'flex' }} ml={8}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
            align="center"
          >
            <Link href="https://web.subly.app/">
              <Button size="sm" variant="ghost">
                Login
              </Button>
            </Link>
            <Link href="https://web.subly.app/signup">
              <Button
                size="sm"
                display={{ base: 'none', md: 'inline-flex' }}
                fontWeight={600}
                color={'white'}
                bg={'gray.700'}
                _hover={{
                  bg: 'gray.800',
                }}
              >
                Signup
              </Button>
            </Link>
          </Stack>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('#5842d8', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={8}>
      {NAV_ITEMS.map((navItem) => (
        <Box
          key={navItem.label}
          p={2}
          fontSize={'md'}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
          }}
        >
          <Link href={navItem.href} scroll={false}>
            <Button size="sm" variant="ghost">
              {navItem.label}
            </Button>
          </Link>
        </Box>
      ))}
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: 'Features',
    href: '/#features',
  },
  {
    label: 'Pricing',
    href: '/#pricing',
  },
  {
    label: 'FAQ',
    href: '/#faq',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
]
