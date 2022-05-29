import { createContext } from 'react';

export type User = {
  id?: string;
  userName: string;
  rank: number;
  room?: string;
};
export interface IAuthContextProps {
  auth: User;
  handleSetAuth: (user: User) => void;
}

export const AuthContext = createContext<IAuthContextProps>(
  {} as IAuthContextProps
);
