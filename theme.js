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
  },
  baseStyle: {
    a: {
      color: 'blue.500',
      _hover: {
        textDecoration: 'underline',
      },
    },
    ul: {
      listStyle: 'none',
    },
  },
}

const theme = extendTheme({ config, styles }, withProse())

export default theme
