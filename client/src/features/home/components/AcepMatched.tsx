import { Button, Heading, Stack, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';
import { ModalContext } from '../../../context/ModalContext';

interface Props {
  onAcepted: () => void;
  onRejected: () => void;
}

export const AcepMatched = ({ onAcepted, onRejected }: Props) => {
  const { onClose } = useContext(ModalContext);

  const handleRejectMatch = () => {
    onRejected();
    onClose();
  };
  return (
    <VStack>
      <FaceUpAnimateComponent>
        <Heading my={3}> New Match Found</Heading>
        <Stack spacing={4} direction='row' align='center' justifyContent={'space-around'}>
          <Button colorScheme='teal' onClick={onAcepted}>
            Accept
          </Button>
          <Button colorScheme='teal' variant='outline' onClick={handleRejectMatch}>
            Reject
          </Button>
        </Stack>
      </FaceUpAnimateComponent>
    </VStack>
  );
};
