import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { socket } from '../../../lib/sockets';
import { GameContext } from '../context/GameContext';
import { useGame } from '../hooks/useGame';
import { IStateWin } from '../interface';
import { ColComp } from './ColComp';

interface ISocketWin extends IStateWin {
  playerActive: number;
}
export const Board = () => {
  const { gameState, updateBoard, winTieOrLostPlayer } = useGame();
  const { board } = gameState;

  useEffect(() => {
    socket.on('game:update-board', (newBoard: number[][]) => {
      updateBoard(newBoard);
    });
    socket.on('game:win', ({ description, isWin, playerActive }: ISocketWin) => {
      winTieOrLostPlayer(playerActive);
    });

    return () => {
      socket.off('game:update-board');
      socket.off('game:win');
    };
  }, [board]);

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
