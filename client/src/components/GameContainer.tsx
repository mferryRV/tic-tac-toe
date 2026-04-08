import React, { useCallback, useEffect, useState } from "react";
import {
  BoardState,
  checkWinCondition,
  displayXorO,
  GameState,
  getEmptyBoard,
  getMoveCount,
  getNextPlayer,
  XorO,
} from "../lib/game";
import BoardDisplay from "./BoardDisplay";
import PlayerTile from "./PlayerTile";
import { HFlex, VFlex } from "./ui";

const content = {
  alert: {
    newGame: "Want to start a new game?",
    invalidMove: "Invalid move: square already selected",
  },
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
  const nextPlayer: XorO = getNextPlayer(board);

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
      let selectedValue: number | undefined;
      try {
        selectedValue = board[yIndex][xIndex];
      } catch (e) {
        console.error(
          `Selected position x:${xIndex}, y:${yIndex} out of bounds (${e})`,
        );
      }
      if (selectedValue) {
        alert(content.alert.invalidMove);
        return;
      }

      // Update board state
      const updatedBoard = [...board];
      updatedBoard[yIndex][xIndex] = nextPlayer;
      setBoard(updatedBoard);

      const moveCount = getMoveCount(updatedBoard);

      // Update game state
      if (
        gameState == "playing" &&
        moveCount >= boardSize * 2 - 1 &&
        moveCount < boardSize * boardSize
      ) {
        const winner = checkWinCondition(
          { player: nextPlayer, yIndex, xIndex },
          updatedBoard,
        );
        if (winner) {
          setGameState(displayXorO(winner) as GameState);
        }
      } else if (gameState == "playing" && moveCount == boardSize * boardSize) {
        setGameState("catscan");
      }
    },
    [board, gameState],
  );

  return (
    <VFlex className="w-full items-center gap-4">
      <HFlex className="h-full w-full gap-2 items-stretch">
        {([1, -1] as XorO[]).map((player) => (
          <PlayerTile
            key={player}
            player={player}
            isTurn={
              ["playing", "ready"].includes(gameState) && nextPlayer == player
            }
            isWinner={gameState === displayXorO(player)}
          />
        ))}
      </HFlex>
      <BoardDisplay boardState={board} makeMove={makeMove} />
    </VFlex>
  );
};
export default GameContainer;
