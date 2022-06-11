import { Td } from '@chakra-ui/react';
import React, { useRef } from 'react';

interface IProps {
  colIndex: number;
  rowIndex: number;
}
export const RowComp = ({ colIndex, rowIndex }: IProps) => {
  const ref = useRef<HTMLTableCellElement>(document.createElement('td'));
  const handleClick = () => {
    console.log(`Clicked on ${colIndex} ${rowIndex}`);
    ref.current.style.backgroundColor = 'red';
  };
  return (
    <Td
      ref={ref}
      onClick={handleClick}
      borderRadius={'30%'}
      borderWidth={'0.1em'}
      bg="transparent"
      h='5em'
      w='5em'
    ></Td>
  );
};
