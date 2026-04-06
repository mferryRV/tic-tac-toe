import React, { ChangeEvent, useState } from "react";
import GameContainer from "./GameContainer";
import { GameState } from "../types";

export const MainScreen = () => {
  const [gameId, setGameId] = useState<string>(crypto.randomUUID());
  const [gameState, setGameState] = useState<GameState>("ready");
  const [boardSize, setBoardSize] = useState<number>(3);

  const startNewGame = () => {
    setGameId(crypto.randomUUID());
    setGameState("ready");
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="font-bold text-2xl p-4 w-full text-center bg-bg-green text-white">
        <h1>Tic Tac Toe</h1>
      </div>
      <GameContainer
        key={gameId}
        boardSize={boardSize}
        gameState={gameState}
        setGameState={setGameState}
        startNewGame={startNewGame}
      />
      <div className="flex flex-col gap-2">
        <p className="w-full text-center">Board size</p>
        <div className="flex flex-row gap-4">
          <input
            type="range"
            min={3}
            max={15}
            step={1}
            value={boardSize}
            onChange={({ target: { value } }) => setBoardSize(parseInt(value))}
            disabled={gameState == "playing"}
          />
          <p className="text-xl self-auto">{boardSize}</p>
        </div>
      </div>
      {["won by X", "won by O", "catscan"].includes(gameState) && (
        <div
          className="flex bg-cta py-2 px-6 border-bg-green border-2 rounded-md"
          onClick={startNewGame}
        >
          <p className="text-xl text-center w-full">Play again</p>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
