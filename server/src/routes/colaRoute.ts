import { Server, Socket } from "socket.io";

export const listen = (io: Server, _: Socket) => {
  io.emit("message", "Hello from server");
};
