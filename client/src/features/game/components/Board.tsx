import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ColComp } from './ColComp';

export const Board = () => {
  const [col, setCol] = useState<number[]>([]);
  const [row, setRow] = useState<number[]>([]);

  const createArray = (nColRow: number, cb: React.Dispatch<React.SetStateAction<number[]>>) => {
    let r = [];
    for (let i = 0; i < nColRow; i++) {
      r.push(i);
    }
    cb(r);
  };

  useEffect(() => {
    createArray(6, setCol);
    createArray(7, setRow);
  }, []);

  return (
    <TableContainer>
      <Table variant={'simple'}  overflowX={'auto'}>
        <Tbody>
          {col.length !== 0 && col.map((index) => <ColComp rows={row} colIndex={index} key={index} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
