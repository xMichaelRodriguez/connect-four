import express, { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';

import queueEvents from './routes/queueRoute';
import userEvents from './routes/usersRoute';
import gameEvents from './routes/gameRoute';
import { IRoom, ISendUniqueRoom, ISocketId, User } from './interfaces';

// config
export let users: User[] = [];
export let currentUser: number = 1;
export let rooms: IRoom = {};
export let socketIds: ISocketId = {};
export let updateInterval = 10000;
export let minRoomSize = 2;

export let queue: User[] = [];
export const app = express();
export const server = http.createServer(app);
dotenv.config();
app.set('port', process.env.PORT || 3000);
const whiteList = [
  'http://localhost:3000',
  'http://192.168.0.15:3000/',
  'https://connect-4-client.netlify.app',
];

// middlewares
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: whiteList,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  },
});

app.get('/', (_: Request, res: Response) => {
  return res.send('Hello World');
});

//socket.io
io.on('connection', (socket: Socket) => {
  // socket users
  userEvents(io, socket);

  // queue route
  queueEvents(io, socket);
  socket.on('check-in', ({ userId }: { userId: number }) => {
    socketIds[userId] = socket.id;
  });

  // game route
  gameEvents(io, socket);

  socket.on('check-in', ({ userId }: { userId: number }) => {
    socketIds[userId] = socket.id;
  });

  socket.on('disconnect', () => {
    removeUserFromUser(socket.id);
    removeUserFromRoom(socket.id);
    removeUserFromQueue(socket.id);
  });
});

// add users to users array
export function addUser(username: string, socket: Socket) {
  const userToSave: User = {
    userName: username,

    id: socket.id,
    readyToPlay: false,
    room: '',
  };
  users.push(userToSave);

  return { userToSave };
}

/**
 *
 * @param userId ->id of user to find
 * @returns ->Room Id of user
 */
export function findRoomId(userId: string) {
  const roomsValues = Object.values(rooms);
  const singleValues = roomsValues.map((singleRoomValue) => {
    return singleRoomValue.map((singleObjectInsideRoom) => singleObjectInsideRoom.id);
  });

  const roomIndex = singleValues.findIndex((roomMembers) => {
    return roomMembers.includes(userId);
  });
  const roomId = Object.keys(rooms)[roomIndex];

  return roomId;
}

setInterval(() => {
  checkIfMatchmaking();
}, updateInterval);

export function checkIfMatchmaking() {
  const newRoomId = generateRoomId();
  rooms[newRoomId] = [];

  Object.entries(rooms).forEach((room) => {
    if (room[1].length < minRoomSize) {
      findUserInRoom(room[0], newRoomId);
    } else {
      checkIfMatchMakingUsersQueue(newRoomId);
    }
  });
}

const findUserInRoom = (room: string, newRoomId: string) => {
  queue.forEach((singleUser) => {
    if (singleUser.room !== room) {
      sendUniqueRoomAndAddUserRoomAndQuitUserQueue({ room, singleUser });
    } else {
      sendUniqueRoomAndAddUserRoomAndQuitUserQueue({
        room: newRoomId,
        singleUser,
      });
    }
  });
};

const sendUniqueRoomAndAddUserRoomAndQuitUserQueue = ({ room, singleUser }: ISendUniqueRoom) => {
  sendUniqueRoom(socketIds[singleUser.id], 'matched');
  const newUserToRoom = {
    ...singleUser,
    readyToPlay: false,
  };

  rooms[room].push(newUserToRoom);
  queue = queue.filter((queueUser) => queueUser.id !== singleUser.id);
};

const checkIfMatchMakingUsersQueue = (newRoomId: string) => {
  queue.forEach((singleUser) => {
    sendUniqueRoom(socketIds[singleUser.id], 'matched');
    const newUserToRoom = {
      ...singleUser,
      readyToPlay: false,
    };

    rooms[newRoomId].push(newUserToRoom);
    queue = queue.filter((queueUser) => queueUser.id !== singleUser.id);
  });
};

export function sendUniqueRoom(userId: string, emitId: string) {
  if (emitId) {
    io.sockets.to(userId).emit(emitId);
  }
}

export function findUserIndexInRoom(userId: string, roomId: string) {
  const userIndex = rooms[roomId].findIndex((userInRoom) => userInRoom.id === userId);

  return userIndex;
}

export function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}
// actualiza el token de juego de el arreglo de usuarios y
// en la room de la que se encuentra el usuario
export function updateRoomDataUser() {}

export function updateCurrentUser() {
  const initialPlayer = Math.floor(Math.random() * 2) + 1;
  return initialPlayer;
}
export function removeUserFromQueue(userId: string) {
  return (queue = queue.filter((user) => user.id !== userId));
}

export function removeUserFromUser(id: string) {
  users = users.filter((user) => user.id !== id);
  console.log(`bye ${users.length}`);
}

export function removeUserFromRoom(id: string) {
  const user = users.find((user) => user.id === id);
  if (user) {
    const room = Object.entries(rooms).find((room) => room[1].find((userInRoom) => userInRoom.id === id));
    if (room !== undefined) {
      rooms[room[0]] = rooms[room[0]].filter((user) => user.id !== id);
      console.log(rooms);
    }
  }
}
