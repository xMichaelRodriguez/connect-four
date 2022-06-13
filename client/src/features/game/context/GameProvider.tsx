import { ReactNode, useState } from 'react';
import { getFirstEmptyRow, isTie, isWinner, togglePlayer } from '../../../lib/utilsGame';
import { GameContext, IGameContextProps, IUserGame, Player } from './GameContext';

import { IChangeBoard, IPropsUserIndex } from '../interface/index';
import { User } from '../../../context/AuthContext';
import { socket } from '../../../lib/sockets';
interface props {
  children: ReactNode;
}

interface ICurrentPlayer {
  token: number;
  id?: string;
}
const initialPlayer = Math.floor(Math.random() * 2) + 1;
export const GameProvider = ({ children }: props) => {
  const [currentPlayer, setCurrentPlayer] = useState<number>(initialPlayer);
  const [players, setplayers] = useState<IUserGame>({ isLose: false, isWin: false, users: [] });
  const [board, setBoard] = useState<number[][]>(
    Array(6)
      .fill(0)
      .map(() => Array(7).fill(null))
  );

  const setTokenUserRamdon = (users: Player[]) => {
    users[0].token = currentPlayer;
    users[1].token = users[0].token === 1 ? (users[1].token = 2) : (users[1].token = 1);
    socket.emit('game:update-token-users', users);
    return users;
  };

  const handleChangeBoard = ({ colIndex, rowIndex, currentPlayer }: IChangeBoard) => {
    const boardCopy = [...board];
    boardCopy[colIndex][rowIndex] = currentPlayer;
    setBoard(boardCopy);
  };

  // change payer en base a la columna que seleccione el usuario
  const changePlayer = (currentUser: number) => {
    const player = togglePlayer(currentUser);
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
  // pasa los usuarios en el AuthContext a el GameContext
  const handlePassUsersToPlayer = (users: Player[]) => {
    const newUsers: Player[] = setTokenUserRamdon(users);
    const newPlayers = {
      ...players,
      users: newUsers,
    };
    setplayers(newPlayers);
  };
  const updatePlayers = (newPlayersUpdate: Player[]) => {
    const newPlayers = {
      ...players,
      users: newPlayersUpdate,
    };
    console.log(newPlayers);
    setplayers(newPlayers);
  };
  const defaultValue = {
    board,
    players,
    isWin: false,
    handleChangeBoard,
    handlePutToken,
    handlePassUsersToPlayer,
    updatePlayers,
  };
  return <GameContext.Provider value={defaultValue}>{children}</GameContext.Provider>;
};
