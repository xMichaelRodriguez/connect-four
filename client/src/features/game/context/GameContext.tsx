import { createContext } from 'react';
import { IChangeBoard, IGame, IGameState } from '../interface';

export interface IGameContextProps {
  gameState: IGameState;

  changePlayer: ({ currentUser }: { currentUser: number }) => void;
  handleChangeBoard: ({ colIndex, rowIndex, currentPlayer }: IChangeBoard) => void;

  handlePassUsersToPlayer: (users: IGame[]) => void;

  handlePutToken: ({ rowIndex, currentPlayer }: { rowIndex: number; currentPlayer: IGame }) => void;

  updateBoard: (board: [][]) => void;
  updatePlayers: (players: IGame[]) => void;
}

export const GameContext = createContext<IGameContextProps>({} as IGameContextProps);
