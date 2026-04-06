import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  BoardState,
  displayXorO,
  GameState,
  getEmptyBoard,
  XorO,
} from "../types";
import BoardDisplay from "./BoardDisplay";
import PlayerTile from "./PlayerTile";
import Spruce from "./icons/Spruce";
import O from "./icons/O";

const checkWinCondition = (board: BoardState): XorO | 0 => {
  // The sum of a winning line will be either N or -N
  const rowResults: number[] = board.map((row) => _.sum(row));
  const indices = [...Array(board.length).keys()];
  const colResults: number[] = indices.map((xIndex) =>
    _.sum(board.map((row) => row[xIndex])),
  );
  const diagResults: number[] = [
    _.sum(indices.map((i) => board[i][i])),
    _.sum(indices.map((i) => board[i][board.length - 1 - i])),
  ];

  const results = [...rowResults, ...colResults, ...diagResults];
  console.log(results, board.length);

  return results.reduce<XorO | 0>((winner, sum) => {
    if (Math.abs(sum) == board.length) {
      return (sum / board.length) as XorO;
    }
    return winner;
  }, 0);
};

export const GameContainer = ({
  boardSize,
  gameState,
  setGameState,
  startNewGame,
}: {
  boardSize: number;
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  startNewGame: () => void;
}) => {
  // Generate n x n empty board
  const [board, setBoard] = useState<BoardState>(getEmptyBoard(boardSize));

  useEffect(() => {
    if (gameState == "ready" && boardSize !== board.length) {
      setBoard(getEmptyBoard(boardSize));
    }
  }, [boardSize]);

  // X moves first, board state determines current player
  const moveCount = board.reduce<number>((moveCount, row) => {
    return moveCount + _.sum(_.map(row, Math.abs));
  }, 0);
  const nextMoveValue: XorO = moveCount % 2 ? -1 : 1;

  // Update game state
  if (
    gameState == "playing" &&
    moveCount >= boardSize * 2 - 1 &&
    moveCount < boardSize * boardSize
  ) {
    const winner = checkWinCondition(board);
    console.log(winner);
    if (!!winner) {
      setGameState(displayXorO(winner) as GameState);
    }
  } else if (gameState == "playing" && moveCount == boardSize * boardSize) {
    setGameState("catscan");
  }

  // Record player moves
  const makeMove = useCallback(
    (yIndex, xIndex) => {
      if (gameState == "ready") {
        setGameState("playing");
      } else if (gameState !== "playing") {
        if (window.confirm("Want to start a new game?")) {
          startNewGame();
        }
        return;
      }
      // TODO: Handle out of bounds
      const selectedValue = board[yIndex][xIndex];
      if (!!selectedValue) {
        // TODO: Improve alerting?
        alert("Invalid move: square already selected");
        return;
      }
      const updatedBoard = [...board];
      updatedBoard[yIndex][xIndex] = nextMoveValue;
      setBoard(updatedBoard);
    },
    [board, gameState],
  );

  return (
    <div className="flex flex-col w-full items-center gap-4 max-w-md px-6">
      <div className="flex flex-row h-full w-full gap-2 items-stretch">
        {([1, -1] as XorO[]).map((val) => (
          <PlayerTile
            player={val}
            isTurn={
              ["playing", "ready"].includes(gameState) && nextMoveValue == val
            }
            isWinner={gameState === displayXorO(val)}
          />
        ))}
      </div>
      <BoardDisplay boardState={board} makeMove={makeMove} />
    </div>
  );
};
export default GameContainer;
