import { Server, Socket } from "socket.io";
import { findRoomId, findUserIndexInRoom, rooms, updateCurrentUser, users } from "..";
import { IPlayer } from '../interfaces/index'

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

    socket.on('current-user', (userId:string) => {
        const roomId = findRoomId(userId);
        if (!!roomId) {
            const currentUser = updateCurrentUser()
            console.log({currentUser})
            io.sockets.in(roomId).emit('current-user', currentUser);
        }
    })


    socket.on('game:colorUser', (players: IPlayer[]) => {

        const roomId = findRoomId(players[0].id);
        if (!!roomId) {
            const newPlayers = players.map((player) => ({ ...player, color: player.token === 1 ? 'red' : 'blue' }));
            io.sockets.in(roomId).emit('game:new-color-User', newPlayers);
        }
    })
}