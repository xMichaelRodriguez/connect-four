import { ReactNode, useState } from 'react';
import { getFirstEmptyRow, isTie, isWinner } from '../../../lib/utilsGame';
import { GameContext } from './GameContext';

import { IChangeBoard, IPropsUserIndex } from '../interface/index';
interface props {
  children: ReactNode;
}

export const GameProvider = ({ children }: props) => {
  const [board, setBoard] = useState<number[][]>(
    Array(6)
      .fill(0)
      .map(() => Array(7).fill(null))
  );

  const handleChangeBoard = ({ colIndex, rowIndex, currentPlayer }: IChangeBoard) => {
    const boardCopy = [...board];
    boardCopy[colIndex][rowIndex] = currentPlayer;

    setBoard(boardCopy);
  };

  const handlePutToken = async ({ rowIndex, currentPlayer }: IPropsUserIndex) => {
    const firstEmptyRow = getFirstEmptyRow(rowIndex, board);

    if (firstEmptyRow === -1) {
      alert('Cannot put here, it is full');
      return;
    }
    await handleChangeBoard({ colIndex: firstEmptyRow, rowIndex, currentPlayer });

    const status: boolean = await checkGameStatus(currentPlayer);
    if (status) {
      console.log('Game Over');
    }

    // else {
    //   const resp: boolean = askUserForAnotherMatch();
    //   if (resp) {
    //     console.log('reset game');
    //   }
    // }
  };

  const checkGameStatus = (currentPlayer: number) => {
    if (isWinner({ player: currentPlayer, board })) {
      alert(`player ${currentPlayer} gana`);
      return true;
    } else if (isTie({ board })) {
      alert('empate');
      return true;
    }
    return false;
  };
  return (
    <GameContext.Provider
      value={{
        board,
        color: 'red',
        player: 1,
        isWin: false,
        handleChangeBoard,
        handlePutToken,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
