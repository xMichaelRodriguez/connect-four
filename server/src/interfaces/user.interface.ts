export interface User {
  userName: string;
  id: string;
  room: string;
  readyToPlay: boolean;
}

export interface ISocketId {
  [key: string]: string;
}
