export interface User {
  userName: string;
  id: string;
  room?: string;
  rank: number;
  hasPlayed: boolean;
}

export interface ISocketId {
  [key: string]: string;
}
