import { ReactNode, useReducer, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './reducers/authReducer';
import { IAuth, IAuthState } from '../interfaces';

interface props {
  children: ReactNode;
}

export const INITIAL_STATE: IAuthState = {
  auth: {} as IAuth,
  players: [],
};

export function AuthProvider({ children }: props) {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const setLogin = (user: IAuth) => {
    dispatch({ type: 'AUTH_LOGIN', payload: user });
  };
  const setPlayers = (players: IAuth[]) => {
    dispatch({ type: 'SET_PLAYERS', payload: players });
  };
  const defaultValue = {
    authState,
    setLogin,
    setPlayers,
  };

  const defaultProps = useMemo(() => defaultValue, [setLogin, setPlayers]);
  return <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>;
}
