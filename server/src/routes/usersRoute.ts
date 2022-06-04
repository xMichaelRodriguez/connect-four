import { Server } from 'socket.io';
import { users } from '..';
import { User } from '../interfaces';
import { addUser } from '../index';
interface IResponseServer {
  description: User | string;
  name: string;
}
interface Props {
  username: string;
}
export default (io: Server, socket: any) => {
  socket.on('createUser', ({ username }: Props, cb: (data: IResponseServer) => void) => {
    const userNames = users.map((user) => user.userName);

    if (!userNames.includes(username)) {
      const { userToSave } = addUser(username, socket);
      socket.username = username;

      setTimeout(() => {
        io.emit('updateUserActive', users.length);
      }, 100);
      return cb({ description: userToSave, name: 'UserCreated' });
    } else {
      cb({
        description: 'user already exist',
        name: 'userAlreadyExists',
      });
    }
  });
};
