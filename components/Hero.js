import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
const { motion } = require('framer-motion')

export default function Hero() {
  const MotionBox = motion(Box)
  return (
    <Container maxW="100%" pos="relative" pt={{ base: 0, md: 10 }}>
      <MotionBox
        width="120px"
        height="120px"
        top="10%"
        left="5%"
        pos="absolute"
        animate={{ rotate: [0, 360] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 12 }}
        _before={{
          borderRadius: '50%',
          width: '8px',
          height: '8px',
          background: '#fac3ff',
          top: '0%',
          left: '50%',
          content: '""',
          position: 'absolute',
        }}
      />
      <MotionBox
        width="160px"
        height="160px"
        top="25%"
        left="25%"
        pos="absolute"
        animate={{ rotate: [0, 360] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 17 }}
        _before={{
          borderRadius: '50%',
          width: '10px',
          height: '10px',
          background: '#8fe9e0',
          top: '50%',
          right: '100%',
          content: '""',
          position: 'absolute',
        }}
      />
      <MotionBox
        width="120px"
        height="120px"
        top="35%"
        left="10%"
        pos="absolute"
        animate={{ rotate: [0, 360] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 12 }}
        _before={{
          borderRadius: '50%',
          width: '6px',
          height: '6px',
          background: '#ffd5ad',
          bottom: '0',
          left: '0%',
          content: '""',
          position: 'absolute',
        }}
      />
      <MotionBox
        width="120px"
        height="120px"
        top="10%"
        right="4%"
        pos="absolute"
        animate={{ rotate: [0, 360] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 12 }}
        _before={{
          borderRadius: '50%',
          width: '6px',
          height: '6px',
          background: '#8fe9e1',
          top: '0',
          left: '50%',
          content: '""',
          position: 'absolute',
        }}
      />
      <MotionBox
        width="160px"
        height="160px"
        top="20%"
        right="15%"
        pos="absolute"
        animate={{ rotate: [0, 360] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 17 }}
        _before={{
          borderRadius: '50%',
          width: '10px',
          height: '10px',
          background: '#ffd5ad',
          top: '50%',
          right: '100%',
          content: '""',
          position: 'absolute',
        }}
      />
      <MotionBox
        width="120px"
        height="120px"
        top="40%"
        right="10%"
        pos="absolute"
        animate={{ rotate: [0, 360] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 12 }}
        _before={{
          borderRadius: '50%',
          width: '10px',
          height: '10px',
          background: '#fac3ff',
          bottom: '0',
          left: '50%',
          content: '""',
          position: 'absolute',
        }}
      />
      <MotionBox
        display={['none', 'none', 'flex']}
        width="58px"
        height="58px"
        top="10%"
        left="17%"
        pos="absolute"
        borderRadius="50%"
        boxShadow="0 20px 50px rgba(31, 36, 44, 8%)"
        animate={{ y: [0, 20, 0] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 3.5 }}
      >
        <Image
          borderRadius="full"
          src="./spotify.png"
          alt="Spotify icon"
          boxSize="38px"
          m="auto"
        />
      </MotionBox>
      <MotionBox
        display={['none', 'none', 'flex']}
        width="90px"
        height="90px"
        top="22%"
        left="10%"
        pos="absolute"
        borderRadius="50%"
        boxShadow="0 20px 50px rgba(31, 36, 44, 8%)"
        animate={{ y: [0, 25, 0] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 4 }}
      >
        <Image
          borderRadius="full"
          src="./netflix.png"
          alt="Netflix icon"
          boxSize="64px"
          m="auto"
        />
      </MotionBox>
      <MotionBox
        display={['none', 'none', 'flex']}
        width="70px"
        height="70px"
        top="33%"
        left="25%"
        pos="absolute"
        borderRadius="50%"
        boxShadow="0 20px 50px rgba(31, 36, 44, 8%)"
        animate={{ y: [25, 0, 25] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 3.4 }}
      >
        <Image
          borderRadius="full"
          src="./gsuite.png"
          alt="Google icon"
          boxSize="42px"
          m="auto"
        />
      </MotionBox>
      <MotionBox
        display={['none', 'none', 'flex']}
        width="58px"
        height="58px"
        top="6%"
        right="15%"
        pos="absolute"
        borderRadius="50%"
        boxShadow="0 20px 50px rgba(31, 36, 44, 8%)"
        animate={{ y: [20, 0, 20] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 3.4 }}
      >
        <Image
          borderRadius="full"
          src="./dropbox.png"
          alt="Dropbx icon"
          boxSize="42px"
          m="auto"
        />
      </MotionBox>
      <MotionBox
        display={['none', 'none', 'flex']}
        width="90px"
        height="90px"
        top="22%"
        right="8%"
        pos="absolute"
        borderRadius="50%"
        boxShadow="0 20px 50px rgba(31, 36, 44, 8%)"
        animate={{ y: [28, 0, 28] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 3.8 }}
      >
        <Image
          borderRadius="full"
          src="./hulu.png"
          alt="Hulu icon"
          boxSize="78px"
          m="auto"
        />
      </MotionBox>
      <MotionBox
        display={['none', 'none', 'flex']}
        width="70px"
        height="70px"
        top="35%"
        right="20%"
        pos="absolute"
        borderRadius="50%"
        boxShadow="0 20px 50px rgba(31, 36, 44, 8%)"
        animate={{ y: [0, 20, 0] }}
        transition={{ ease: 'linear', loop: 'Infinity', duration: 3.5 }}
      >
        <Image
          borderRadius="full"
          src="./primevideo.png"
          alt="Prime video icon"
          boxSize="58px"
          m="auto"
        />
      </MotionBox>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 40 }}
        pb={{ base: 20, md: 20 }}
      >
        <Heading fontWeight={700} fontSize="6xl" zIndex={5} data-aos="fade-up">
          All your subscriptions in one place
        </Heading>
        <Text
          fontSize="xl"
          color={'gray.700'}
          maxW={'3xl'}
          zIndex={5}
          data-aos="fade-up"
        >
          Subly helps you take control over your subscriptions.
        </Text>
        <Stack
          spacing={6}
          direction={'row'}
          align="center"
          pb={{ base: 8, md: 32 }}
        >
          <Button
            data-aos="fade-up"
            as="a"
            href="https://web.subly.app/signup"
            size="lg"
            rounded={'full'}
            px={6}
            colorScheme={'blue'}
            bg={'#6F55FF'}
            _hover={{ bg: '#5842d8' }}
          >
            Get started for free
          </Button>
          <Button
            as="a"
            size="lg"
            href="#features"
            rounded={'full'}
            px={6}
            data-aos="fade-up"
          >
            Learn more
          </Button>
        </Stack>
        {/* <Flex w={'full'}> */}
        <Box data-aos="zoom-out-up" data-aos-delay="500">
          <Image
            src="./main.png"
            alt="Screenshot of Subly UI"
            maxW={['100%', '100%', '4xl']}
          />
        </Box>
        {/* </Flex> */}
      </Stack>
    </Container>
  )
}
