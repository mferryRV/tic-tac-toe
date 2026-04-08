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
import { HFlex, VFlex } from "./ui";

const content = {
  alert: {
    newGame: "Want to start a new game?",
    invalidMove: "Invalid move: square already selected",
  },
};

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
        if (window.confirm(content.alert.newGame)) {
          startNewGame();
        }
        return;
      }
      // TODO: Handle out of bounds
      const selectedValue = board[yIndex][xIndex];
      if (!!selectedValue) {
        alert(content.alert.invalidMove);
        return;
      }
      const updatedBoard = [...board];
      updatedBoard[yIndex][xIndex] = nextMoveValue;
      setBoard(updatedBoard);
    },
    [board, gameState],
  );

  return (
    <VFlex className="w-full items-center gap-4">
      <HFlex className="h-full w-full gap-2 items-stretch">
        {([1, -1] as XorO[]).map((val) => (
          <PlayerTile
            player={val}
            isTurn={
              ["playing", "ready"].includes(gameState) && nextMoveValue == val
            }
            isWinner={gameState === displayXorO(val)}
          />
        ))}
      </HFlex>
      <BoardDisplay boardState={board} makeMove={makeMove} />
    </VFlex>
  );
};
export default GameContainer;
