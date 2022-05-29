import { Server, Socket } from "socket.io";
import { users } from "..";

export const listen = (io: Server, _: Socket) => {
  io.on('createdUser2', (data) => {
    console.log(data);
    io.emit('users', users.length);
  });
};
