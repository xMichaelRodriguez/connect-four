const CONNECT = 4;
const COLUMNS = 7;
const ROWS = 6;
const EMPTY_SPACE = '  '
interface IPropsCount {
    x: number;
    y: number;
    player: string;
    board: any
}



export const countUp = ({ x, y, player, board }: IPropsCount) => {
    let startY = (y - CONNECT >= 0) ? y - CONNECT + 1 : 0;
    let counter = 0;
    for (; startY <= y; startY++) {
        if (board[startY][x] === player) {
            counter++;
        } else {
            counter = 0;
        }
    }
    return counter;
};

export const countRight = ({ x, y, player, board }: IPropsCount) => {
    let endX = (x + CONNECT < COLUMNS) ? x + CONNECT - 1 : COLUMNS - 1;
    let counter = 0;
    for (; x <= endX; x++) {
        if (board[y][x] === player) {
            counter++;
        } else {
            counter = 0;
        }
    }
    return counter;
}

export const countUpRight = ({ x, y, player, board }: IPropsCount) => {
    let endX = (x + CONNECT < COLUMNS) ? x + CONNECT - 1 : COLUMNS - 1;
    let startY = (y - CONNECT >= 0) ? y - CONNECT + 1 : 0;
    let counter = 0;
    while (x <= endX && startY <= y) {
        if (board[y][x] === player) {
            counter++;
        } else {
            counter = 0;
        }
        x++;
        y--;
    }
    return counter;
}
export const countDownRight = ({ x, y, player, board }: IPropsCount) => {
    let endX = (x + CONNECT < COLUMNS) ? x + CONNECT - 1 : COLUMNS - 1;
    let endY = (y + CONNECT < ROWS) ? y + CONNECT - 1 : ROWS - 1;
    let counter = 0;
    while (x <= endX && y <= endY) {
        if (board[y][x] === player) {
            counter++;
        } else {
            counter = 0;
        }
        x++;
        y++;
    }
    return counter;
};

export const isWinner = ({ player, board }: IPropsCount) => {
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLUMNS; x++) {
            let count = 0;
            count = countUp({ x, y, player, board });
            if (count >= CONNECT) return true;
            count = countRight({ x, y, player, board });
            if (count >= CONNECT) return true;
            count = countUpRight({ x, y, player, board });
            if (count >= CONNECT) return true;
            count = countDownRight({ x, y, player, board });
            if (count >= CONNECT) return true;
        }
    }
    return false;
};

export const isTie = ({ board }: IPropsCount) => {
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLUMNS; x++) {
            const currentCell = board[y][x];
            if (currentCell === EMPTY_SPACE) {
                return false;
            }
        }
    }
    return true;
}