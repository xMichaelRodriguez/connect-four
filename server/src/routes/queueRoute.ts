import { Server, Socket } from 'socket.io';
import { User } from '../interfaces';
import { queue, users, findRoomId } from '..';
interface IResponse {
  userId: string;
  hasPlayed: boolean;
  rank: number;
}
export default (io: Server, socket: Socket) => {
  socket.on('matchmaking', (data: IResponse) => {
    const userToQueue = users.filter((singleUser) => singleUser.id === data.userId)[0];
    queue.push({ ...userToQueue, rank: data.rank });
  });

  socket.on('acepted-matched', ({ id }: User) => {
    const roomId = findRoomId(id);
    socket.join(roomId);
    users.forEach((user) => {
      if (user.id === id) {
        user.hasPlayed = true;
      }
    });
    const myUser = users.filter((user) => user.id === id)[0];
    io.sockets.to(myUser.id).emit('in-room', myUser);
  });
};
