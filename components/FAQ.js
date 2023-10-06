import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  Container,
  VStack,
  Divider,
  Heading,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function FAQ() {
  return (
    <>
      <Container as="section" maxW="container.lg" pt="4rem" pb={24} id="faq">
        <Heading py={12}>Frequently Asked Questions</Heading>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem mb={4} border="1px solid #eaeaea" borderRadius={8}>
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.800" py={2}>
                  Why use a subscription-based software to track subscriptions?
                  Isn&apos;t that ironic?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.800">
              While it may seem ironic, it&rsquo;s all about return on
              investment. By using Subly, you&rsquo;re effectively investing in
              a tool that could potentially save you much more by identifying
              spending gaps, ensuring you don&rsquo;t miss renewal dates, and
              helping you manage budgets effectively.
              <br /> <br />
              Think of it as a small investment for peace of mind and
              potentially substantial savings in the long run.
              <br /> <br />
              Also, this model allows to continuously invest in expanding
              features and improving Subly.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem mb={4} border="1px solid #eaeaea" borderRadius={8}>
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.800" py={2}>
                  Can I use Subly to track payments other than subscriptions?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.800">
              Absolutely. Subly can be used to track and manage any recurring
              payments, and even one-time expenses.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem mb={4} border="1px solid #eaeaea" borderRadius={8}>
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.800" py={2}>
                  How many subscriptions can I track?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.800">
              The Free version of Subly allows you to track up to 10
              subscriptions. If you would like to track more than 10
              subscriptions, please consider upgrading to the Pro version.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            mb={4}
            border="1px solid #eaeaea"
            borderRadius={8}
            data-aos="flip-down"
          >
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.800" py={2}>
                  What plan should I choose?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.800" borderBottomRadius={8}>
              The Free plan offers basic features suitable for individuals, and
              it&apos;s limited to 10 subscriptions. The Pro and Team plans
              provide unlimited subscriptions and functionalities like team
              collaboration, integrations, and storage space for file uploads.
              <br /> <br />
              If you are not sure which plan is right for you, you can start
              with the Free plan and upgrade later if you need to.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem mb={4} border="1px solid #eaeaea" borderRadius={8}>
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.800" py={2}>
                  Is there any contract or long-term commitment?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.800">
              No, our plans are month-to-month unless you opt for an annual
              plan. You can cancel at anytime.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem mb={4} border="1px solid #eaeaea" borderRadius={8}>
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.800" py={2}>
                  How is my data handled?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.800">
              Your data is yours. We respect your privacy and ensure that your
              data is never used for any other purposes. You can download all
              your data at any time, and if you ever decide to leave Subly, your
              data will be deleted from the servers.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem mb={4} border="1px solid #eaeaea" borderRadius={8}>
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.800" py={2}>
                  I have feedback or a feature request. How can I share it with
                  the team?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.800">
              To share your feedback or request new features, please visit the{' '}
              {''}
              <Link href="https://roadmap.subly.app/feature-requests" passHref>
                Feedback board
              </Link>
              . It&apos;s a direct line to the team, and we prioritize based on
              user feedback.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem mb={4} border="1px solid #eaeaea" borderRadius={8}>
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.800" py={2}>
                  Do you have an affiliate program?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.800">
              Yes! If you&apos;re interested in promoting Subly and earning from
              it, we invite you to join the affiliate program. For details and
              to get started, head over to the{' '}
              <Link href="/affiliates" passHref>
                Affiliate Program page
              </Link>
              .
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
      <Divider />
    </>
  )
}
