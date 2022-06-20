import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: '\'Open Sans\', sans-serif',
    body: '\'Open Sans\', sans-serif',
  },

});

export default theme;
