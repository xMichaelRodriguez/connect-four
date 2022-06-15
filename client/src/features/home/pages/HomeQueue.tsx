import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, User } from '../../../context/AuthContext';
import { ModalContext } from '../../../context/ModalContext';
import { socket } from '../../../lib/sockets';
import { HomeView } from '../views/HomeView';

export const HomeQueue = () => {
  const history = useHistory();
  const { auth, handleSetAuth, handleSetUsers } = useContext(AuthContext);
  const { onOpen, onClose } = useContext(ModalContext);

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

    socket.on('in-room', (data: User) => {
      handleSetAuth(data);
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
      console.log(data);
    });
    return () => {
      socket.off('match-rejected');
      setMatchRejected(false);
    };
  }, []);

  useEffect(() => {
    socket.on('match-accepted', (users: User[]) => {
      const newUsers: User[] = users.map(({ id, userName, room }: User) => ({
        id,
        userName,
        room,
      }));
      handleSetUsers(newUsers);
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
