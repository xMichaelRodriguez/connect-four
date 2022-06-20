import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { authState, setLogin, setPlayers } = useContext(AuthContext);

  return {
    setLogin,
    setPlayers,
    authState,
  };
};
