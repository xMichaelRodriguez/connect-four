import { Tr } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { RowComp } from './RowComp';

interface Props {
  rows: number[];
}

export const ColComp = (props: Props) => {
  const boxRef = useRef<HTMLDivElement>(document.createElement('div'));
  const handleClick = () => {
    console.log('click');
    // boxRef.current.style.backgroundColor = 'red';
    boxRef.current.style.backgroundColor = 'red';
  };
  return (
    <Tr>
      {props.rows.map((index) => (
        <RowComp key={index} handleClick={handleClick} boxRef={boxRef} />
      ))}
    </Tr>
  );
};
