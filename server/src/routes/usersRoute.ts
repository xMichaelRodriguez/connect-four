import { Server, Socket } from 'socket.io';
import { users } from '..';

export default (io: Server, socket: Socket) => {
  socket.on('userCreated', () => {
    setTimeout(() => {
      io.emit('userCount', users.length);
    }, 100);
  });
};
