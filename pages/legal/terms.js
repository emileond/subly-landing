import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import { Box, Heading, VStack, Text, List, ListItem } from '@chakra-ui/react'

export default function Terms() {
  return (
    <Box>
      <Head>
        <title>Subly - Terms and conditions</title>
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
        <Heading size="xl">Terms and conditions</Heading>
        <Text fontSize="lg" lineHeight="9">
          These terms and conditions (&#8220;Agreement&#8221;) set forth the
          general terms and conditions of your use of the{' '}
          <a href="https://subly.app">subly.app</a> website
          (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its
          related products and services (collectively, &#8220;Services&#8221;).
          This Agreement is legally binding between you (&#8220;User&#8221;,
          &#8220;you&#8221; or &#8220;your&#8221;) and this Website operator
          (&#8220;Operator&#8221;, &#8220;we&#8221;, &#8220;us&#8221; or
          &#8220;our&#8221;). If you are entering into this agreement on behalf
          of a business or other legal entity, you represent that you have the
          authority to bind such entity to this agreement, in which case the
          terms &#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221;
          shall refer to such entity. If you do not have such authority, or if
          you do not agree with the terms of this agreement, you must not accept
          this agreement and may not access and use the Website and Services. By
          accessing and using the Website and Services, you acknowledge that you
          have read, understood, and agree to be bound by the terms of this
          Agreement. You acknowledge that this Agreement is a contract between
          you and the Operator, even though it is electronic and is not
          physically signed by you, and it governs your use of the Website and
          Services.
        </Text>
        <VStack spacing={6}>
          <Heading size="md">Table of contents</Heading>
          <List color="blue.600" spacing={4} fontSize="md">
            <ListItem>
              <a href="#accounts-and-membership">Accounts and membership</a>
            </ListItem>
            <ListItem>
              <a href="#billing-and-payments">Billing and payments</a>
            </ListItem>
            <ListItem>
              <a href="#accuracy-of-information">Accuracy of information</a>
            </ListItem>
            <ListItem>
              <a href="#links-to-other-resources">Links to other resources</a>
            </ListItem>
            <ListItem>
              <a href="#limitation-of-liability">Limitation of liability</a>
            </ListItem>
            <ListItem>
              <a href="#changes-and-amendments">Changes and amendments</a>
            </ListItem>
            <ListItem>
              <a href="#acceptance-of-these-terms">Acceptance of these terms</a>
            </ListItem>
            <ListItem>
              <a href="#contacting-us">Contacting us</a>
            </ListItem>
          </List>
        </VStack>
        <Heading size="lg" id="accounts-and-membership">
          Accounts and membership
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          If you create an account on the Website, you are responsible for
          maintaining the security of your account and you are fully responsible
          for all activities that occur under the account and any other actions
          taken in connection with it. We may, but have no obligation to,
          monitor and review new accounts before you may sign in and start using
          the Services. Providing false contact information of any kind may
          result in the termination of your account. You must immediately notify
          us of any unauthorized uses of your account or any other breaches of
          security. We will not be liable for any acts or omissions by you,
          including any damages of any kind incurred as a result of such acts or
          omissions. We may suspend, disable, or delete your account (or any
          part thereof) if we determine that you have violated any provision of
          this Agreement or that your conduct or content would tend to damage
          our reputation and goodwill. If we delete your account for the
          foregoing reasons, you may not re-register for our Services. We may
          block your email address and Internet protocol address to prevent
          further registration.
        </Text>
        <Heading size="lg" id="billing-and-payments">
          Billing and payments
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          You shall pay all fees or charges to your account in accordance with
          the fees, charges, and billing terms in effect at the time a fee or
          charge is due and payable. Where Services are offered on a free trial
          basis, payment may be required after the free trial period ends, and
          not when you enter your billing details (which may be required prior
          to the commencement of the free trial period). If auto-renewal is
          enabled for the Services you have subscribed for, you will be charged
          automatically in accordance with the term you selected. If, in our
          judgment, your purchase constitutes a high-risk transaction, we will
          require you to provide us with a copy of your valid government-issued
          photo identification, and possibly a copy of a recent bank statement
          for the credit or debit card used for the purchase. We reserve the
          right to change products and product pricing at any time. We also
          reserve the right to refuse any order you place with us. We may, in
          our sole discretion, limit or cancel quantities purchased per person,
          per household or per order. These restrictions may include orders
          placed by or under the same customer account, the same credit card,
          and/or orders that use the same billing and/or shipping address. In
          the event that we make a change to or cancel an order, we may attempt
          to notify you by contacting the e-mail and/or billing address/phone
          number provided at the time the order was made.
        </Text>
        <Heading size="lg" id="accuracy-of-information">
          Accuracy of information
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          Occasionally there may be information on the Website that contains
          typographical errors, inaccuracies or omissions that may relate to
          pricing, promotions and offers. We reserve the right to correct any
          errors, inaccuracies or omissions, and to change or update information
          or cancel orders if any information on the Website or Services is
          inaccurate at any time without prior notice (including after you have
          submitted your order). We undertake no obligation to update, amend or
          clarify information on the Website including, without limitation,
          pricing information, except as required by law. No specified update or
          refresh date applied on the Website should be taken to indicate that
          all information on the Website or Services has been modified or
          updated.
        </Text>
        <Heading size="lg" id="links-to-other-resources">
          Links to other resources
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          Although the Website and Services may link to other resources (such as
          websites, mobile applications, etc.), we are not, directly or
          indirectly, implying any approval, association, sponsorship,
          endorsement, or affiliation with any linked resource, unless
          specifically stated herein. Some of the links on the Website may be
          &#8220;affiliate links&#8221;. This means if you click on the link and
          purchase an item, the Operator will receive an affiliate commission.
          We are not responsible for examining or evaluating, and we do not
          warrant the offerings of, any businesses or individuals or the content
          of their resources. We do not assume any responsibility or liability
          for the actions, products, services, and content of any other third
          parties. You should carefully review the legal statements and other
          conditions of use of any resource which you access through a link on
          the Website. Your linking to any other off-site resources is at your
          own risk.
        </Text>
        <Heading size="lg" id="limitation-of-liability">
          Limitation of liability
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          To the fullest extent permitted by applicable law, in no event will
          the Operator, its affiliates, directors, officers, employees, agents,
          suppliers or licensors be liable to any person for any indirect,
          incidental, special, punitive, cover or consequential damages
          (including, without limitation, damages for lost profits, revenue,
          sales, goodwill, use of content, impact on business, business
          interruption, loss of anticipated savings, loss of business
          opportunity) however caused, under any theory of liability, including,
          without limitation, contract, tort, warranty, breach of statutory
          duty, negligence or otherwise, even if the liable party has been
          advised as to the possibility of such damages or could have foreseen
          such damages. To the maximum extent permitted by applicable law, the
          aggregate liability of the Operator and its affiliates, officers,
          employees, agents, suppliers and licensors relating to the services
          will be limited to an amount no greater than one dollar or any amounts
          actually paid in cash by you to the Operator for the prior one month
          period prior to the first event or occurrence giving rise to such
          liability. The limitations and exclusions also apply if this remedy
          does not fully compensate you for any losses or fails of its essential
          purpose.
        </Text>
        <Heading size="lg" id="changes-and-amendments">
          Changes and amendments
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          We reserve the right to modify this Agreement or its terms related to
          the Website and Services at any time at our discretion. When we do, we
          will revise the updated date at the bottom of this page, send you an
          email to notify you. We may also provide notice to you in other ways
          at our discretion, such as through the contact information you have
          provided.
        </Text>
        <Text fontSize="lg" lineHeight="9">
          An updated version of this Agreement will be effective immediately
          upon the posting of the revised Agreement unless otherwise specified.
          Your continued use of the Website and Services after the effective
          date of the revised Agreement (or such other act specified at that
          time) will constitute your consent to those changes.
        </Text>
        <Heading size="lg" id="acceptance-of-these-terms">
          Acceptance of these terms
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          You acknowledge that you have read this Agreement and agree to all its
          terms and conditions. By accessing and using the Website and Services
          you agree to be bound by this Agreement. If you do not agree to abide
          by the terms of this Agreement, you are not authorized to access or
          use the Website and Services.
        </Text>
        <Heading size="lg" id="contacting-us">
          Contacting us
        </Heading>
        <Text fontSize="lg" lineHeight="9">
          If you have any questions, concerns, or complaints regarding this
          Agreement, we encourage you to contact us using the details below:
        </Text>
        <Text fontSize="lg" lineHeight="9">
          <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#104;ello&#64;su&#98;&#108;&#121;&#46;&#97;p&#112;">
            &#104;ello&#64;&#115;u&#98;ly&#46;ap&#112;
          </a>
        </Text>
        <Text>This document was last updated on October 10, 2022</Text>
      </VStack>
      <Footer />
    </Box>
  )
}
