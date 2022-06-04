import { Tr } from '@chakra-ui/react';
import React from 'react';
import { RowComp } from './RowComp';

interface Props {
  rows: number[];
}

export const ColComp = (props: Props) => {
  return (
    <Tr>
      {props.rows.map(() => (
        <RowComp />
      ))}
    </Tr>
  );
};
