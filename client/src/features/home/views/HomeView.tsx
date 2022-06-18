import { Box, Button, Heading, Spinner, Text, VStack } from '@chakra-ui/react';

// hooks
import { useAuth } from '../../../hook/useAuth';
import { useMyModal } from '../../../hook/useMyModal';

// utils
import { ContainerComponent } from '../../../components/ContainerComponent';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';
import { ModalComponent } from '../../../components/ModalComponent';
import { AcepMatched } from '../components/AcepMatched';

interface Props {
  matchAccepted: boolean;
  handleAccept: () => void;
  handelReject: () => void;
  handleMatchmaking: () => void;
  matchFound: boolean;
  matchRejected: boolean;
}

export const HomeView = ({
  matchAccepted,
  handleAccept,
  handelReject,
  handleMatchmaking,
  matchFound,
  matchRejected,
}: Props) => {
  const { isOpen, onClose } = useMyModal();
  const { authState } = useAuth();
  const { auth } = authState;

  if (matchFound && !matchAccepted) {
    return (
      <ContainerComponent>
        <FaceUpAnimateComponent>
          <Heading py={3}>{auth && auth.userName}</Heading>
        </FaceUpAnimateComponent>
        <Box>
          <FaceUpAnimateComponent>
            <Button variant={'outline'} colorScheme={'teal'} onClick={handleMatchmaking}>
              Battle
            </Button>
          </FaceUpAnimateComponent>

          <ModalComponent isOpen={isOpen} onClose={onClose}>
            <AcepMatched onAcepted={handleAccept} onRejected={handelReject} />
          </ModalComponent>
        </Box>
      </ContainerComponent>
    );
  }

  if (matchAccepted) {
    return (
      <ContainerComponent>
        <FaceUpAnimateComponent>
          <Heading py={3}>{auth && auth.userName}</Heading>
        </FaceUpAnimateComponent>
        <Box>
          <FaceUpAnimateComponent>
            <Button variant={'outline'} colorScheme={'teal'} onClick={handleMatchmaking}>
              Battle
            </Button>
          </FaceUpAnimateComponent>
          <ModalComponent isOpen={isOpen} onClose={onClose}>
            <VStack h={'100px'}>
              <Text fontWeight={'bold'} color={'white'}>
                Waiting for the other player to accept the game
              </Text>
              <Spinner thickness='9px' emptyColor='gray.200' color='teal.800' size='xl' />
            </VStack>
          </ModalComponent>
        </Box>
      </ContainerComponent>
    );
  }

  if (matchRejected) {
    <ContainerComponent>
      <FaceUpAnimateComponent>
        <Heading py={3}>{auth && auth.userName}</Heading>
      </FaceUpAnimateComponent>
      <Box>
        <FaceUpAnimateComponent>
          <Button variant={'outline'} colorScheme={'teal'} onClick={handleMatchmaking}>
            Battle
          </Button>
        </FaceUpAnimateComponent>
        <ModalComponent isOpen={isOpen} onClose={onClose}>
          <VStack h={'100px'}>
            <Text fontWeight={'bold'} color={'white'}>
              {matchRejected}
            </Text>
            <Button variant={'solid'} colorScheme='cyan'>
              Close
            </Button>
          </VStack>
        </ModalComponent>
      </Box>
    </ContainerComponent>;
  }
  return (
    <ContainerComponent>
      <FaceUpAnimateComponent>
        <Heading py={3}>{auth && auth.userName}</Heading>
      </FaceUpAnimateComponent>
      <Box>
        <FaceUpAnimateComponent>
          <Button variant={'outline'} colorScheme={'teal'} onClick={handleMatchmaking}>
            Battle
          </Button>
        </FaceUpAnimateComponent>
        <ModalComponent isOpen={isOpen} onClose={onClose}>
          <VStack>
            <Text>Searching for oponents</Text>
            <Spinner thickness='6px' speed='0.65s' emptyColor='gray.200' color='teal' size='xl' />
          </VStack>
        </ModalComponent>
      </Box>
    </ContainerComponent>
  );
};
