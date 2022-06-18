import { IAuth } from '../../../interfaces/index';
export interface IGame extends IAuth {
  color: string;
  token: number;
}

export interface IGameState {
  board: number[][];
  color: string;
  playerActive: number;
  players: IGame[];
}

export interface IStateWin {
  isWin: boolean;
  description: string;
}
