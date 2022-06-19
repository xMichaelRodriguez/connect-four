import { createContext } from 'react';
import { IAuth, IAuthState } from '../interfaces';

type IAuthStateProps = {
  authState: IAuthState;
  setLogin: (user: IAuth) => void;
  setPlayers: (players: IAuth[]) => void;
};
export const AuthContext = createContext<IAuthStateProps>({} as IAuthStateProps);
