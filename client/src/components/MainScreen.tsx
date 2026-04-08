import React, { ChangeEvent, useState } from "react";
import GameContainer from "./GameContainer";
import { GameState } from "../types";
import Refresh from "./icons/Refresh";

export const MainScreen = () => {
  const [gameId, setGameId] = useState<string>(crypto.randomUUID());
  const [gameState, setGameState] = useState<GameState>("ready");
  const [boardSize, setBoardSize] = useState<number>(3);

  const startNewGame = () => {
    setGameId(crypto.randomUUID());
    setGameState("ready");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="font-bold text-2xl p-4 w-full text-center bg-dark text-white">
        <h1>Tic Tac Toe</h1>
      </div>
      <GameContainer
        key={gameId}
        boardSize={boardSize}
        gameState={gameState}
        setGameState={setGameState}
        startNewGame={startNewGame}
      />
      <div className="flex flex-row gap-4 w-full max-w-md px-6">
        <div className="flex flex-col gap-1 w-20">
          <p className="w-full text-center">Board</p>
          <p className="text-xl self-auto text-center">
            {boardSize} x {boardSize}
          </p>
        </div>
        <input
          className="flex grow accent-cta"
          type="range"
          min={3}
          max={15}
          step={1}
          value={boardSize}
          onChange={({ target: { value } }) => setBoardSize(parseInt(value))}
          disabled={gameState == "playing"}
        />
        {["X", "O", "catscan"].includes(gameState) && (
          <div
            className="flex h-14 aspect-square bg-cta p-2 rounded-md"
            onClick={startNewGame}
          >
            <Refresh />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainScreen;
