import { GameResult } from "./types";

// In-memory store
const results: GameResult[] = [
  {
    id: crypto.randomUUID(),
    result: "X",
    completedAt: "2026-04-08T12:36:00.000z",
    boardSize: 3,
  },
  {
    id: crypto.randomUUID(),
    result: "X",
    completedAt: "2026-04-08T12:37:00.000z",
    boardSize: 3,
  },
  {
    id: crypto.randomUUID(),
    result: "O",
    completedAt: "2026-04-08T12:38:00.000z",
    boardSize: 3,
  },
  {
    id: crypto.randomUUID(),
    result: "catscan",
    completedAt: "2026-04-08T12:40:00.000z",
    boardSize: 3,
  },
];

export const addResult = (result: GameResult): void => {
  results.push(result);
};

export const getResults = (
  minBoardSize: number,
  maxBoardSize: number,
): GameResult[] => {
  return results
    .filter((r) => r.boardSize >= minBoardSize && r.boardSize <= maxBoardSize)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));
};
