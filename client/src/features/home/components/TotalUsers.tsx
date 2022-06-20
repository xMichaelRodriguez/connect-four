import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';
import { socket } from '../../../lib/sockets';

export function TotalUsers() {
  const [totalUser, setTotalUser] = useState(0);
  useEffect(() => {
    socket.on('updateUserActive', (data: number) => {
      setTotalUser(data);
    });
    return () => {
      socket.off('updateUserActive');
    };
  }, [totalUser]);

  return (
    <FaceUpAnimateComponent>
      <Text fontSize="lg" color="cyan ">
        Total Users:
        {' '}
        {totalUser}
      </Text>
    </FaceUpAnimateComponent>
  );
}
