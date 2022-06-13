import { ReactNode, useState } from 'react';
import { getFirstEmptyRow, isTie, isWinner, togglePlayer } from '../../../lib/utilsGame';
import { GameContext, IUserGame, Player } from './GameContext';

import { IChangeBoard } from '../interface/index';
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
  const [color, setColor] = useState('');

  const [players, setplayers] = useState<IUserGame>({ isLose: false, isWin: false, users: [] });
  const [board, setBoard] = useState<number[][]>(
    Array(6)
      .fill(0)
      .map(() => Array(7).fill(null))
  );

  const handleChangeColor = (currentUser: number) => {
    const newColor = currentUser === 1 ? 'red' : 'blue';
    setColor(newColor);
  };

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
  const changePlayer = ({ currentUser }: { currentUser: number }) => {
    setCurrentPlayer(currentUser);
    handleChangeColor(currentUser);
  };

  // pone la ficha en el tablero
  const handlePutToken = async ({ rowIndex, currentPlayer }: { rowIndex: number; currentPlayer: Player }) => {
    socket.emit('game:update-active-user', {
      userId: currentPlayer.id,
      token: currentPlayer.token,
    });
    const firstEmptyRow = getFirstEmptyRow(rowIndex, board);

    if (firstEmptyRow === -1) {
      alert('Cannot put here, it is full');
      return;
    }

    await handleChangeBoard({ colIndex: firstEmptyRow, rowIndex, currentPlayer: currentPlayer.token });

   
    const status: boolean = await checkGameStatus(currentPlayer.token);
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
    changePlayer,
    color,
    currentPlayer,
  };
  return (
    <GameContext.Provider
      value={{
        board,
        players,
        isWin: false,
        handleChangeBoard,
        handlePutToken,
        handlePassUsersToPlayer,
        updatePlayers,
        changePlayer,
        color,
        currentPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
