import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { useEffect } from 'react';

import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { IStateWin } from '../interface';
// hook
import { useGame } from '../hooks/useGame';

import { socket } from '../../../lib/sockets';
import { ColComp } from './ColComp';

interface ISocketWin extends IStateWin {
  playerActive: number;
}
export function Board() {
  const { gameState, updateBoard, resetBoard, winTieOrLostPlayer } = useGame();
  const { board } = gameState;
  const history = useHistory();
  useEffect(() => {
    socket.on('game:update-board', (newBoard: number[][]) => {
      updateBoard(newBoard);
    });
    socket.on('game:win', ({ playerActive }: ISocketWin) => {
      winTieOrLostPlayer(playerActive);
    });

    return () => {
      socket.off('game:update-board');
      socket.off('game:win');
    };
  }, [board]);

  useEffect(() => {
    socket.on('game:end-game', () => {
      Swal.fire({
        title: 'Alert!',
        text: 'The opponent left the game',
        icon: 'info',
        confirmButtonText: 'return to home',
      }).then((resp) => resp.isConfirmed && history.replace('/queue'));
      resetBoard();
    });
    return () => {
      socket.off('game:end-game');
    };
  }, []);

  useEffect(() => {
    socket.on('game:play-again', () => {
      resetBoard();
    });

    return () => {
      socket.off('gameLplay-again');
    };
  }, []);

  return (
    <TableContainer>
      <Table variant="simple" overflowX="auto">
        <Tbody>
          {board.map((row, indexRow) => (
            <ColComp rows={row} colIndex={indexRow} key={indexRow} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
