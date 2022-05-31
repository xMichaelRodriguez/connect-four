import React, { ReactNode, useState } from 'react';
import { User, AuthContext } from './AuthContext';
interface props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: props) => {
  const [state, setstate] = useState<User>({} as User);
  const [roomUsers, setRoomUsers] = useState<User[]>([]);
  const handleAuth = (user: User) => {
    setstate(user);
  };
  const handleSetUsers = (users: User[]) => {
    setRoomUsers([...users]);
  };

  return (
    <AuthContext.Provider
      value={{
        auth: state,
        handleSetAuth: handleAuth,
        users: roomUsers,
        handleSetUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
