import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Navigation } from './routes/Navigation';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme/theme';
import { GameProvider } from './features/game/context/GameProvider';
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
