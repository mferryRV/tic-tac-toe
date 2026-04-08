import { GameOutcome } from "./game";

// TODO: Change to deployed URL
const BASE_API_URL = "https://example.com";
const defaultMinBoardSize = 3;
const defaultMaxBoardSize = 15;

export type GameResult = {
  id: string;
  result: GameOutcome;
  completedAt: string;
  boardSize: number;
};

export type GameStats = {
  X: number;
  O: number;
  catscan: number;
  total: number;
};

export type GameResultsResponse = {
  stats: GameStats;
  results: GameResult[];
};

export const postGameResult = async (result: GameResult): Promise<boolean> => {
  // TODO: remove dummy
  return true;
  const response = await fetch(`${BASE_API_URL}/game/result`, {
    method: "POST",
    body: JSON.stringify(result),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return true;
};

export type GameFilter = {
  minBoardSize?: number;
  maxBoardSize?: number;
};

export const getGameResults = async ({
  minBoardSize = defaultMinBoardSize,
  maxBoardSize = defaultMaxBoardSize,
}: GameFilter): Promise<GameResultsResponse> => {
  // TODO: remove dummy
  return {
    stats: { X: 2, O: 1, catscan: 1, total: 4 },
    results: [
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
    ],
  };
  // TODO: Add pagination if number of games is expected to be high
  const response = await fetch(
    `${BASE_API_URL}/game/list?minBoardSize=${minBoardSize}&maxBoardSize=${maxBoardSize}`,
    {
      method: "GET",
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
