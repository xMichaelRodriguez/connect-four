import { ReactNode, useReducer } from 'react';
import { GameContext } from './GameContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// interfaces
import { IChangeBoard, IGame, IGameState, IStateWin } from '../interface/index';

// hooks
import { useAuth } from '../../../hook/useAuth';

// utils
import { getFirstEmptyRow, isTie, isWinner } from '../../../lib/utilsGame';
import { gameReducer, typesGame } from '../context/reducers/gameReducer';
import { socket } from '../../../lib/sockets';
interface props {
  children: ReactNode;
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

  // set ramdon token to players
  const setTokenUserRamdon = (players: IGame[]): IGame[] => {
    players[0].token = playerActive;
    players[1].token = players[0].token === 1 ? (players[1].token = 2) : (players[1].token = 1);
    const newPlayersTokens = [...players];
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

  // change active player
  const changePlayerAndColor = ({ currentPlayer }: { currentPlayer: number }) => {
    const newColor = currentPlayer === 1 ? 'red' : 'blue';

    dispatch({ type: typesGame.CHANGE_COLOR, payload: newColor });
    dispatch({ type: typesGame.CHANGE_ACTIVE_PLAYERS, payload: currentPlayer });
  };

  /**
   * Put the piece on the board
   * @param rowIndex ->index of the position where the user clicked
   * @returns
   */
  const handlePutToken = async ({ rowIndex, currentPlayer }: { rowIndex: number; currentPlayer: IGame }) => {
    socket.emit('game:update-active-user', {
      userId: currentPlayer.id,
      token: currentPlayer.token,
    });
    const firstEmptyRow = getFirstEmptyRow(rowIndex, board);

    if (firstEmptyRow === -1)
      return Swal.fire({
        title: 'Alert!',
        text: 'Cannot put here, it is full',
        icon: 'warning',
        confirmButtonText: 'cool',
      });

    await handleChangeBoard({
      colIndex: firstEmptyRow,
      rowIndex,
      currentPlayer: currentPlayer.token,
      playerId: currentPlayer.id,
    });

    winTieOrLostPlayer();
  };

  // check if a user won,lost or tied
  const winTieOrLostPlayer = (newPlayerActive?: number) => {
    let winPlayer: IStateWin;
    if (newPlayerActive !== undefined) {
      winPlayer = checkGameStatus(newPlayerActive);
    } else {
      winPlayer = checkGameStatus(playerActive);
    }

    if (winPlayer.isWin) {
      socket.emit('game:win', { description: winPlayer.description, userId: auth.id, playerActive });
      Swal.fire({
        title: 'Win!',
        text: winPlayer.description,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Play Again',
        cancelButtonText: 'EndGame',
      }).then((resp) => {
        if (resp.isConfirmed) {
          socket.emit('game:play-again', authState.auth);
        } else {
          socket.emit('game:end-game', auth.id);
          resetBoard();
          window.history.go(-3);
        }
      });
    }
  };

  // checker function
  const checkGameStatus = (currentPlayer: number): IStateWin => {
    const winPlayer: IGame | undefined = players.find((user: IGame) => user.token === currentPlayer);
    if (isWinner({ player: currentPlayer, board })) {
      if (!!winPlayer) return { isWin: true, description: `player ${winPlayer.userName} wins` };
    } else if (isTie({ board })) {
      if (!!winPlayer) return { isWin: true, description: `Tie` };
    }
    return {
      isWin: false,
      description: '',
    };
  };

  // pasa los usuarios en el AuthContext a el GameContext
  const handlePassUsersToPlayer = (players: IGame[]) => {
    const newPlayers: IGame[] = setTokenUserRamdon(players);

    dispatch({ type: typesGame.PLAYERS_IN_GAME, payload: [...newPlayers] });
  };

  // update player array
  const updatePlayers = (newPlayersUpdate: IGame[]) => {
    dispatch({ type: typesGame.PLAYERS_IN_GAME, payload: newPlayersUpdate });
  };

  // update board
  const updateBoard = async (board: number[][]) => {
    await dispatch({ type: typesGame.UPDATE_BOARD, payload: board });
    winTieOrLostPlayer();
  };

  const resetBoard = () => {
    dispatch({ type: typesGame.RESET_BOARD, payload: INITIAL_STATE.board });
  };

  const defaultValue = {
    changePlayerAndColor,
    gameState,
    handleChangeBoard,
    handlePassUsersToPlayer,
    handlePutToken,
    resetBoard,
    updateBoard,
    updatePlayers,
    winTieOrLostPlayer,
  };
  return <GameContext.Provider value={defaultValue}>{children}</GameContext.Provider>;
};
