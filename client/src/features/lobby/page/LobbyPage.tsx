import { useEffect } from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

// custom hooks
import { useAuth } from '../../../hook/useAuth';
import { useGame } from '../../game/hooks/useGame';
import { useMyModal } from '../../../hook/useMyModal';

// interfaces
import { IAuth } from '../../../interfaces';
import { IGame } from '../../game/interface';

// utils and components
import { ContainerComponent } from '../../../components/ContainerComponent';
import { ShowBoxPosition } from '../components/ShowBoxPosition';
import { socket } from '../../../lib/sockets';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';

export const LobbyPage = () => {
  const { onClose } = useMyModal();
  const { handlePassUsersToPlayer, updatePlayers } = useGame();
  const { authState } = useAuth();
  const { auth, players } = authState;

  const history = useHistory();

  const handleEntryGame = () => {
    const newPlayers: IGame[] = players.map((user: IAuth) => ({
      ...user,

      color: '',
      token: 0,
    }));
    handlePassUsersToPlayer(newPlayers);
    
    socket.emit('game:initial-current-user', auth.id);
    socket.emit('game:ready', auth.id);
  };

  useEffect(() => {
    socket.on('game:updated-token-users', (data: IGame[]) => {
      updatePlayers(data);
    });
  }, [updatePlayers]);

  useEffect(() => {
    socket.on('game:init', (data) => {
      if (data) {
        history.push('/game');
      }
    });
  }, [onClose]);
  return (
    <>
      <ContainerComponent>
        <Flex mb={3} w={'100%'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
          {players.map((user: IAuth) => (
            <FaceUpAnimateComponent key={user.id}>
              <ShowBoxPosition user={user} key={user.id} />
            </FaceUpAnimateComponent>
          ))}
        </Flex>
        <Stack spacing={4} mt={10}>
          <FaceUpAnimateComponent>
            <Button variant={'solid'} colorScheme='teal' onClick={handleEntryGame}>
              Entry Game
            </Button>
          </FaceUpAnimateComponent>
        </Stack>
      </ContainerComponent>
    </>
  );
};
