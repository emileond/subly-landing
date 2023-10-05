import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useState, useEffect } from 'react'

const AnnouncementBanner = () => {
  dayjs.extend(duration)

  const END_DATE = dayjs('2023-11-30')

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const now = dayjs()
    const difference = dayjs.duration(END_DATE.diff(now))

    const days = difference.days()
    const hours = difference.hours()
    const minutes = difference.minutes()
    const seconds = difference.seconds()

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  useEffect(() => {
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
          Black Friday Sale! 🔥 - Save 20% on Subly PRO
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
