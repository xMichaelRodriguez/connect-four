import { createContext } from 'react';
import { IChangeBoard, IGame, IGameState } from '../interface';

export interface IGameContextProps {
  gameState: IGameState;

  changePlayerAndColor: ({ currentPlayer }: { currentPlayer: number }) => void;
  handleChangeBoard: ({ colIndex, rowIndex, currentPlayer }: IChangeBoard) => void;

  handlePassUsersToPlayer: (users: IGame[]) => void;

  handlePutToken: ({ rowIndex, currentPlayer }: { rowIndex: number; currentPlayer: IGame }) => void;
  winTieOrLostPlayer: (winTieOrLostPlayer?: number) => void;
  updateBoard: (board: number[][]) => Promise<void>;
  updatePlayers: (players: IGame[]) => void;
  resetBoard: () => void;
}

export const GameContext = createContext<IGameContextProps>({} as IGameContextProps);
