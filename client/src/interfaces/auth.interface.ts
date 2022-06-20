export interface IAuth {
    id: string;
    readyToPlay?: boolean;
    room?: string;
    userName: string;
}

export interface IAuthState {
    auth: IAuth,
    players: IAuth[];
}
