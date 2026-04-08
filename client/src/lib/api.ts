import { GameOutcome } from "./game";

const BASE_API_URL = process.env.BACKEND_URL ?? "http://localhost:3001";
const defaultMinBoardSize = 3;
const defaultMaxBoardSize = 15;
const TIMEOUT_MS = 60_000;

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
  const response = await fetch(`${BASE_API_URL}/game/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
    signal: AbortSignal.timeout(TIMEOUT_MS),
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
  // TODO: Add pagination if number of games is expected to be high
  const response = await fetch(
    `${BASE_API_URL}/game/results?minBoardSize=${minBoardSize}&maxBoardSize=${maxBoardSize}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
