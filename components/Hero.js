import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import { BiPlayCircle } from 'react-icons/bi'
const { motion } = require('framer-motion')

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
        width="42px"
        height="42px"
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
          src="./intercom.png"
          alt="Intercom icon"
          boxSize="40px"
          m="auto"
        />
      </MotionBox>
      <MotionBox
        display={['none', 'none', 'flex']}
        width="70px"
        height="70px"
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
          src="./mailchimp.png"
          alt="Mailchimp icon"
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
        width="52px"
        height="52px"
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
          boxSize="48px"
          m="auto"
        />
      </MotionBox>
      <MotionBox
        display={['none', 'none', 'flex']}
        width="80px"
        height="80px"
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
          src="./slack.png"
          alt="Slack icon"
          boxSize="60px"
          m="auto"
        />
      </MotionBox>
      <MotionBox
        display={['none', 'none', 'flex']}
        width="64px"
        height="64px"
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
          src="./github.png"
          alt="Hithub icon"
          boxSize="58px"
          m="auto"
        />
      </MotionBox>
      <VStack>
        <VStack spacing={6} py={20} textAlign="center">
          <Heading fontWeight={700} fontSize="6xl" zIndex={5}>
            End Subscription{' '}
            <Box
              as="span"
              bgGradient="linear-gradient(to right, #8E2DE2, #4A00E0)"
              bgClip="text"
            >
              Chaos.
            </Box>
          </Heading>
          <Text fontSize="xl" color={'gray.700'} maxW={'2xl'} zIndex={5}>
            Experience a new era of financial transparency for your business.
            <br /> Centralize, monitor, and optimize your subscriptions with
            ease.
          </Text>
          <HStack spacing={6} py={6}>
            <Button
              as="a"
              href="https://web.subly.app/signup"
              size="lg"
              rounded="full"
              colorScheme={'blue'}
              bg="#363636"
              _hover={{ bg: '#6F55FF' }}
            >
              Get started for free
            </Button>
            <Button
              variant="ghost"
              size="lg"
              rounded="full"
              leftIcon={<BiPlayCircle fontSize="1.4rem" />}
              onClick={onOpen}
            >
              Watch video
            </Button>
          </HStack>
        </VStack>
        <Image
          src="./dashboard.png"
          alt="Screenshot of Subly UI"
          maxW={['100%', '100%', '5xl']}
        />
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack>
              <iframe
                width="850"
                height="450"
                src="https://www.youtube.com/embed/aWUitoVAhxA?si=5YfmfgqplVVFDUyI&autoplay=1"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullscreen
              ></iframe>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}
