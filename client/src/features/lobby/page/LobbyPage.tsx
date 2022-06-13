import React, { useContext, useEffect } from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react';

import { AuthContext, User } from '../../../context/AuthContext';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { ShowBoxPosition } from '../components/ShowBoxPosition';
import { useHistory } from 'react-router-dom';
import { GameContext, Player } from '../../game/context/GameContext';
import { socket } from '../../../lib/sockets';

export const LobbyPage = () => {
  const { users } = useContext(AuthContext);
  const { handlePassUsersToPlayer, updatePlayers } = useContext(GameContext);
  const history = useHistory();

  const handleEntryGame = () => {
   
    const newPlayers: Player[] = users.map((user: User) => ({
      ...user,
      canPlay: false,
      color: '',
      token: 0,
    }));

    handlePassUsersToPlayer(newPlayers);
    // history.push('/game');
  };

  useEffect(() => {
    socket.on('game:updated-token-users', (data: Player[]) => {
      console.log(data);
      updatePlayers(data);
    });
  }, []);

  return (
    <ContainerComponent>
      <Flex mb={3} w={'100%'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
        {users.map((user: User) => (
          <ShowBoxPosition user={user} key={user.id} />
        ))}
      </Flex>
      <Stack spacing={4} mt={3}>
        <Button variant={'solid'} colorScheme='teal' onClick={handleEntryGame}>
          Entry Game
        </Button>
      </Stack>
    </ContainerComponent>
  );
};
