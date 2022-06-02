import { Server, Socket } from 'socket.io';
import { User } from '../interfaces';
import { queue, users, findRoomId, findUserIndexInRoom, rooms, minRoomSize } from '..';
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

    const currentRoomHasNotAccepted = currentRoom.map((userInRoom) => userInRoom.hasPlayed).includes(false);

    const currentRoomLength = currentRoom.length === minRoomSize;

    // checka si el usuario en la sala ha aceptado match y el total de usuarios en la sala es 2
    if (!currentRoomHasNotAccepted && currentRoomLength) {
      // console.log({ currentRoom });
      io.in(roomId).emit('match-accepted', currentRoom);
      delete rooms[roomId];
      io.socketsLeave(roomId);
    }
    // si no busca entre los usuarios conectados si coincide el id que optenemos lo pasamos que si acepto
    users.forEach((user) => {
      if (user.id === id) {
        user.hasPlayed = true;
      }
    });
    const myUser = users.filter((user) => user.id === id)[0];
    io.sockets.to(myUser.id).emit('in-room', myUser);
  });

  socket.on('match-rejected', ({ id }: User) => {

    const roomId = findRoomId(id);

    const currentRoom = rooms[roomId];
    Object.values(currentRoom).forEach(room => {
      io.sockets.to(room.id).emit('rejected-match', 'Match Rejected :(');
    })
    delete rooms[roomId];
  })
};

