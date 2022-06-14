import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { socket } from '../../../lib/sockets';

export const TotalUsers = () => {
  const [totalUser, setTotalUser] = useState(0);
  useEffect(() => {
    socket.on('updateUserActive', (data: number) => {
      setTotalUser(data);
    });
  }, [totalUser]);

  return (
    <Text fontSize={'lg'} color='cyan '>
      Total Users: {totalUser}
    </Text>
  );
};
