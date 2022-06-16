import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../hook/useAuth';
import { useMyModal } from '../../../hook/useMyModal';
import { IAuth } from '../../../interfaces';
import { socket } from '../../../lib/sockets';
import { HomeView } from '../views/HomeView';

export const HomeQueue = () => {
  const history = useHistory();
  const { onOpen, onClose } = useMyModal();
  const { authState, setLogin, setPlayers } = useAuth();
  const { auth } = authState;

  const [matchRejected, setMatchRejected] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [matchAccepted, setMatchAccepted] = useState(false);
  const handleMatchmaking = () => {
    socket.emit('matchmaking', {
      userId: auth.id,
      readiToPlay: auth.readyToPlay,
      userName: auth.userName,
    });
    onOpen();
  };

  const handleAcepted = () => {
    socket.emit('acepted-matched', {
      id: auth.id,
      readyToPlay: auth.readyToPlay,
    });
    setMatchAccepted(true);
  };
  const handleRejected = () => {
    socket.emit('match-rejected', auth.id);
  };

  useEffect(() => {
    socket.emit('check-in', { userId: auth.id });

    socket.on('matched', () => {
      setMatchFound(true);
    });

    socket.on('in-room', (data: IAuth) => {
      setLogin(data);
    });
    return () => {
      socket.off('check-in');
      socket.off('matched');
      socket.off('in-room');
      setMatchFound(false);
    };
  }, []);

  useEffect(() => {
    socket.on('match-rejected', (data: boolean) => {
      setMatchRejected(data);
    });
    return () => {
      socket.off('match-rejected');
      setMatchRejected(false);
    };
  }, []);

  useEffect(() => {
    socket.on('match-accepted', (users: IAuth[]) => {
      const newUsers: IAuth[] = users.map(({ id, userName, room }: IAuth) => ({
        id,
        userName,
        room,
      }));
      setPlayers(newUsers);
      onClose();
      history.push('/lobby');
    });

    return () => {
      socket.off('match-accepted');
    };
  }, []);

  return (
    <HomeView
      matchRejected={matchRejected}
      handleAccept={handleAcepted}
      handleMatchmaking={handleMatchmaking}
      matchFound={matchFound}
      matchAccepted={matchAccepted}
      handelReject={handleRejected}
    />
  );
};
``;
