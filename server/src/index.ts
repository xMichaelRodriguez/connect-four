import express from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';

import queueEvents from './routes/colaRoute';
import userEvents from './routes/usersRoute';
import userRoute from './routes/createUser';
import { User } from './interfaces';

// config

export let users: User[] = [];
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

// routes
app.use('/api/user', userRoute);

//socket.io
io.on('connection', (socket: Socket) => {
  // socket users
  userEvents(io, socket);

  // colaRoute
  queueEvents(io, socket);
});
