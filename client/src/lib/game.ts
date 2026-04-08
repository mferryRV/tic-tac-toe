export type XorO = -1 | 1;
export const displayXorO = (val: XorO) => (val < 0 ? "O" : "X");

export type GameOutcome = "X" | "O" | "catscan";
export type GameState = "ready" | "playing" | GameOutcome;

export type BoardState = (XorO | 0)[][];
export const getEmptyBoard = (n: number): BoardState =>
  Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

export type Move = {
  player: XorO;
  yIndex: number;
  xIndex: number;
};

export const getMoveCount = (board: BoardState): number =>
  board.reduce<number>((moveCount, row) => {
    return moveCount + row.reduce<number>((sum, val) => sum + Math.abs(val), 0);
  }, 0);

export const getNextPlayer = (board: BoardState): XorO =>
  getMoveCount(board) % 2 ? -1 : 1;

const checkWinArray = (value: XorO, array: (XorO | 0)[]): boolean => {
  // All values in array should match player
  let i = 0;
  while (i < array.length && array[i] === value) {
    i++;
  }
  return i == array.length;
};

export const checkWinCondition = (
  lastMove: Move,
  board: BoardState,
): XorO | 0 => {
  const { player, yIndex, xIndex } = lastMove;

  const row = board[yIndex];
  const col = board.map((row) => row[xIndex]);

  if (checkWinArray(player, row) || checkWinArray(player, col)) {
    return player;
  } else if (
    // Down-diagonal
    yIndex == xIndex &&
    checkWinArray(
      player,
      [...Array(board.length).keys()].map((i) => board[i][i]),
    )
  ) {
    return player;
  } else if (
    // Up-diagonal
    yIndex == board.length - 1 - xIndex &&
    checkWinArray(
      player,
      [...Array(board.length).keys()].map(
        (i) => board[i][board.length - 1 - i],
      ),
    )
  ) {
    return player;
  }

  return 0;
};
