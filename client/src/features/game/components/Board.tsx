import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { socket } from '../../../lib/sockets';
import { GameContext } from '../context/GameContext';
import { useGame } from '../hooks/useGame';
import { ColComp } from './ColComp';

export const Board = () => {
  const { gameState, updateBoard } = useGame();
  const { board } = gameState;

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
