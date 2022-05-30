import { Button, Stack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  onAcepted: () => void;
}

export const AcepMatched = ({ onAcepted }: Props) => {
  return (
    <Stack spacing={4} direction='row' align='center' justifyContent={'space-around'}>
      <Button colorScheme='teal' onClick={onAcepted}>
        Accept
      </Button>
      <Button colorScheme='teal' variant='outline'>
        Reject
      </Button>
    </Stack>
  );
};
