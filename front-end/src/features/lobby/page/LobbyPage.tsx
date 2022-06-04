import React, { useContext } from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react';

import { ContainerComponent } from '../../../components/ContainerComponent';
import { AuthContext, User } from '../../../context/AuthContext';
import { UserBoxLeft } from '../components/UserBoxLeft';
import { UserBoxRight } from '../components/UserBoxRight';

export const LobbyPage = () => {
  const { users, auth } = useContext(AuthContext);

  const handleEntryGame = () => {
    console.log('entry game');
  };
  return (
    <ContainerComponent>
      <Flex mb={3} w={'100%'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
        {users.map((user: User) => {
          return user.id === auth.id ? <UserBoxLeft user={user} /> : <UserBoxRight user={user} />;
        })}
      </Flex>
      <Stack  spacing={4}>
        <Button variant={'solid'} colorScheme='cyan' onClick={handleEntryGame}>
          Entry Game
        </Button>
      </Stack>
    </ContainerComponent>
  );
};
