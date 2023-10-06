import { extendTheme } from '@chakra-ui/react'
import { withProse } from '@nikolovlazar/chakra-ui-prose'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const styles = {
  global: {
    // styles for the `body`
    body: {
      color: 'gray.800',
    },
    // styles for the `a`
    a: {
      color: 'blue.500',
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
}

const theme = extendTheme({ config, styles }, withProse())

export default theme
