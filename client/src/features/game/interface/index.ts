export interface IPropsUserIndex {
    rowIndex: number;
    currentPlayer: number
}

export interface ICurrentPlayer {
    token: number;
    id?: string;
}
export interface IChangeBoard {
    colIndex: number; rowIndex: number; currentPlayer: number;
}