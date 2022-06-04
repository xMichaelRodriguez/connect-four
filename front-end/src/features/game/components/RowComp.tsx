import { Input, Td } from '@chakra-ui/react';
import React from 'react';

export const RowComp = () => {
  return (
    <Td>
      <Input borderRadius={'20%'} maxW='3em' value={'x'}  color='white' />
    </Td>
  );
};
