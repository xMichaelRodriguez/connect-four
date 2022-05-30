import React, { ReactNode, useState } from 'react';
import { User, AuthContext } from './AuthContext';
interface props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: props) => {
  const [state, setstate] = useState<User>({} as User);

  const handleAuth = (user: User) => {
    setstate(user);
  };

  return (
    <AuthContext.Provider
      value={{
        auth: state,
        handleSetAuth: handleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
