import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthProvider';

import { GameProvider } from './features/game/context/GameProvider';
import { Navigation } from './routes/Navigation';
import theme from './theme/theme';

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <Navigation />
          </Router>
        </ChakraProvider>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
