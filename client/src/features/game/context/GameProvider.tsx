import { ReactNode, useReducer, useState } from 'react';
import { getFirstEmptyRow, isTie, isWinner } from '../../../lib/utilsGame';
import { GameContext } from './GameContext';

import { IChangeBoard, IGame, IGameState } from '../interface/index';
import { socket } from '../../../lib/sockets';
import { gameReducer, typesGame } from '../context/reducers/gameReducer';
import { useAuth } from '../../../hook/useAuth';
interface props {
  children: ReactNode;
}

interface ICurrentPlayer {
  id?: string;
  token: number;
}
const initialPlayer = Math.floor(Math.random() * 2) + 1;

const INITIAL_STATE: IGameState = {
  color: 'red',
  board: Array(6)
    .fill(0)
    .map(() => Array(7).fill(null)),
  playerActive: initialPlayer,
  players: [],
};

export const GameProvider = ({ children }: props) => {
  const [gameState, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const { players, playerActive, board } = gameState;
  const { authState } = useAuth();
  const { auth } = authState;
  const [currentPlayer, setCurrentPlayer] = useState<number>(initialPlayer);
  // const [color, setColor] = useState('');

  const handleChangeColor = (currentUser: number) => {
    const newColor = currentUser === 1 ? 'red' : 'blue';
    dispatch({ type: typesGame.CHANGE_COLOR, payload: newColor });
  };

  // set ramdon token to players
  const setTokenUserRamdon = (players: IGame[]): IGame[] => {
    players[0].token = playerActive;
    players[1].token = players[1].token === 1 ? (players[1].token = 2) : (players[1].token = 2);
    const newPlayersTokens = players;
    socket.emit('game:update-token-players', newPlayersTokens);

    return newPlayersTokens;
  };

  // change board in current screen and emit update board to adversary
  const handleChangeBoard = ({ colIndex, rowIndex, currentPlayer, playerId }: IChangeBoard) => {
    const boardCopy = [...board];
    boardCopy[colIndex][rowIndex] = currentPlayer;
    dispatch({ type: typesGame.UPDATE_BOARD, payload: boardCopy });
    socket.emit('game:update-board', { boardCopy, playerId });
  };

  // change payer en base a la columna que seleccione el usuario
  const changePlayer = ({ currentUser }: { currentUser: number }) => {
    setCurrentPlayer(currentUser);
    handleChangeColor(currentUser);
  };

  // pone la ficha en el tablero
  const handlePutToken = async ({ rowIndex, currentPlayer }: { rowIndex: number; currentPlayer: IGame }) => {
    socket.emit('game:update-active-user', {
      userId: currentPlayer.id,
      token: currentPlayer.token,
    });
    const firstEmptyRow = getFirstEmptyRow(rowIndex, board);

    if (firstEmptyRow === -1) {
      alert('Cannot put here, it is full');
      return;
    }

    await handleChangeBoard({
      colIndex: firstEmptyRow,
      rowIndex,
      currentPlayer: currentPlayer.token,
      playerId: currentPlayer.id,
    });
  };

  const checkGameStatus = (currentPlayer: number) => {
    const winPlayer: IGame | undefined = players.find((user: IGame) => user.token === currentPlayer);
    if (isWinner({ player: currentPlayer, board })) {
      if (!!winPlayer) alert(`player ${winPlayer.userName} wins`);

      return true;
    } else if (isTie({ board })) {
      alert('empate');
      return true;
    }
    return false;
  };

  // pasa los usuarios en el AuthContext a el GameContext
  const handlePassUsersToPlayer = (players: IGame[]) => {
    const newPlayers: IGame[] = setTokenUserRamdon(players);

    dispatch({ type: typesGame.PLAYERS_IN_GAME, payload: [...newPlayers] });
    socket.emit('');
  };

  // update player array
  const updatePlayers = (newPlayersUpdate: IGame[]) => {
    dispatch({ type: typesGame.PLAYERS_IN_GAME, payload: newPlayersUpdate });
  };

  // update board
  const updateBoard = async (board: number[][]) => {
    dispatch({ type: typesGame.UPDATE_BOARD, payload: board });
    // const status: boolean = await checkGameStatus(currentPlayer);
    // const newCurrentPlayer: IGame | undefined = players.find((user) => user.token === currentPlayer);
    // if (status && !!newCurrentPlayer) {
    //   alert('game over');
    // }
  };

  const defaultValue = {
    changePlayer,
    handleChangeBoard,
    handlePassUsersToPlayer,
    handlePutToken,
    gameState,
    updateBoard,
    updatePlayers,
  };
  return <GameContext.Provider value={defaultValue}>{children}</GameContext.Provider>;
};
