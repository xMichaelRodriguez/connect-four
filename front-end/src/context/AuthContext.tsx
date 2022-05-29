import { createContext } from 'react';

export type User = {
  id: string;
  name: string;
  room?: string;
};
export interface IAuthContextProps {
  auth: User;
  handleSetAuth: (user: User) => void;
}

export const AuthContext = createContext<IAuthContextProps>(
  {} as IAuthContextProps
);
