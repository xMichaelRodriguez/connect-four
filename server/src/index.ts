import express from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';

import queueEvents from './routes/queueRoute';
import userEvents from './routes/usersRoute';
import { IRoom, ISocketId, User } from './interfaces';

// config
export let users: User[] = [];
export let rooms: IRoom = {};
// const maxRank = 20;
// const rankInterval = 20;
export let socketIds: ISocketId = {};
export let updateInterval = 3000;
export let minRoomSize = 2;

export let queue: User[] = [];
export const app = express();
app.use(cors());
export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  },
});
dotenv.config();
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

//socket.io
io.on('connection', (socket: Socket) => {
  // socket users
  userEvents(io, socket);

  // colaRoute
  queueEvents(io, socket);
  socket.on('check-in', ({ userId }: { userId: number }) => {
    socketIds[userId] = socket.id;
  });

  socket.on('disconnect', () => {
    removeUserFromUser(socket.id);
    rooms = {};
    queue = [];
  });
});
export function addUser(username: string, socket: Socket) {
  const userToSave: User = {
    userName: username,
    rank: Math.floor(Math.random() * 100),
    id: socket.id,
    hasPlayed: false,
    room: '',
  };
  users.push(userToSave);

  return { userToSave };
}

export function removeUserFromUser(id: string) {
  users = users.filter((user) => user.id !== id);
  console.log(`bye ${users.length}`);
}
export function findRoomId(userId: string) {
  const roomsValues = Object.values(rooms);
  const singleLevelValues = roomsValues.map((singleRoomValue) => {
    return singleRoomValue.map((singleObjectInsideRoom) => singleObjectInsideRoom.id);
  });

  const roomIndex = singleLevelValues.findIndex((roomMembers) => {
    return roomMembers.includes(userId);
  });
  const roomId = Object.keys(rooms)[roomIndex];
  return roomId;
}

export function generateIntervalObject(max: number, interval: number) {
  let obj = [];
  for (let i = 0; i < max; i++) {
    i + interval <= max
      ? obj.push(i + interval)
      : obj.push({
          min: i,
          max: i + interval,
        });
  }
  return obj;
}

// const rankCheck = generateIntervalObject(maxRank, rankInterval);
export function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}
setInterval(() => {
  checkIfMatchmaking();
}, updateInterval);

export function checkIfMatchmaking() {
  const newRoomId = Math.random().toString(16).slice(2, 15);
  rooms[newRoomId] = [];

  queue.forEach((singleUser) => {
    const room = singleUser.room !== '' ? singleUser.room : '';

    sendUniqueRoom(socketIds[singleUser.id], 'matched', room);
    const newUserToRoom = {
      ...singleUser,
      hasPlayed: false,
    };

    rooms[newRoomId].push(newUserToRoom);
    console.table(singleUser);

    queue = queue.filter((queueUser) => queueUser.id !== singleUser.id);
  });
}

export function sendUniqueRoom(userId: string, emitId: string, message?: string) {
  if (emitId) {
    io.sockets.to(userId).emit(emitId, message);
  }
}

export function findUserIndexInRoom(userId: string, roomId: string) {
  const userIndex = rooms[roomId].findIndex((userInRoom) => userInRoom.id === userId);

  return userIndex;
}
