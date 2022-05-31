import { createContext } from 'react';

export type User = {
  id: string;
  userName: string;
  rank: number;
  room?: string;
  hasPlayed?: boolean;
};
export interface IAuthContextProps {
  auth: User;
  handleSetAuth: (user: User) => void;
  users: User[];
  handleSetUsers: (users: User[]) => void;
}

export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);
