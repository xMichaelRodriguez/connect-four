const CONNECT = 4;
const COLUMNS = 7;
const ROWS = 6;
const EMPTY_SPACE = null;
interface IWinner {
  player: number;
  board: number[][];
}

interface IPropsCount extends IWinner {
  x: number;
  y: number;
}

export const countUp = ({ x, y, player, board }: IPropsCount) => {
  let startY = y - CONNECT >= 0 ? y - CONNECT + 1 : 0;
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
  const endX = x + CONNECT < COLUMNS ? x + CONNECT - 1 : COLUMNS - 1;
  const newX = x + 1;
  let counter = 0;
  for (; x <= endX; newX) {
    if (board[y][x] === player) {
      counter++;
    } else {
      counter = 0;
    }
  }
  return counter;
};

export const countUpRight = ({ x, y, player, board }: IPropsCount) => {
  const endX = x + CONNECT < COLUMNS ? x + CONNECT - 1 : COLUMNS - 1;
  const startY = y - CONNECT >= 0 ? y - CONNECT + 1 : 0;
  let newX = x;
  let newY = y;
  let counter = 0;
  while (newX <= endX && startY <= newY) {
    if (board[newY][newX] === player) {
      counter++;
    } else {
      counter = 0;
    }
    newX++;
    newY--;
  }
  return counter;
};
export const countDownRight = ({ x, y, player, board }: IPropsCount) => {
  const endX = x + CONNECT < COLUMNS ? x + CONNECT - 1 : COLUMNS - 1;
  const endY = y + CONNECT < ROWS ? y + CONNECT - 1 : ROWS - 1;
  let newX = x;
  let newY = y;
  let counter = 0;
  while (newX <= endX && newY <= endY) {
    if (board[newY][newX] === player) {
      counter++;
    } else {
      counter = 0;
    }
    newX++;
    newY++;
  }
  return counter;
};

export const isWinner = ({ player, board }: IWinner) => {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLUMNS; x++) {
      let count = 0;
      count = countUp({
        x,
        y,
        player,
        board,
      });
      if (count >= CONNECT) return true;
      count = countRight({
        x,
        y,
        player,
        board,
      });
      if (count >= CONNECT) return true;
      count = countUpRight({
        x,
        y,
        player,
        board,
      });
      if (count >= CONNECT) return true;
      count = countDownRight({
        x,
        y,
        player,
        board,
      });
      if (count >= CONNECT) return true;
    }
  }
  return false;
};

export const isTie = ({ board }: { board: number[][] }) => {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLUMNS; x++) {
      const currentCell = board[y][x];
      if (currentCell === EMPTY_SPACE) {
        return false;
      }
    }
  }
  return true;
};

export const getFirstEmptyRow = (columnIndex: number, board: number[][]) => {
  for (let i = ROWS - 1; i >= 0; i--) {
    if (board[i][columnIndex] === EMPTY_SPACE) {
      return i;
    }
  }
  return -1;
};

export const togglePlayer = (currentPlayer: number) => (currentPlayer === 1 ? 2 : 1);
