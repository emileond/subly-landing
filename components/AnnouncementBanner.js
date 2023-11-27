import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useState, useEffect } from 'react'

const AnnouncementBanner = () => {
  dayjs.extend(duration)

  const END_DATE = dayjs('2023-11-28')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isClient, setIsClient] = useState(false)

  function calculateTimeLeft() {
    const now = dayjs()
    const difference = dayjs.duration(END_DATE.diff(now))

    return {
      days: difference.days(),
      hours: difference.hours(),
      minutes: difference.minutes(),
      seconds: difference.seconds(),
    }
  }

  useEffect(() => {
    // Set isClient to true to indicate that this is now client-side
    setIsClient(true)

    // Update time left only on the client-side
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hasTimeLeft =
    timeLeft.days > 0 ||
    timeLeft.hours > 0 ||
    timeLeft.minutes > 0 ||
    timeLeft.seconds > 0

  // Render placeholder content until we're client-side
  if (!isClient) {
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
            bg: '#4A00E0',
          }}
        >
          <Heading size="sm">
            🔥 Black Friday Sale: 50% off on the Team Plan
          </Heading>
          <Text>Loading...</Text>
        </HStack>
      </Link>
    )
  }

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
          bg: '#4A00E0',
        }}
      >
        <Heading size="sm">
          🔥 Black Friday Sale: 50% off on the Team Plan
        </Heading>
        {hasTimeLeft ? (
          <Text>
            - Ends in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{' '}
            {timeLeft.seconds}s
          </Text>
        ) : (
          <Text>Offer Expired</Text>
        )}
      </HStack>
    </Link>
  )
}

export default AnnouncementBanner
