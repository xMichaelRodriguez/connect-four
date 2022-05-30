import { Box, Button, Heading, Spinner, Tag, TagLabel, Text, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { ModalComponent } from '../../../components/ModalComponent';
import { AuthContext, User } from '../../../context/AuthContext';
import { ModalContext } from '../../../context/ModalContext';
import { socket } from '../../../lib/sockets';
import { AcepMatched } from '../components/AcepMatched';
import { TotalUsers } from '../components/TotalUsers';

export const HomeQueue = () => {
  const { auth, handleSetAuth } = useContext(AuthContext);
  const { onOpen, isOpen, onClose } = useContext(ModalContext);
  const [matchFound, setMatchFound] = useState(false);
  const handleMatchmaking = () => {
    socket.emit('matchmaking', {
      userId: auth.id,
      hasPlayed: auth.hasPlayed,
      rank: auth.rank,
      userName: auth.userName,
    });
    onOpen();
  };

  const handleAcepted = () => {
    console.log();
    socket.emit('acepted-matched', {
      id: auth.id,
      hasPlayed: auth.hasPlayed,
    });
  };

  useEffect(() => {
    socket.emit('check-in', { userId: auth.id });

    socket.on('matched', () => {
      setMatchFound(true);
    });

    socket.on('in-room', (data: User) => {
      
      handleSetAuth(data);
      console.log(data)
    });
  }, []);

  return (
    <>
      <ContainerComponent>
        <TotalUsers />
        <Heading>{auth && auth.userName}</Heading>
        <Tag my={5} size={'md'} borderRadius='md' colorScheme={'teal'} variant='outline'>
          <TagLabel>Rank: {auth && auth.rank}</TagLabel>
        </Tag>
        <Box>
          <Button variant={'outline'} colorScheme={'teal'} onClick={handleMatchmaking}>
            Find Match
          </Button>
          <ModalComponent isOpen={isOpen} onClose={onClose}>
            {matchFound ? (
              <AcepMatched onAcepted={handleAcepted} />
            ) : (
              <Spinner thickness='6px' speed='0.65s' emptyColor='gray.200' color='teal' size='xl' />
            )}
          </ModalComponent>
        </Box>
      </ContainerComponent>
    </>
  );
};
``;
