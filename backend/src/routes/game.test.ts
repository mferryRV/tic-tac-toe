import request from "supertest";
import app from "../app";

const agent = () => request(app.callback());

const validResult = {
  id: "test-id-1",
  result: "X",
  completedAt: "2026-04-08T12:00:00.000Z",
  boardSize: 3,
};

// Use boardSize 15 for GET tests to isolate from seed data and other tests
const postResult = (overrides = {}) =>
  agent()
    .post("/game/result")
    .set("Content-Type", "application/json")
    .send({ ...validResult, boardSize: 15, ...overrides });

describe("POST /game/result", () => {
  it("returns 201 on a valid result", async () => {
    const res = await request(app.callback())
      .post("/game/result")
      .set("Content-Type", "application/json")
      .send(validResult);

    expect(res.status).toBe(201);
  });

  it("returns 400 when id is missing", async () => {
    const { id: _, ...body } = validResult;
    const res = await request(app.callback())
      .post("/game/result")
      .set("Content-Type", "application/json")
      .send(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing required fields/);
  });

  it("returns 400 when result is missing", async () => {
    const { result: _, ...body } = validResult;
    const res = await request(app.callback())
      .post("/game/result")
      .set("Content-Type", "application/json")
      .send(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing required fields/);
  });

  it("returns 400 when completedAt is missing", async () => {
    const { completedAt: _, ...body } = validResult;
    const res = await request(app.callback())
      .post("/game/result")
      .set("Content-Type", "application/json")
      .send(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing required fields/);
  });

  it("returns 400 when boardSize is missing", async () => {
    const { boardSize: _, ...body } = validResult;
    const res = await request(app.callback())
      .post("/game/result")
      .set("Content-Type", "application/json")
      .send(body);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing required fields/);
  });

  it("returns 400 when boardSize is below 3", async () => {
    const res = await agent()
      .post("/game/result")
      .set("Content-Type", "application/json")
      .send({ ...validResult, boardSize: 2 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/boardSize must be between 3 and 15/);
  });

  it("returns 400 when boardSize is above 15", async () => {
    const res = await agent()
      .post("/game/result")
      .set("Content-Type", "application/json")
      .send({ ...validResult, boardSize: 16 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/boardSize must be between 3 and 15/);
  });

  it("returns 400 when result is an invalid value", async () => {
    const res = await agent()
      .post("/game/result")
      .set("Content-Type", "application/json")
      .send({ ...validResult, result: "Z" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/result must be one of/);
  });
});

describe("GET /game/results", () => {
  beforeAll(async () => {
    await postResult({ id: "get-1", result: "X",       completedAt: "2026-04-08T10:00:00.000Z" });
    await postResult({ id: "get-2", result: "O",       completedAt: "2026-04-08T11:00:00.000Z" });
    await postResult({ id: "get-3", result: "catscan", completedAt: "2026-04-08T12:00:00.000Z" });
    await postResult({ id: "get-4", result: "X",       completedAt: "2026-04-08T13:00:00.000Z" });
  });

  const getResults = (params = "") =>
    agent().get(`/game/results?minBoardSize=15&maxBoardSize=15${params}`);

  it("returns 400 when minBoardSize is below 3", async () => {
    const res = await agent().get("/game/results?minBoardSize=2");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/minBoardSize/);
  });

  it("returns 400 when minBoardSize is above 15", async () => {
    const res = await agent().get("/game/results?minBoardSize=16");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/minBoardSize/);
  });

  it("returns 400 when maxBoardSize is below 3", async () => {
    const res = await agent().get("/game/results?maxBoardSize=2");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/maxBoardSize/);
  });

  it("returns 400 when maxBoardSize is above 15", async () => {
    const res = await agent().get("/game/results?maxBoardSize=16");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/maxBoardSize/);
  });

  it("returns results sorted by completedAt descending", async () => {
    const res = await getResults();
    expect(res.status).toBe(200);
    const timestamps: string[] = res.body.results.map((r: { completedAt: string }) => r.completedAt);
    expect(timestamps).toEqual([...timestamps].sort((a, b) => b.localeCompare(a)));
  });

  it("stats counts match the returned results", async () => {
    const res = await getResults();
    expect(res.status).toBe(200);
    const { results, stats } = res.body;
    expect(stats.total).toBe(results.length);
    expect(stats.X).toBe(results.filter((r: { result: string }) => r.result === "X").length);
    expect(stats.O).toBe(results.filter((r: { result: string }) => r.result === "O").length);
    expect(stats.catscan).toBe(results.filter((r: { result: string }) => r.result === "catscan").length);
  });
});
