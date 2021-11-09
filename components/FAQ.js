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
} from '@chakra-ui/react'
import Link from 'next/link'

export default function FAQ() {
  return (
    <>
      <Container as="section" maxW="5xl" pt="4rem" pb={24} id="faq">
        <Heading py={12}>Frequently Asked Questions</Heading>
        <Accordion defaultIndex={[0]} allowMultiple>
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
                <Heading size="md" color="gray.700" py={2}>
                  Why Subly?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.700" borderBottomRadius={8}>
              Having gone through the frustration of forgetting about a
              subscription trial and having to pay for the full membership. I
              realized that a simple, practical software to track my
              subscriptions would be extremely useful. As a result, I came up
              with Subly. I hope you find it as useful as I do.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            mb={4}
            border="1px solid #eaeaea"
            borderRadius={8}
            data-aos="flip-down"
            data-aos-delay="100"
          >
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.700" py={2}>
                  Can I use Subly to track payments other than subscriptions?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.700">
              Absolutely. Subly can be used to track and manage any recurring
              payments.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            mb={4}
            border="1px solid #eaeaea"
            borderRadius={8}
            data-aos="flip-down"
            data-aos-delay="200"
          >
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.700" py={2}>
                  How many subscriptions can I track?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.700">
              The number of subscriptions you can track is unlimited.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            mb={4}
            border="1px solid #eaeaea"
            borderRadius={8}
            data-aos="flip-down"
            data-aos-delay="300"
          >
            <AccordionButton
              _expanded={{ borderBottomRadius: 0 }}
              _hover={{ bg: 'gray.50' }}
              borderRadius={8}
            >
              <Box flex="1" textAlign="left">
                <Heading size="md" color="gray.700" py={2}>
                  How can contribute to Subly?
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} color="gray.700">
              If you want to support the project, you can do so through our{' '}
              <Link href="https://www.buymeacoffee.com/emiliosanchez">
                <a target="_blank" rel="noopener">
                  Buy me a coffe page
                </a>
              </Link>
              , where you can make a one-time donation or set up recurring
              payments. If you have tech skills and would like to contribute to
              Subly, please contact us via the app&apos;s Send feedback form.
              Another way to help Subly is to spread the word about it.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
      <Divider />
    </>
  )
}
