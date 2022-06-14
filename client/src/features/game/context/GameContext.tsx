import { createContext } from 'react';
import { User } from '../../../context/AuthContext';
import { IChangeBoard, IPropsUserIndex } from '../interface';

export interface Player extends User {
  canPlay: boolean;
  token: number;
  color: string;
}
export interface IUserGame {
  isLose: boolean;
  isWin: boolean;
  users: Player[];
}
export type IGameContextProps = {
  board: number[][];
  changePlayer: ({ currentUser }: { currentUser: number }) => void;
  color: string;
  currentPlayer: number;
  handleChangeBoard: ({ colIndex, rowIndex, currentPlayer }: IChangeBoard) => void;
  handlePassUsersToPlayer: (users: Player[]) => void;
  handlePutToken: ({ rowIndex, currentPlayer }: { rowIndex: number; currentPlayer: Player }) => void;
  isWin: boolean;
  players: IUserGame;
  updateBoard: (board: [][]) => void;
  updatePlayers: (players: Player[]) => void;
};

// export interface IGameContextProps {
//   board: number[][];
//   color: string;
//   currentPlayer: number;
//   isWin: boolean;

export const GameContext = createContext<IGameContextProps>({} as IGameContextProps);
