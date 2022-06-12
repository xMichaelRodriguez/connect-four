import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { ColComp } from './ColComp';

export const Board = () => {
  const { board } = useContext(GameContext);
  return (
    <TableContainer>
      <Table variant={'simple'} overflowX={'auto'}>
        <Tbody>
          {board.map((row, indexRow) => (
            <ColComp rows={row} colIndex={indexRow} key={indexRow} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
