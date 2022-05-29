import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { socket } from '../../../lib/sockets';

export const TotalUsers = () => {
  const [totalUser, setTotalUser] = useState(0);
  useEffect(() => {
    socket.emit('message2');

    socket.on('users', (data) => {
      console.log(data);
    });
  }, []);

  return <Text fontSize={'lg'}>Total Users: {totalUser}</Text>;
};
