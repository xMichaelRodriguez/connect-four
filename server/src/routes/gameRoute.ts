import { Server, Socket } from 'socket.io';
import { findRoomId, findUserIndexInRoom, rooms, updateCurrentUser, users } from '..';
import { IPlayer } from '../interfaces/index';
type TWin = { description: string; userId: string; playerActive: number };
export default (io: Server, socket: Socket) => {
  socket.on('game:update-token-users', (data: IPlayer[]) => {
    const roomId = findRoomId(data[0].id);
    if (!!roomId) {
      socket.in(roomId).emit('game:updated-token-users', data);
    }
  });

  socket.on('game:ready', (userId: string) => {
    const roomId = findRoomId(userId);
    const userIndex = findUserIndexInRoom(userId, roomId);
    const currentRoom = rooms[roomId];
    currentRoom[userIndex].initGame = true;

    const currentRoomUserReady = currentRoom.map((userInRoom) => userInRoom.readyToPlay).includes(false);

    if (!currentRoomUserReady) {
      io.in(roomId).emit('game:init', true);
    }
    users.forEach((user) => {
      if (user.id === userId) {
        user.initGame = true;
      }
    });
    const myUser = users.filter((user) => user.id === userId)[0];
    io.sockets.to(myUser.id).emit('game:init', myUser);
  });

  socket.on('game:initial-current-user', (userId: string) => {
    const roomId = findRoomId(userId);
    if (!!roomId) {
      const currentUser = updateCurrentUser();
      io.sockets.in(roomId).emit('game:initial-current-user', currentUser);
    }
  });
  socket.on('game:update-active-user', ({ userId, token }: { userId: string; token: number }) => {
    const newToken = token === 1 ? 2 : 1;
    const roomId = findRoomId(userId);
    io.sockets.in(roomId).emit('game:update-active-user', newToken);
  });

  socket.on('game:colorUser', (players: IPlayer[]) => {
    const roomId = findRoomId(players[0].id);
    if (!!roomId) {
      const newPlayers = players.map((player) => ({ ...player, color: player.token === 1 ? 'red' : 'blue' }));
      io.sockets.in(roomId).emit('game:new-color-User', newPlayers);
    }
  });

  // board events
  interface IBoardEvent {
    playerId: string;
    boardCopy: number[][];
  }
  socket.on('game:update-board', ({ boardCopy, playerId }: IBoardEvent) => {
    const roomId = findRoomId(playerId);
    if (!!roomId) {
      io.sockets.in(roomId).emit('game:update-board', boardCopy);
    }
  });

  socket.on('game:win', ({ description, userId, playerActive }: TWin) => {
    const roomId = findRoomId(userId);
    if (!!roomId) {
      io.sockets.in(roomId).emit('game:win', { description, userId, playerActive });
    }
  });

  socket.on('game:end-game', (userId: string) => {
    const room = findRoomId(userId);
    socket.in(room).emit('game:end-game');
    delete rooms[room];
  });
};
