export interface User {
  userName: string;
  id: string;
  room: string;
  readyToPlay: boolean;
  initGame?: boolean;
  playAgain?: boolean;
}

export interface ISocketId {
  [key: string]: string;
}

export interface IPlayer extends User {
  canPlay: boolean;
  color: string;
  token: number;
}
