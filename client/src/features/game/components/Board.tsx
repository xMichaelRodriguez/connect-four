import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { IPropsState } from '../pages/GamePage';
import { ColComp } from './ColComp';

export const Board = ({ board }: IPropsState) => {
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
