import React from 'react';
import { Button, Heading, Stack, VStack } from '@chakra-ui/react';

// hooks
import { useMyModal } from '../../../hook/useMyModal';

// my utils
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';

interface Props {
  onAcepted: () => void;
  onRejected: () => void;
}

export function AcepMatched({ onAcepted, onRejected }: Props) {
  const { onClose } = useMyModal();

  const handleRejectMatch = () => {
    onRejected();
    onClose();
  };
  return (
    <VStack>
      <FaceUpAnimateComponent>
        <Heading my={3}> New Match Found</Heading>
        <Stack spacing={4} direction="row" align="center" justifyContent="space-around">
          <Button colorScheme="teal" onClick={onAcepted}>
            Accept
          </Button>
          <Button colorScheme="teal" variant="outline" onClick={handleRejectMatch}>
            Reject
          </Button>
        </Stack>
      </FaceUpAnimateComponent>
    </VStack>
  );
}
