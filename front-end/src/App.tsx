import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigation } from './routes/Navigation';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme/theme';
function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Navigation />
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
