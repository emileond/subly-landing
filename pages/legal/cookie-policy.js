import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import {
  Box,
  Heading,
  VStack,
  Text,
  List,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'

export default function CookiePolicy() {
  return (
    <Box>
      <Head>
        <title>Subly - Cookie Policy</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <VStack
        as="main"
        id="intro"
        maxW="3xl"
        minH="80vh"
        py={20}
        align="start"
        m="0 auto"
        spacing={8}
      >
        <Heading size="xl">Cookie policy</Heading>
        <Text fontSize="lg" lineHeight="9">
          This cookie policy (&#8220;Policy&#8221;) describes what cookies are
          and how and they&#8217;re being used by the{' '}
          <a href="https://subly.app">subly.app</a> website
          (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its
          related products and services (collectively, &#8220;Services&#8221;).
          This Policy is a legally binding agreement between you
          (&#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221;) and this
          Website operator (&#8220;Operator&#8221;, &#8220;we&#8221;,
          &#8220;us&#8221; or &#8220;our&#8221;). If you are entering into this
          agreement on behalf of a business or other legal entity, you represent
          that you have the authority to bind such entity to this agreement, in
          which case the terms &#8220;User&#8221;, &#8220;you&#8221; or
          &#8220;your&#8221; shall refer to such entity. If you do not have such
          authority, or if you do not agree with the terms of this agreement,
          you must not accept this agreement and may not access and use the
          Website and Services. You should read this Policy so you can
          understand the types of cookies we use, the information we collect
          using cookies and how that information is used. It also describes the
          choices available to you regarding accepting or declining the use of
          cookies.
        </Text>
        <Box>
          <Heading size="md" pb={4}>
            Table of contents
          </Heading>
          <List spacing={4} color="blue.600">
            <ListItem>
              <a href="#what-are-cookies">What are cookies?</a>
            </ListItem>
            <ListItem>
              <a href="#what-type-of-cookies-do-we-use">
                What type of cookies do we use?
              </a>
            </ListItem>
            <ListItem>
              <a href="#what-are-your-cookie-options">
                What are your cookie options?
              </a>
            </ListItem>
            <ListItem>
              <a href="#changes-and-amendments">Changes and amendments</a>
            </ListItem>
            <ListItem>
              <a href="#acceptance-of-this-policy">Acceptance of this policy</a>
            </ListItem>
            <ListItem>
              <a href="#contacting-us">Contacting us</a>
            </ListItem>
          </List>
        </Box>
        <Heading size="lg" id="what-are-cookies">
          What are cookies?
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          Cookies are small pieces of data stored in text files that are saved
          on your computer or other devices when websites are loaded in a
          browser. They are widely used to remember you and your preferences,
          either for a single visit (through a &#8220;session cookie&#8221;) or
          for multiple repeat visits (using a &#8220;persistent cookie&#8221;).
        </Text>
        <Text fontSize="lg" lineHeight="9">
          Session cookies are temporary cookies that are used during the course
          of your visit to the Website, and they expire when you close the web
          browser.
        </Text>
        <Text fontSize="lg" lineHeight="9">
          Persistent cookies are used to remember your preferences within our
          Website and remain on your desktop or mobile device even after you
          close your browser or restart your computer. They ensure a consistent
          and efficient experience for you while visiting the Website and
          Services.
        </Text>
        <Text fontSize="lg" lineHeight="9">
          Cookies may be set by the Website (&#8220;first-party cookies&#8221;),
          or by third parties, such as those who serve content or provide
          advertising or analytics services on the Website (&#8220;third party
          cookies&#8221;). These third parties can recognize you when you visit
          our website and also when you visit certain other websites.
        </Text>
        <Heading size="lg" id="what-type-of-cookies-do-we-use">
          What type of cookies do we use?
        </Heading>
        <Heading size="md">Functionality cookies</Heading>
        <Text fontSize="lg" lineHeight="9">
          Functionality cookies let us operate the Website and Services in
          accordance with the choices you make. For example, we will recognize
          your username and remember how you customized the Website and Services
          during future visits.
        </Text>
        <Heading size="md">Analytical cookies</Heading>
        <Text fontSize="lg" lineHeight="9">
          These cookies enable us and third party services to collect aggregated
          data for statistical purposes on how our visitors use the Website.
          These cookies do not contain personal information such as names and
          email addresses and are used to help us improve your user experience
          of the Website.
        </Text>
        <Heading size="md">Social media cookies</Heading>
        <Text fontSize="lg" lineHeight="9">
          Third party cookies from social media sites (such as Facebook,
          Twitter, etc) let us track social network users when they visit or use
          the Website and Services, or share content, by using a tagging
          mechanism provided by those social networks.
        </Text>
        <Text fontSize="lg" lineHeight="9">
          These cookies are also used for event tracking and remarketing
          purposes. Any data collected with these tags will be used in
          accordance with our and social networks&#8217; privacy policies. We
          will not collect or share any personally identifiable information from
          the user.
        </Text>
        <Heading size="lg" id="what-are-your-cookie-options">
          What are your cookie options?
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          If you don&#8217;t like the idea of cookies or certain types of
          cookies, you can change your browser&#8217;s settings to delete
          cookies that have already been set and to not accept new cookies.
          Visit{' '}
          <a
            href="https://www.internetcookies.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            internetcookies.com
          </a>{' '}
          to learn more about how to do this.
        </Text>
        <Heading size="lg" id="changes-and-amendments">
          Changes and amendments
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          We reserve the right to modify this Policy or its terms related to the
          Website and Services at any time at our discretion. When we do, we
          will revise the updated date at the bottom of this page, send you an
          email to notify you. We may also provide notice to you in other ways
          at our discretion, such as through the contact information you have
          provided.
        </Text>
        <Text fontSize="lg" lineHeight="9">
          An updated version of this Policy will be effective immediately upon
          the posting of the revised Policy unless otherwise specified. Your
          continued use of the Website and Services after the effective date of
          the revised Policy (or such other act specified at that time) will
          constitute your consent to those changes.
        </Text>
        <Heading size="lg" id="acceptance-of-this-policy">
          Acceptance of this policy
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          You acknowledge that you have read this Policy and agree to all its
          terms and conditions. By accessing and using the Website and Services
          you agree to be bound by this Policy. If you do not agree to abide by
          the terms of this Policy, you are not authorized to access or use the
          Website and Services.
        </Text>
        <Heading size="lg" id="contacting-us">
          Contacting us
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          If you have any questions, concerns, or complaints regarding this
          Policy or the use of cookies, we encourage you to contact us using the
          details below:
        </Text>
        <Text fontSize="lg" lineHeight="9">
          <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;h&#101;ll&#111;&#64;&#115;ub&#108;&#121;&#46;&#97;p&#112;">
            h&#101;l&#108;o&#64;&#115;&#117;&#98;l&#121;.&#97;p&#112;
          </a>
        </Text>
        <Text>This document was last updated on October 10, 2022</Text>
      </VStack>
      <Footer />
    </Box>
  )
}
