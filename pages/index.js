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
import FeaturesList from '../components/FeaturesList'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <Box>
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
        heading="Centralize your subscriptions"
        desc="Manage and organize every subscription across teams and projects in your business. Dive into the details or get a broad overview, all in one hub."
        maxW="380px"
        inverted
      />
      <FeatureBig
        img="insights"
        width={['100%', '100%', '80%', '80%']}
        heading="Get insights of your costs"
        desc="Dive deep into your spending patterns with detailed reports. Make informed decisions to optimize your expenses."
        maxW="500px"
      />
      <FeatureBig
        img="currencies"
        width={['100%', '100%', '80%', '80%']}
        maxW="550px"
        heading="Every currency, one dashboard"
        desc="Track and analyze expenses from any corner of the world, Subly manages currency conversions for you, and presents insights in your preferred currency."
        inverted
      />
      <CTA />
      <FeatureBig
        img="collab"
        width={['100%', '100%', '90%', '90%']}
        maxW="300px"
        heading="Collaborate with financial clarity"
        desc="Working with finances is easier when everyone's in the loop. Share and discuss your spending, subscriptions, and plans clearly and simply. Making decisions faster and with confidence."
        inverted
      />
      <FeatureBig
        img="features3"
        width={['100%', '100%', '90%', '90%']}
        maxW="500px"
        heading="No more unexpected charges"
        desc="Eliminate surprises with renewal alerts. Stay ahead of every charge and make timely decisions."
      />
      <FeaturesList />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </Box>
  )
}
