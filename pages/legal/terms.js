import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import { Box, Heading, VStack, Text, List, ListItem } from '@chakra-ui/react'

export default function Terms() {
  return (
    <Box>
      <Head>
        <title>Subly - Terms of service</title>
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
        <Heading size="lg">Subly Financial, Inc. Terms of Service</Heading>
        <p>
          These Terms of Service govern your use of the website located at{' '}
          <a href="https://subly.app">https://subly.app</a> and any related
          services provided by Subly Financial, Inc..
        </p>
        <p>
          By accessing <a href="https://subly.app">https://subly.app</a>, you
          agree to abide by these Terms of Service and to comply with all
          applicable laws and regulations. If you do not agree with these Terms
          of Service, you are prohibited from using or accessing this website or
          using any other services provided by Subly Financial, Inc..
        </p>
        <p>
          We, Subly Financial, Inc., reserve the right to review and amend any
          of these Terms of Service at our sole discretion. Upon doing so, we
          will update this page. Any changes to these Terms of Service will take
          effect immediately from the date of publication.
        </p>
        <p>These Terms of Service were last updated on 16 October 2023.</p>
        <Heading size="md">Limitations of Use</Heading>
        <p>
          By using this website, you warrant on behalf of yourself, your users,
          and other parties you represent that you will not:
        </p>
        <ul>
          <li>
            modify, copy, prepare derivative works of, decompile, or reverse
            engineer any materials and software contained on this website;
          </li>
          <li>
            remove any copyright or other proprietary notations from any
            materials and software on this website;
          </li>
          <li>
            transfer the materials to another person or &quot;mirror&quot; the
            materials on any other server;
          </li>
          <li>
            knowingly or negligently use this website or any of its associated
            services in a way that abuses or disrupts our networks or any other
            service Subly Financial, Inc. provides;
          </li>
          <li>
            use this website or its associated services to transmit or publish
            any harassing, indecent, obscene, fraudulent, or unlawful material;
          </li>
          <li>
            use this website or its associated services in violation of any
            applicable laws or regulations;
          </li>
          <li>
            use this website in conjunction with sending unauthorized
            advertising or spam;
          </li>
          <li>
            harvest, collect, or gather user data without the user’s consent; or
          </li>
          <li>
            use this website or its associated services in such a way that may
            infringe the privacy, intellectual property rights, or other rights
            of third parties.
          </li>
        </ul>
        <Heading size="md">Intellectual Property</Heading>
        <p>
          The intellectual property in the materials contained in this website
          are owned by or licensed to Subly Financial, Inc. and are protected by
          applicable copyright and trademark law. We grant our users permission
          to download one copy of the materials for personal, non-commercial
          transitory use.
        </p>
        <p>
          This constitutes the grant of a license, not a transfer of title. This
          license shall automatically terminate if you violate any of these
          restrictions or the Terms of Service, and may be terminated by Subly
          Financial, Inc. at any time.
        </p>
        <Heading size="md">Liability</Heading>
        <p>
          Our website and the materials on our website are provided on an
          &apos;as is&apos; basis. To the extent permitted by law, Subly
          Financial, Inc. makes no warranties, expressed or implied, and hereby
          disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property, or other violation of rights.
        </p>
        <p>
          In no event shall Subly Financial, Inc. or its suppliers be liable for
          any consequential loss suffered or incurred by you or any third party
          arising from the use or inability to use this website or the materials
          on this website, even if Subly Financial, Inc. or an authorized
          representative has been notified, orally or in writing, of the
          possibility of such damage.
        </p>
        <p>
          In the context of this agreement, &quot;consequential loss&quot;
          includes any consequential loss, indirect loss, real or anticipated
          loss of profit, loss of benefit, loss of revenue, loss of business,
          loss of goodwill, loss of opportunity, loss of savings, loss of
          reputation, loss of use and/or loss or corruption of data, whether
          under statute, contract, equity, tort (including negligence),
          indemnity or otherwise.
        </p>
        <p>
          Because some jurisdictions do not allow limitations on implied
          warranties, or limitations of liability for consequential or
          incidental damages, these limitations may not apply to you.
        </p>
        <Heading size="md">Accuracy of Materials</Heading>
        <p>
          The materials appearing on our website are not comprehensive and are
          for general information purposes only. Subly Financial, Inc. does not
          warrant or make any representations concerning the accuracy, likely
          results, or reliability of the use of the materials on this website,
          or otherwise relating to such materials or on any resources linked to
          this website.
        </p>
        <Heading size="md">Links</Heading>
        <p>
          Subly Financial, Inc. has not reviewed all of the sites linked to its
          website and is not responsible for the contents of any such linked
          site. The inclusion of any link does not imply endorsement, approval
          or control by Subly Financial, Inc. of the site. Use of any such
          linked site is at your own risk and we strongly advise you make your
          own investigations with respect to the suitability of those sites.
        </p>
        <Heading size="md">Right to Terminate</Heading>
        <p>
          We may suspend or terminate your right to use our website and
          terminate these Terms of Service immediately upon written notice to
          you for any breach of these Terms of Service.
        </p>
        <Heading size="md">Severance</Heading>
        <p>
          Any term of these Terms of Service which is wholly or partially void
          or unenforceable is severed to the extent that it is void or
          unenforceable. The validity of the remainder of these Terms of Service
          is not affected.
        </p>
        <Heading size="md">Governing Law</Heading>
        <p>
          These Terms of Service are governed by and construed in accordance
          with the laws of Delaware. You irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </p>
      </VStack>
      <Footer />
    </Box>
  )
}
