import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { socket } from '../../../lib/sockets';

export const TotalUsers = () => {
  const [totalUser, setTotalUser] = useState(0);
  useEffect(() => {
    socket.on('userCount', (data: number) => {
      setTotalUser(data);
    });
  }, [totalUser]);

  return <Text fontSize={'lg'}>Total Users: {totalUser}</Text>;
};