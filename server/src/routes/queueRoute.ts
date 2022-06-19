import { Server, Socket } from 'socket.io';
import { User } from '../interfaces';
import {
  queue,
  users,
  findRoomId,
  findUserIndexInRoom,
  rooms,
  minRoomSize,
  removeUserFromQueue,
  removeUserFromRoom,
} from '..';
interface IResponse {
  userId: string;
  readyToPlay: boolean;
}
export default (io: Server, socket: Socket) => {
  socket.on('matchmaking', (data: IResponse) => {
    const userToQueue = users.filter((singleUser) => singleUser.id === data.userId)[0];
    queue.push({ ...userToQueue });
  });

  socket.on('acepted-matched', ({ id }: User) => {
    const roomId = findRoomId(id);

    const userIndex = findUserIndexInRoom(id, roomId);
    socket.join(roomId);
    const currentRoom = rooms[roomId];
    currentRoom[userIndex].readyToPlay = true;

    const currentRoomHasNotAccepted = currentRoom.map((userInRoom) => userInRoom.readyToPlay).includes(false);

    const currentRoomLength = currentRoom.length === minRoomSize;

    //check if the user in the room has not accepted a match and the total number of users in the room is 2
    if (!currentRoomHasNotAccepted && currentRoomLength) {
      io.in(roomId).emit('match-accepted', currentRoom);
      // delete rooms[roomId];
      // io.socketsLeave(roomId);
    }
    // opposite case, search among the connected users if the id that we choose matches what we pass on if I accept
    users.forEach((user) => {
      if (user.id === id) {
        user.readyToPlay = true;
      }
    });

    const myUser = users.find((user) => user.id === id);
    if (myUser !== undefined) {
      io.sockets.to(myUser.id).emit('in-room', myUser);
    }
  });

  socket.on('match-rejected', (id: string) => {
    removeUserFromRoom(id);
    io.sockets.in(findRoomId(id)).emit('match-rejected', true);
    removeUserFromQueue(id);
  });
};
