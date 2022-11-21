import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'

const AnnouncementBanner = () => {
  return (
    <Link href="/pricing">
      <HStack
        justify="center"
        bg="linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%)"
        color="white"
        textAlign="center"
        p={3}
        position="sticky"
        top={0}
        left={0}
        right={0}
        zIndex={10}
        cursor="pointer"
        _hover={{
          bg: 'linear-gradient(112.1deg, rgb(42, 38, 57) 11.4%, rgb(53, 66, 91) 70.2%)',
        }}
      >
        <Heading size="sm">
          Black Friday Sale! 🔥 - Save 50% on Subly PRO 💰
        </Heading>
        {/* <Text fontWeight="bold" bg="orange.500" px={3} borderRadius={24}>
          Get Subly PRO
        </Text> */}
      </HStack>
    </Link>
  )
}

export default AnnouncementBanner
