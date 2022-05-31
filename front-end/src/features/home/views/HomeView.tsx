import { Box, Button, Heading, Spinner, Tag, TagLabel, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { ModalComponent } from '../../../components/ModalComponent';
import { AuthContext } from '../../../context/AuthContext';
import { ModalContext } from '../../../context/ModalContext';
import { AcepMatched } from '../components/AcepMatched';
import { TotalUsers } from '../components/TotalUsers';

interface Props {
  matchAccepted: boolean;
  handleAccept: () => void;
  handleMatchmaking: () => void;
  matchFound: boolean;
}

export const HomeView = ({ matchAccepted, handleAccept, handleMatchmaking, matchFound }: Props) => {
  const { auth } = useContext(AuthContext);
  const { isOpen, onClose } = useContext(ModalContext);

  if (matchFound && !matchAccepted) {
    return (
      <ContainerComponent>
        <TotalUsers />
        <Heading>{auth && auth.userName}</Heading>
        <Tag my={5} size={'md'} borderRadius='md' colorScheme={'teal'} variant='outline'>
          <TagLabel>Rank: {auth && auth.rank}</TagLabel>
        </Tag>
        <Box>
          <Button variant={'outline'} colorScheme={'teal'} onClick={handleMatchmaking}>
            Finding Match
          </Button>
          <ModalComponent isOpen={isOpen} onClose={onClose}>
            <AcepMatched onAcepted={handleAccept} />
          </ModalComponent>
        </Box>
      </ContainerComponent>
    );
  }
  if (matchAccepted) {
    return (
      <ContainerComponent>
        <TotalUsers />
        <Heading>{auth && auth.userName}</Heading>
        <Tag my={5} size={'md'} borderRadius='md' colorScheme={'teal'} variant='outline'>
          <TagLabel>Rank: {auth && auth.rank}</TagLabel>
        </Tag>
        <Box>
          <Button variant={'outline'} colorScheme={'teal'} onClick={handleMatchmaking}>
            Finding Match
          </Button>
          <ModalComponent isOpen={isOpen} onClose={onClose}>
            <VStack h={'100px'}>
              <Text fontWeight={'bold'} color={'white'}>
                Esperando que el otro jugador acepte la partida...
              </Text>
              <Spinner thickness='6px' speed='0.65s' emptyColor='gray.200' color='teal' size='xl' />
            </VStack>
          </ModalComponent>
        </Box>
      </ContainerComponent>
    );
  }

  return (
    <ContainerComponent>
      <TotalUsers />
      <Heading>{auth && auth.userName}</Heading>
      <Tag my={5} size={'md'} borderRadius='md' colorScheme={'teal'} variant='outline'>
        <TagLabel>Rank: {auth && auth.rank}</TagLabel>
      </Tag>
      <Box>
        <Button variant={'outline'} colorScheme={'teal'} onClick={handleMatchmaking}>
          Finding Match
        </Button>
        <ModalComponent isOpen={isOpen} onClose={onClose}>
          <Spinner thickness='6px' speed='0.65s' emptyColor='gray.200' color='teal' size='xl' />
        </ModalComponent>
      </Box>
    </ContainerComponent>
  );
};
