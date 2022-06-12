import { ReactNode, useState } from 'react';
import { getFirstEmptyRow, isTie, isWinner, togglePlayer } from '../../../lib/utilsGame';
import { GameContext } from './GameContext';

import { IChangeBoard, IPropsUserIndex } from '../interface/index';
interface props {
  children: ReactNode;
}
const initialPlayer = Math.floor(Math.random() * 2) + 1;
export const GameProvider = ({ children }: props) => {
  const [currentPlayer, setCurrentPlayer] = useState<number>(initialPlayer);
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
  const changePlayer = (currentPlayer: number) => {
    const player = togglePlayer(currentPlayer);
    setCurrentPlayer(player);
  };

  const handlePutToken = async ({ rowIndex, currentPlayer }: IPropsUserIndex) => {
    const firstEmptyRow = getFirstEmptyRow(rowIndex, board);

    if (firstEmptyRow === -1) {
      alert('Cannot put here, it is full');
      return;
    }

    changePlayer(currentPlayer);
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
  const defaultValue = {
    board,
    color: currentPlayer === 1 ? 'red' : 'blue',
    currentPlayer,
    isWin: false,
    handleChangeBoard,
    handlePutToken,
  };
  return <GameContext.Provider value={defaultValue}>{children}</GameContext.Provider>;
};
