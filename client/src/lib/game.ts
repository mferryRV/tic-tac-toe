import _ from "lodash";

export type XorO = -1 | 1;
export const displayXorO = (val: XorO) => (val < 0 ? "O" : "X");

export type GameState = "ready" | "playing" | "X" | "O" | "catscan";

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
    return moveCount + _.sum(_.map(row, Math.abs));
  }, 0);

export const getNextPlayer = (board: BoardState): XorO =>
  getMoveCount(board) % 2 ? -1 : 1;

export const checkWinCondition = (
  lastMove: Move,
  board: BoardState,
): XorO | 0 => {
  // The sum of a winning line will be either N or -N
  const rowResults: number[] = board.map((row) => _.sum(row));
  const indices = [...Array(board.length).keys()];
  const colResults: number[] = indices.map((xIndex) =>
    _.sum(board.map((row) => row[xIndex])),
  );
  const diagResults: number[] = [
    _.sum(indices.map((i) => board[i][i])),
    _.sum(indices.map((i) => board[i][board.length - 1 - i])),
  ];

  const results = [...rowResults, ...colResults, ...diagResults];
  console.log(results, board.length);

  return results.reduce<XorO | 0>((winner, sum) => {
    if (Math.abs(sum) == board.length) {
      return (sum / board.length) as XorO;
    }
    return winner;
  }, 0);
};
