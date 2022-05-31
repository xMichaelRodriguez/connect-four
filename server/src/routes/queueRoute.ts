import { Server, Socket } from 'socket.io';
import { User } from '../interfaces';
import { queue, users, findRoomId, findUserIndexInRoom, rooms } from '..';
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
    const userIndex = findUserIndexInRoom(id, roomId);
    socket.join(roomId);
    const currentRoom = rooms[roomId];
    currentRoom[userIndex].hasPlayed = true;

    if (!currentRoom.map((userInRoom) => userInRoom.hasPlayed).includes(false)) {
      // createNewGame(currentRoom).then(res=>{
      //   console.log('New Game Created');
      //   io.in(roomId).emit('match-accepted', currentRoom);
      //   delete rooms[roomId]
      //   io.socketsLeave(roomId);
      // }))
      console.log({currentRoom})
      io.in(roomId).emit('match-accepted', currentRoom);
      delete rooms[roomId];
      io.socketsLeave(roomId);
    }

    users.forEach((user) => {
      if (user.id === id) {
        user.hasPlayed = true;
      }
    });
    const myUser = users.filter((user) => user.id === id)[0];
    io.sockets.to(myUser.id).emit('in-room', myUser);
  });
};
