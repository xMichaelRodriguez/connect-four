import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Navigation } from './routes/Navigation';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
