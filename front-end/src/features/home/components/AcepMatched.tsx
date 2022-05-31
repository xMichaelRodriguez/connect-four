import { Button, Heading, Stack, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ModalContext } from '../../../context/ModalContext';

interface Props {
  onAcepted: () => void;
}

export const AcepMatched = ({ onAcepted }: Props) => {
  const { onClose } = useContext(ModalContext);
  return (
    <VStack>
      <Heading my={3}> New Match Found</Heading>
      <Stack spacing={4} direction='row' align='center' justifyContent={'space-around'}>
        <Button colorScheme='teal' onClick={onAcepted}>
          Accept
        </Button>
        <Button colorScheme='teal' variant='outline' onClick={onClose}>
          Reject
        </Button>
      </Stack>
    </VStack>
  );
};
