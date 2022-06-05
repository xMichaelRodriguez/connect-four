import React, { useContext } from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react';

import { AuthContext, User } from '../../../context/AuthContext';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { ShowBoxPosition } from '../components/ShowBoxPosition';
import { UserBoxLeft } from '../components/UserBoxLeft';

export const LobbyPage = () => {
  const { users, auth } = useContext(AuthContext);

  const handleEntryGame = () => {
    console.log('entry game');
    const data = users.map((user) => ({ user: user.id, auth: auth.id }));
    console.log(data);
  };
  return (
    <ContainerComponent>
      <Flex mb={3} w={'100%'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
        {users.map((user: User) => (
          
          <ShowBoxPosition user={user} key={user.id} />
        ))}
      </Flex>
      <Stack spacing={4}>
        <Button variant={'solid'} colorScheme='teal' onClick={handleEntryGame}>
          Entry Game
        </Button>
      </Stack>
    </ContainerComponent>
  );
};
