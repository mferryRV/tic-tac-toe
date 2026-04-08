import Router from "@koa/router";
import { addResult, getResults } from "../store";
import { GameResult, GameResultsResponse } from "../types";

const MIN_BOARD_SIZE = 3;
const MAX_BOARD_SIZE = 15;

const router = new Router({ prefix: "/game" });

router.post("/result", (ctx) => {
  const body = ctx.request.body as GameResult;

  if (!body.id || !body.result || !body.completedAt || !body.boardSize) {
    ctx.status = 400;
    ctx.body = {
      error: "Missing required fields: id, result, completedAt, boardSize",
    };
    return;
  }

  if (!["X", "O", "catscan"].includes(body.result)) {
    ctx.status = 400;
    ctx.body = { error: "result must be one of: X, O, catscan" };
    return;
  }

  if (body.boardSize > MAX_BOARD_SIZE || body.boardSize < MIN_BOARD_SIZE) {
    ctx.status = 400;
    ctx.body = { error: "boardSize must be between 3 and 15" };
    return;
  }

  addResult(body);
  ctx.status = 201;
});

router.get("/results", (ctx) => {
  const minBoardSize = Number(ctx.query.minBoardSize ?? MIN_BOARD_SIZE);
  const maxBoardSize = Number(ctx.query.maxBoardSize ?? MAX_BOARD_SIZE);

  if (minBoardSize < MIN_BOARD_SIZE || minBoardSize > MAX_BOARD_SIZE) {
    ctx.status = 400;
    ctx.body = { error: "minBoardSize must be between 3 and 15" };
    return;
  }

  if (maxBoardSize < MIN_BOARD_SIZE || maxBoardSize > MAX_BOARD_SIZE) {
    ctx.status = 400;
    ctx.body = { error: "maxBoardSize must be between 3 and 15" };
    return;
  }

  const results = getResults(minBoardSize, maxBoardSize);

  const stats = results.reduce(
    (acc, r) => {
      acc[r.result]++;
      acc.total++;
      return acc;
    },
    { X: 0, O: 0, catscan: 0, total: 0 },
  );

  const response: GameResultsResponse = { stats, results };
  ctx.body = response;
});

export default router;
