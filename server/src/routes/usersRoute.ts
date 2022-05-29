import { Server, Socket } from 'socket.io';
import { users } from '..';

export const listen = (io: Server, _: Socket) => {
  io.on('message2', () => {
    console.log('hola')
    io.emit('users', users.length);
  });
  // io.on('createdUser', (data) => {
  //   console.log(data);
  //   io.emit('users', users.length);
  // });
};
