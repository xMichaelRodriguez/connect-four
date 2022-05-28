import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import { listen } from "./routes/colaRoute";

// config
export const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },
});
dotenv.config();
app.set("port", process.env.PORT || 3000);
// middlewares
app.use(express.json());

//socket.io

io.on("connection", (socket: Socket) => {
  // colaRoute
  listen(io, socket);
});
