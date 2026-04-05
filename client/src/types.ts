export type XorO = -1 | 1;
export const displayXorO = (val: XorO) => (val < 0 ? "O" : "X");

export type GameState = "playing" | "won by X" | "won by O" | "catscan";

export type BoardState = (XorO | 0)[][];
export const getEmptyBoard = (n: number): BoardState =>
  Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
