import * as game from "./game";

test("Empty board of 3", () => {
  expect(game.getEmptyBoard(3)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test("Empty board of 15", () => {
  expect(game.getEmptyBoard(15)).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Move counter counts X", () => {
  expect(
    game.getMoveCount([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]),
  ).toBe(1);
});

test("Move counter counts O", () => {
  expect(
    game.getMoveCount([
      [0, 0, 0],
      [-1, 1, 0],
      [0, 0, 0],
    ]),
  ).toBe(2);
});

test("First player is X", () => {
  expect(game.getNextPlayer(game.getEmptyBoard(3))).toBe(1);
});

test("Second player is O", () => {
  expect(
    game.getNextPlayer([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]),
  ).toBe(-1);
});

test("No winner on initial move", () => {
  expect(
    game.checkWinCondition({ player: 1, yIndex: 0, xIndex: 2 }, [
      [0, 0, 1],
      [0, 0, 0],
      [0, 0, 0],
    ]),
  ).toBe(0);
});

test("X wins on a row", () => {
  expect(
    game.checkWinCondition({ player: 1, yIndex: 0, xIndex: 2 }, [
      [1, 1, 1],
      [-1, -1, 0],
      [0, 0, 0],
    ]),
  ).toBe(1);
});

test("X wins on a column", () => {
  expect(
    game.checkWinCondition({ player: 1, yIndex: 2, xIndex: 0 }, [
      [1, -1, 0],
      [1, -1, 0],
      [1, 0, 0],
    ]),
  ).toBe(1);
});

test("X wins on a diagonal", () => {
  expect(
    game.checkWinCondition({ player: 1, yIndex: 2, xIndex: 2 }, [
      [1, -1, 0],
      [-1, 1, 0],
      [0, 0, 1],
    ]),
  ).toBe(1);
});

test("O wins on a row", () => {
  expect(
    game.checkWinCondition({ player: -1, yIndex: 1, xIndex: 2 }, [
      [1, 1, 0],
      [-1, -1, -1],
      [1, 0, 0],
    ]),
  ).toBe(-1);
});

test("O wins on a column", () => {
  expect(
    game.checkWinCondition({ player: -1, yIndex: 2, xIndex: 0 }, [
      [-1, 1, 1],
      [-1, 1, 0],
      [-1, 0, 0],
    ]),
  ).toBe(-1);
});

test("O wins on a diagonal", () => {
  expect(
    game.checkWinCondition({ player: -1, yIndex: 2, xIndex: 2 }, [
      [-1, 1, 0],
      [1, -1, 0],
      [1, 0, -1],
    ]),
  ).toBe(-1);
});

test("Catscan", () => {
  expect(
    game.checkWinCondition({ player: 1, yIndex: 0, xIndex: 2 }, [
      [1, -1, 1],
      [-1, -1, 1],
      [1, 1, -1],
    ]),
  ).toBe(0);
});
