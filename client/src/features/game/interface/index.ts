export interface IPropsUserIndex {
    currentPlayer: number
    rowIndex: number;
}

export interface ICurrentPlayer {
    id?: string;
    token: number;
}
export interface IChangeBoard {
    currentPlayer: number;
    rowIndex: number;
    colIndex: number;
    playerId?: string
}