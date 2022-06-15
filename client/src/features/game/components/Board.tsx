import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { socket } from '../../../lib/sockets';
import { GameContext } from '../context/GameContext';
import { ColComp } from './ColComp';

export const Board = () => {
  const { board, updateBoard } = useContext(GameContext);

  useEffect(() => {
    socket.on('game:update-board', (newBoard) => {
      updateBoard(newBoard);
    
    });
  }, []);
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
