import { io } from 'socket.io-client';
const { VITE_URI_GAME } = import.meta.env;
export const socket = io(VITE_URI_GAME, {
  forceNew: true,
});
