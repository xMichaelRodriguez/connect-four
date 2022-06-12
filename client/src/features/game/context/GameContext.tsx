import { createContext } from 'react';
import { IChangeBoard, IPropsUserIndex } from '../interface';

export type Game = {
  board: number[][];
  color: string;
  player: number;
  isWin: boolean;
};
export interface IGameContextProps {
  board: number[][];
  color: string;
  currentPlayer: number;
  isWin: boolean;
  handleChangeBoard: ({ colIndex, rowIndex, currentPlayer }: IChangeBoard) => void;
  handlePutToken: ({ rowIndex, currentPlayer }: IPropsUserIndex) => void;
}

export const GameContext = createContext<IGameContextProps>({} as IGameContextProps);
