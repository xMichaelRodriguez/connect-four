import { useContext, useEffect } from 'react';
import { Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react';

import { ModalComponent } from '../../../components/ModalComponent';
import { AuthContext, User } from '../../../context/AuthContext';
import { ModalContext } from '../../../context/ModalContext';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { ShowBoxPosition } from '../components/ShowBoxPosition';
import { useHistory } from 'react-router-dom';
import { GameContext, Player } from '../../game/context/GameContext';
import { socket } from '../../../lib/sockets';

export const LobbyPage = () => {
  const {
    users,
    auth: { id },
  } = useContext(AuthContext);
  const { handlePassUsersToPlayer, updatePlayers } = useContext(GameContext);
  const { isOpen, onClose, onOpen } = useContext(ModalContext);

  const history = useHistory();

  const handleEntryGame = () => {
    onOpen();
    socket.emit('game:ready', id);
    socket.emit('current-user', id);
    const newPlayers: Player[] = users.map((user: User) => ({
      ...user,
      canPlay: false,
      color: '',
      token: 0,
    }));

    handlePassUsersToPlayer(newPlayers);
  };

  useEffect(() => {
    socket.on('game:updated-token-users', (data: Player[]) => {
      updatePlayers(data);
    });
  }, [updatePlayers]);

  useEffect(() => {
    socket.on('game:init', (data) => {
      if (data) {
        onClose();
        history.push('/game');
      }
    });
  }, [onClose]);
  return (
    <>
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
      <ModalComponent modalTitle='Starting game' onClose={onClose} isOpen={isOpen}>
        <Text>Waiting for opponent</Text>
        <Spinner color='teal' size={'md'} />
      </ModalComponent>
    </>
  );
};
