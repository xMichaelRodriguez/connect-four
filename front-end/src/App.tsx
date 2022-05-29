import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigation } from './routes/Navigation';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Router>
          <Navigation />
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
