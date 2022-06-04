import { Table, TableContainer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ColComp } from './ColComp';

export const Board = () => {
  const [col, setCol] = useState<number[]>([]);
  const [row, setRow] = useState<number[]>([]);

  const crearArreglo = (nColRow: number, cb: React.Dispatch<React.SetStateAction<number[]>>) => {
    let r = [];
    for (let i = 0; i < nColRow; i++) {
      r.push(i);
    }
    cb(r);
  };

  useEffect(() => {
    crearArreglo(7, setCol);
    crearArreglo(6, setRow);
  }, []);
  return (
    <TableContainer>
      <Table variant={'simple'}>{col.length != 0 ? col.map(() => <ColComp rows={row} />) : null}</Table>
    </TableContainer>
  );
};
