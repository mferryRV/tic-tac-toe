import Router from "@koa/router";
import { addResult, getResults } from "../store";
import { GameResult, GameResultsResponse } from "../types";

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

  addResult(body);
  ctx.status = 201;
});

router.get("/results", (ctx) => {
  const minBoardSize = Number(ctx.query.minBoardSize ?? 3);
  const maxBoardSize = Number(ctx.query.maxBoardSize ?? 15);

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
