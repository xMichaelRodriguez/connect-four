import { Box, Input, Td } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  handleClick: () => void;
  boxRef: React.MutableRefObject<HTMLDivElement> ;
}
export const RowComp = ({ handleClick, boxRef }: IProps) => {
  return (
    <Td>
      <Box
        ref={boxRef}
        onClick={handleClick}
        borderRadius={'20%'}
        borderWidth={'1px'}
        borderColor={'white'}
        maxW='3em'
        bg='transparent'
        color='white'
        h='2em'
        w='2em'
      ></Box>
    </Td>
  );
};
