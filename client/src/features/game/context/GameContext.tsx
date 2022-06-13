import { createContext } from 'react';
import { User } from '../../../context/AuthContext';
import { IChangeBoard, IPropsUserIndex } from '../interface';

export interface Player extends User {
  canPlay: boolean;
  color: string;
  token: number;
}
export interface IUserGame {
  isLose: boolean;
  isWin: boolean;
  users: Player[];
}
export type IGameContextProps = {
  board: number[][];

  handleChangeBoard: ({ colIndex, rowIndex, currentPlayer }: IChangeBoard) => void;
  handlePutToken: ({ rowIndex, currentPlayer }: IPropsUserIndex) => void;
  handlePassUsersToPlayer: (users: Player[]) => void;
  isWin: boolean;
  players: IUserGame;
  updatePlayers: (players: Player[]) => void;
};

// export interface IGameContextProps {
//   board: number[][];
//   color: string;
//   currentPlayer: number;
//   isWin: boolean;

export const GameContext = createContext<IGameContextProps>({} as IGameContextProps);
