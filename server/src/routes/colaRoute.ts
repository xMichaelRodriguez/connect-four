import { Server, Socket } from 'socket.io';
// import { users } from '..';

export default (io: Server, _: Socket) => {
  io.on('createdUser2', (data) => {
    
    console.log(data);
  });
};
