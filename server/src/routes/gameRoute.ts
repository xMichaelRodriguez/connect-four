import { Server, Socket } from "socket.io";
import { findRoomId, rooms, } from "..";
import { IPlayer } from '../interfaces/index'

export default (_: Server, socket: Socket) => {
    socket.on('game:update-token-users', (data: IPlayer[]) => {

        const roomId = findRoomId(data[0].id);
        console.log({ roomId, rooms: Object.values(rooms) })
        if (roomId !== undefined) {
            socket.to(roomId).emit('game:updated-token-users', data);
        }


    });
}