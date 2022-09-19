import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import FeatureBig from '../components/FeatureBig'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Pricing from '../components/Pricing'
import { Box } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box maxW="100vw">
      <Head>
        <title>Subly - Subscriptions Tracker</title>
        <meta
          name="description"
          content="Subly brings all your subscriptions in a single place so you never lose track of what you're paying for."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Hero />
      <FeatureBig
        img="features1"
        width={['100%', '80%', '70%', '65%']}
        id="features"
        heading="Keep track of all your subscriptions"
        desc="Subly brings all your subscriptions together in a single place so you never lose track of what you're paying for."
      />
      <FeatureBig
        img="insights"
        width={['100%', '100%', '80%', '80%']}
        heading="Get insights of your costs"
        desc="Get reports of your subscriptions to see were you are spending the most and how to improve."
        inverted
      />
      <CTA />
      <FeatureBig
        img="features3"
        width={['100%', '100%', '90%', '90%']}
        heading="Never pay for an unwanted subscription again"
        desc="Subly will remind you of upcoming payments before they hit your card so you're never caught off guard."
      />
      <FeatureBig
        img="features4"
        width={['100%', '100%', '80%', '80%']}
        heading="Smart Recommendations"
        desc="Subly provides alternatives to the services you're using, so you can determine if you're using the right solution or if there are better options."
        inverted
      />
      <Pricing />
      <FAQ />
      <Footer />
    </Box>
  )
}
