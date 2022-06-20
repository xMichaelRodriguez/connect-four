import { ReactNode, useMemo, useReducer } from 'react';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { GameContext } from './GameContext';
import 'sweetalert2/dist/sweetalert2.min.css';
// interfaces
import { IChangeBoard, IGame, IGameState, IStateWin } from '../interface/index';

// hooks
import { useAuth } from '../../../hook/useAuth';

// utils
import { getFirstEmptyRow, isTie, isWinner } from '../../../lib/utilsGame';
import { gameReducer } from './reducers/gameReducer';
import { typesGame } from './typesGame';
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

export function GameProvider({ children }: props) {
  const [gameState, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const { players, playerActive, board } = gameState;

  const { authState } = useAuth();
  const { auth } = authState;

  const resetBoard = () => {
    dispatch({ type: typesGame.RESET_BOARD, payload: INITIAL_STATE.board });
  };
  // checker function
  const checkGameStatus = (currentPlayer: number): IStateWin => {
    const winPlayer: IGame | undefined = players.find(
      (user: IGame) => user.token === currentPlayer
    );
    if (isWinner({ player: currentPlayer, board })) {
      if (winPlayer) return { isWin: true, description: `player ${winPlayer.userName} wins` };
    } else if (isTie({ board })) {
      if (winPlayer) return { isWin: true, description: 'Tie' };
    }
    return {
      isWin: false,
      description: '',
    };
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
      socket.emit('game:win', {
        description: winPlayer.description,
        userId: auth.id,
        playerActive,
      });
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

  // set ramdon token to players
  const setTokenUserRamdon = (singlePlayers: IGame[]): IGame[] => {
    const singlePlayersCopy = [...singlePlayers];
    singlePlayersCopy[0].token = playerActive;
    const asignToken =
      singlePlayersCopy[0].token === 1
        ? (singlePlayersCopy[1].token = 2)
        : (singlePlayersCopy[1].token = 1);
    singlePlayersCopy[1].token = asignToken;

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
  const handlePutToken = async ({
    rowIndex,
    currentPlayer,
  }: {
    rowIndex: number;
    currentPlayer: IGame;
  }): Promise<SweetAlertResult | void> => {
    socket.emit('game:update-active-user', {
      userId: currentPlayer.id,
      token: currentPlayer.token,
    });
    const firstEmptyRow = getFirstEmptyRow(rowIndex, board);

    if (firstEmptyRow === -1) {
      return Swal.fire({
        title: 'Alert!',
        text: 'Cannot put here, it is full',
        icon: 'warning',
        confirmButtonText: 'cool',
      });
    }

    await handleChangeBoard({
      colIndex: firstEmptyRow,
      rowIndex,
      currentPlayer: currentPlayer.token,
      playerId: currentPlayer.id,
    });

    return winTieOrLostPlayer();
  };

  // pasa los usuarios en el AuthContext a el GameContext
  const handlePassUsersToPlayer = (singlePlayers: IGame[]): void => {
    const newPlayers: IGame[] = setTokenUserRamdon(singlePlayers);

    dispatch({ type: typesGame.PLAYERS_IN_GAME, payload: [...newPlayers] });
  };

  // update player array
  const updatePlayers = (newPlayersUpdate: IGame[]): void => {
    dispatch({ type: typesGame.PLAYERS_IN_GAME, payload: newPlayersUpdate });
  };

  // update board
  const updateBoard = async (singleBoard: number[][]): Promise<void> => {
    await dispatch({ type: typesGame.UPDATE_BOARD, payload: singleBoard });
    winTieOrLostPlayer();
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

  const defaultProps = useMemo(
    () => defaultValue,
    [
      changePlayerAndColor,
      gameState,
      handleChangeBoard,
      handlePassUsersToPlayer,
      handlePutToken,
      updateBoard,
      updatePlayers,
      winTieOrLostPlayer,
    ]
  );
  return <GameContext.Provider value={defaultProps}>{children}</GameContext.Provider>;
}
