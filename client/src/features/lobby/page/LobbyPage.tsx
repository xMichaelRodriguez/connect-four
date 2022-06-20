import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

// custom hooks
import { useAuth } from '../../../hook/useAuth';
import { useGame } from '../../game/hooks/useGame';
import { useMyModal } from '../../../hook/useMyModal';

// interfaces
import { IAuth } from '../../../interfaces';
import { IGame } from '../../game/interface';

// utils and components
import { LobbyView } from '../views/LobbyView';
import { socket } from '../../../lib/sockets';

export function LobbyPage() {
  const { onClose } = useMyModal();

  const { handlePassUsersToPlayer, updatePlayers } = useGame();
  const { authState } = useAuth();
  const { auth, players } = authState;

  const history = useHistory();

  const handleEntryGame = async () => {
    const newPlayers: IGame[] = players.map((user: IAuth) => ({
      ...user,
      color: '',
      token: 0,
    }));
    await handlePassUsersToPlayer(newPlayers);

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
        setTimeout(() => {
          history.push('/game');
        }, 1000);
      }
    });
  }, [onClose]);
  return <LobbyView handleEntryGame={handleEntryGame} />;
}
