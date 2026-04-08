export type GameOutcome = "X" | "O" | "catscan";

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
