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
        <Heading size="lg">Subly Financial, Inc. Cookie Policy</Heading>
        <p>Effective Date: 16 October 2023</p>
        <p>
          We use cookies to help improve your experience of our website at{' '}
          <a href="https://subly.app">https://subly.app</a>. This cookie policy
          is part of Subly Financial, Inc.'s privacy policy. It covers the use
          of cookies between your device and our site.
        </p>
        <p>
          We also provide basic information on third-party services we may use,
          who may also use cookies as part of their service. This policy does
          not cover their cookies.
        </p>
        <p>
          If you don’t wish to accept cookies from us, you should instruct your
          browser to refuse cookies from{' '}
          <a href="https://subly.app">https://subly.app</a>. In such a case, we
          may be unable to provide you with some of your desired content and
          services.
        </p>
        <Heading size="md">What is a cookie?</Heading>
        <p>
          A cookie is a small piece of data that a website stores on your device
          when you visit. It typically contains information about the website
          itself, a unique identifier that allows the site to recognise your web
          browser when you return, additional data that serves the cookie’s
          purpose, and the lifespan of the cookie itself.
        </p>
        <p>
          Cookies are used to enable certain features (e.g. logging in), track
          site usage (e.g. analytics), store your user settings (e.g. time zone,
          notification preferences), and to personalize your content (e.g.
          advertising, language).
        </p>
        <p>
          Cookies set by the website you are visiting are usually referred to as
          first-party cookies. They typically only track your activity on that
          particular site.
        </p>
        <p>
          Cookies set by other sites and companies (i.e. third parties) are
          called third-party cookies They can be used to track you on other
          websites that use the same third-party service.
        </p>
        <Heading size="md">
          How Can You Control Our Website's Use of Cookies?
        </Heading>
        <p>
          You have the right to decide whether to accept or reject cookies on
          our Website. You can manage your cookie preferences in our Cookie
          Consent Manager. The Cookie Consent Manager allows you to select which
          categories of cookies you accept or reject. Essential cookies cannot
          be rejected as they are strictly necessary to provide you with the
          services on our Website.
        </p>
        <p>
          You may also be able to set or amend your cookie preferences by
          managing your web browser settings. As each web browser is different,
          please consult the instructions provided by your web browser
          (typically in the &quot;help&quot; section). If you choose to refuse
          or disable cookies you may still use the Website, though some of the
          functionality of the Website may not be available to you.
        </p>
        <Heading size="md">
          How Often Will We Update This Cookie Policy?
        </Heading>
        <p>
          We may update this Cookie Policy from time to time in order to reflect
          any changes to the cookies and related technologies we use, or for
          other operational, legal or regulatory reasons.
        </p>
        <p>
          Each time you use our Website, the current version of the Cookie
          Policy will apply. When you use our Website, you should check the date
          of this Cookie Policy (which appears at the top of this document) and
          review any changes since the last version.
        </p>
        <Heading size="md">Where Can You Obtain Further Information?</Heading>
        <p>
          For any questions or concerns regarding our Cookie Policy, you may
          contact us using the following details:
        </p>
        <p>
          Subly Help
          <br />
          hello@subly.app
        </p>
      </VStack>
      <Footer />
    </Box>
  )
}
