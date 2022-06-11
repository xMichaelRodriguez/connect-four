import React, { useContext } from 'react';

import { AuthContext, User } from '../../../context/AuthContext';
import { UserBoxLeft } from './UserBoxLeft';
import { UserBoxRight } from './UserBoxRight';

interface Props {
  user: User;
}

export const ShowBoxPosition = ({ user }: Props) => {
  const { auth } = useContext(AuthContext);

  if (user.id === auth.id) {
    return <UserBoxLeft user={user} />;
  }

  return <UserBoxRight user={user} />;
};
