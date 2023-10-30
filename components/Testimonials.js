import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    name: 'Katharina Tolle',
    company: 'Birth story writer',
    quote: `"**Subly changed my life.** No need any more to update excel sheets to find out where my money is flowing. I used Subly for my company at first, but now I use it for our family too.  \n\nIt is a great tool to find and cut unnecessary expenses."`,
    url: 'geburtsgeschichte.de/birthstory/',
    logo: '/testimonials/logos/katharina-tolle.png',
  },
  {
    name: 'Sharon Wingron, CPTD',
    company: 'DISC Learning Solutions',
    quote: `"Subly is an excellent tool that helps us **manage our bottom line**. As a small business, it is easy to lose control of your subscription-based expenses. Subly keeps them organized and notifies us of pending renewals so we stay in control!"`,
    url: 'disclearningsolutions.com',
    logo: '/testimonials/logos/disc.png',
  },
  {
    name: 'Justin Herring',
    company: 'YEAH! Local',
    quote: `"Managing subscriptions in our digital marketing agency was quite the juggling act until Subly came into the picture. Now, it's like having an **extra set of eyes** on our recurring expenses, all neatly displayed on a user-friendly dashboard."`,
    url: 'yeah-local.com',
    logo: '/testimonials/logos/yeah-local.png',
  },
  {
    name: 'Devender Gard',
    company: 'RankNRIse',
    quote: `"Subly revolutionized how I manage all the SEO tools and services we have. It's now all organized in one spot. It's **like having my own assistant**, ensuring no more lapsed subscriptions or surprise bills."`,
    url: 'ranknrise.com',
    logo: '/testimonials/logos/rnr.png',
  },
  {
    name: 'Frederic Kulas',
    company: 'KLS-Concept',
    quote: `"**I love Subly**. It's essential for tracking both my personal subscriptions and, more importantly, those of my customers who've opted for our offers. Subly reminds me to invoice on time, helping me monitor my recurring expenses and oversee my revenue growth."`,
    url: 'kls-concept.com',
    logo: '/testimonials/logos/kls.png',
  },
  // {
  //   name: 'Nickolas Kennedy',
  //   company: '',
  //   quote: `"Subly has the best subscription service for something as simple as cataloging software, URL Links, freebies, and notes. Nothing compares to its flexibility and simplicity, and I don’t even use half the features or automations. \n\nI would die without Subly. **It’s my GoTo software every day**."`,
  //   url: '#',
  // },
  {
    name: 'Boštjan Klajnščak, CEO',
    company: 'Creeper SEO Audit',
    quote: `"**Subly is a game-changer** for subscription management. Its intuitive interface allows us to dive deep or get an overview, all in one hub. It's become essential, delivering significant cost savings. Highly recommended!"`,
    url: 'creeperseoaudit.com',
    logo: '/testimonials/logos/creeper.png',
  },
  {
    name: 'Kevin Rodrigues',
    company: 'Solopreneur',
    quote: `"Subly has helped me **stop paying for subscriptions I don't need** anymore or decide if I still want to keep them. \n\nIf forgotten recurring subscriptions are draining your wallet, Subly is your go-to solution."`,
    url: 'kevinrod.com',
    logo: '/testimonials/logos/kr.png',
  },
  {
    name: 'Saikat Pyne',
    company: 'Thrifty Titans',
    quote: `"Thanks to Subly, I've **managed my expenses effectively**, allowing me to build one of India's fastest-growing business podcasts. \n\nHighly recommended!"`,
    url: 'thriftytitans.co',
    logo: '/testimonials/logos/tt.png',
  },
  {
    name: 'Jeff Mankini',
    company: 'UpClick Digital',
    quote: `"**Subly is INCREDIBLE!** Not only has it improved tracking for our recurring subscriptions and other costs, but we’re able to utilize it with and for our clients as well. Expenses, billables, recurring… you name it, we’re tracking it in Subly. Truly a game changer!"`,
    url: 'upclickdigital.com',
    logo: '/testimonials/logos/upclick.png',
  },
  {
    name: 'Sue McLachlan',
    company: 'The Unicorn Advisory',
    quote: `"Not only does Subly allow me to **see all my subscriptions at a glance**, It even tracks which card is billed – super helpful for card replacements. \n\nIt was eye opening how much all those subscriptions added up to and gave me insight into what I could drop saving me hundreds of dollars. Love this tool!"`,
    url: 'theunicornadvisory.com',
    logo: '/testimonials/logos/unicornadvisory.png',
  },
  {
    name: 'Luis Porras',
    company: 'Freelance Digital Consultant',
    quote: `"Subly has been a **true game-changer** for managing my subscriptions. I use it both for professional and personal recurring payments and it has saved my ass countless times by reminding me of unwanted renewals. \n\nIt's a real money-saver, and I couldn't be happier with it."`,
    url: 'luispw.es',
    logo: '/testimonials/logos/lpw.png',
  },
  {
    name: 'Andreas Hansen, Owner',
    company: 'Mind Now',
    quote: `"Subly delivers an exceptional **panoramic view of all our recurring payments**, simplifying budget management. \n\nIts user-friendly interface and insightful tracking make managing subscriptions and keeping track of expenses a breeze!"`,
    url: 'mindnow.dk',
    logo: '/testimonials/logos/mindnow.png',
  },
  {
    name: 'Futch, Partner',
    company: 'LEVELS',
    quote: `"I'm on two missions: Teaching Music Production and destroying the Subscription Model. Until the latter inevitably happens, I've been using Subly to guard against my wretched subscriptions. \n\nSubly notifies me of any upcoming monthly and yearly charges, letting me decide if they're worth the cost.  My worst nightmare is that I've been dead for 6 months and I'm still paying for Netflix."`,
    url: 'levelsmusicproduction.com',
    logo: '/testimonials/logos/levels.png',
  },
  {
    name: 'Josh Leier',
    company: 'IceHound Marketing',
    quote: `"I love Subly. With its reports, I can see all my subscriptions and payments at a glance. \n\nIt notifies me when a payment is upcoming so **I never have to worry about missing a bill payment again**, so I'm always in control of both my business and personal expenses."`,
    url: 'icehoundmarketing.com',
    logo: '/testimonials/logos/icehound.png',
  },
]

const Testimonials = () => {
  const [shuffledTestimonials, setShuffledTestimonials] = useState([])
  const [displayCount, setDisplayCount] = useState(6)

  useEffect(() => {
    const shuffled = [...testimonials]
    shuffleArray(shuffled)
    setShuffledTestimonials(shuffled)
  }, [])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  return (
    <Container id="testimonials" maxW="container.xl" py={20}>
      <Heading as="h2" size="xl" textAlign="center" mb={8}>
        Hear from our customers
      </Heading>
      <Text fontSize="lg" textAlign="center" mb={16}>
        Subly is trusted by thousands of businesses, freelancers, and
        solopreneurs worldwide.
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {shuffledTestimonials.slice(0, displayCount).map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </SimpleGrid>
      {displayCount < testimonials.length && (
        <VStack>
          <Button
            variant="outline"
            colorScheme="brand"
            size="lg"
            mt={5}
            onClick={() => setDisplayCount(testimonials.length)}
          >
            See More
          </Button>
        </VStack>
      )}
    </Container>
  )
}

export default Testimonials
