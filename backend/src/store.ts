import pool from "./db";
import { GameResult } from "./types";

export const addResult = async (result: GameResult): Promise<void> => {
  await pool.query(
    `INSERT INTO game_results (id, result, completed_at, board_size)
     VALUES ($1, $2, $3, $4)`,
    [result.id, result.result, result.completedAt, result.boardSize],
  );
};

export const getResults = async (
  minBoardSize: number,
  maxBoardSize: number,
): Promise<GameResult[]> => {
  const { rows } = await pool.query(
    `SELECT id, result, completed_at AS "completedAt", board_size AS "boardSize"
     FROM game_results
     WHERE board_size >= $1 AND board_size <= $2
     ORDER BY completed_at DESC`,
    [minBoardSize, maxBoardSize],
  );
  return rows;
};
