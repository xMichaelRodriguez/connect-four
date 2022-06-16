import { ReactNode, useReducer } from 'react';
import { IAuth, IAuthState } from '../interfaces';
import { AuthContext } from './AuthContext';
import { authReducer } from './reducers/authReducer';
interface props {
  children: ReactNode;
}

export const INITIAL_STATE: IAuthState = {
  auth: {} as IAuth,
  players: [],
};

export const AuthProvider = ({ children }: props) => {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const setLogin = (user: IAuth) => {
    dispatch({ type: 'AUTH_LOGIN', payload: user });
  };
  const setPlayers = (players: IAuth[]) => {
    dispatch({ type: 'SET_PLAYERS', payload: players });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setLogin,
        setPlayers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
