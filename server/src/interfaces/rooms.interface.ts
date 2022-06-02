import { User } from '.';

export interface IRoom {
    [key: string]: User[];
}

export interface ISendUniqueRoom {
    room: string,
    singleUser: User
}